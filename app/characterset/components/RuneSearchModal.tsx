import React, { useState } from 'react';
import { Rune, RuneType } from '@/app/types/rune';
import { ItemGrade, getItemGradeKorean } from '@/app/types/item';
import { Job } from '@/app/types/job';
import { getRuneBorderClass, getRuneTextClass } from '@/app/utils/gradeColors';

interface RuneSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (rune: Rune) => void;
  initialJob?: Job | null;
  initialRuneType?: RuneType;
  allRunes?: Rune[];
}

export default function RuneSearchModal({ isOpen, onClose, onSelect, initialJob, initialRuneType, allRunes = [] }: RuneSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRunes, setFilteredRunes] = useState<Rune[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<RuneType[]>(initialRuneType ? [initialRuneType] : []);
  const [selectedGrades, setSelectedGrades] = useState<ItemGrade[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>(initialJob ? [initialJob] : []);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Create a custom close handler that will reset state
  const handleClose = () => {
    // Reset search term and results when closing
    setSearchTerm('');
    setFilteredRunes([]);
    setSelectedGrades([]);
    onClose();
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the overlay itself is clicked, not its children
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Update selected jobs and types when initialJob or initialRuneType changes
  React.useEffect(() => {
    if (initialJob) {
      setSelectedJobs([initialJob]);
    } else {
      setSelectedJobs([]);
    }
    
    if (initialRuneType) {
      setSelectedTypes([initialRuneType]);
    } else {
      setSelectedTypes([]);
    }
  }, [initialJob, initialRuneType]);

  // Update selected job and handle modal open/close effects
  React.useEffect(() => {
    if (isOpen) {
      // Set filtering state to true when modal opens
      setIsFiltering(true);
      
      // Set initial job and rune type
      if (initialJob) {
        setSelectedJobs([initialJob]);
      }
      if (initialRuneType) {
        setSelectedTypes([initialRuneType]);
      }
      
      // Initial search when modal opens
      handleSearch();
    } else {
      // Reset filters when modal closes
      setSearchTerm('');
      setSelectedGrades([]);
      setSelectedJobs([]);
      // Keep the initialRuneType if provided
      setSelectedTypes(initialRuneType ? [initialRuneType] : []);
    }
  }, [isOpen, initialJob, initialRuneType, allRunes]);

  // Run search whenever search criteria changes
  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedTypes, selectedGrades, selectedJobs]);

  // Filter runes client-side based on search criteria
  const handleSearch = () => {
    setIsFiltering(true);
    
    // Use setTimeout to allow the UI to update with the loading state
    setTimeout(() => {
      // Apply filters to the allRunes array
      const filtered = allRunes.filter(rune => {
        // Filter by search term (name or description)
        const matchesSearchTerm = searchTerm === '' || 
          rune.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (rune.description && rune.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Filter by rune type
        const matchesType = selectedTypes.length === 0 || 
          selectedTypes.includes(rune.type);
        
        // Filter by grade
        const matchesGrade = selectedGrades.length === 0 || 
          selectedGrades.includes(rune.grade);
        
        // Filter by job - only apply to ACCESSORY type
        const matchesJob = 
          // For weapon, armor, emblem - don't apply job filter
          (rune.type === RuneType.WEAPON || rune.type === RuneType.ARMOR || rune.type === RuneType.EMBLEM) ||
          // For accessories - apply job filter
          (rune.type === RuneType.ACCESSORY && (selectedJobs.length === 0 || selectedJobs.includes(rune.job)));
        
        return matchesSearchTerm && matchesType && matchesGrade && matchesJob;
      });
      
      setFilteredRunes(filtered);
      setIsFiltering(false);
    }, 100); // Short delay for UI to update
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" 
      onClick={handleOverlayClick}
    >
      <div className="bg-white border rounded-lg p-6 w-full max-w-2xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">룬 검색</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            // No need to call handleSearch here as it's called automatically via useEffect
          }} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="룬 검색..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              검색
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-gray-700">등급</h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(ItemGrade).map((grade) => (
                <label key={grade} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedGrades.includes(grade)}
                    onChange={() => setSelectedGrades(prev => 
                      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
                    )}
                    className="rounded border-gray-300"
                  />
                  <span>{getItemGradeKorean(grade)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-y-auto flex-1">
          <div className="h-full">
            {isFiltering ? (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p>검색 중...</p>
                </div>
              </div>
            ) : filteredRunes.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {filteredRunes.map((rune) => (
                  <div
                    key={rune.id}
                    className={`p-3 border-2 ${getRuneBorderClass(rune.grade)} rounded-lg cursor-pointer hover:bg-gray-50`}
                    onClick={() => {
                      onSelect(rune);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`font-medium ${getRuneTextClass(rune.grade)}`}>{rune.name}</div>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{getItemGradeKorean(rune.grade)}</div>
                    </div>
                    <div 
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: rune.description }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                <div className="text-center">
                  <p className="mb-2">검색 결과가 없습니다.</p>
                  <p className="text-sm">검색어나 필터를 변경해보세요.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 