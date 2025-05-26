'use client';

import React, { useState } from 'react';
import { Rune, RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';
import { Job } from '@/app/types/job';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import EquipmentGrid from './components/EquipmentGrid';
import RuneFilter from '../tiermaker/components/RuneFilter';
import SearchResults from './components/SearchResults';

export default function CharacterSet() {
    const [searchTerm, setSearchTerm] = useState('');
    const [runes, setRunes] = useState<Rune[]>([]);
    const [equippedRunes, setEquippedRunes] = useState<Record<string, Rune>>({});
    const [selectedTypes, setSelectedTypes] = useState<RuneType[]>([]);
    const [selectedGrades, setSelectedGrades] = useState<ItemGrade[]>([]);
    const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/runes/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: searchTerm,
                    types: selectedTypes,
                    itemGrades: selectedGrades,
                    jobs: selectedJobs
                }),
            });

            if (!response.ok) {
                throw new Error('API 요청 실패');
            }

            const data = await response.json();
            setRunes(data.runes);
        } catch (error) {
            console.error('룬 검색 중 오류 발생:', error);
            // TODO: 에러 처리 UI 추가
        }
    };

    const handleRuneDrop = (slotId: string, rune: Rune) => {
        setEquippedRunes(prev => ({
            ...prev,
            [slotId]: rune
        }));
    };

    const handleTypeChange = (type: RuneType) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleGradeChange = (grade: ItemGrade) => {
        setSelectedGrades(prev =>
            prev.includes(grade)
                ? prev.filter(g => g !== grade)
                : [...prev, grade]
        );
    };

    const handleJobChange = (job: Job) => {
        setSelectedJobs(prev =>
            prev.includes(job)
                ? prev.filter(j => j !== job)
                : [...prev, job]
        );
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        if (sourceId === 'search-results' && destId.startsWith('equipment-slot-')) {
            const rune = runes[source.index];
            const slotId = destId.replace('equipment-slot-', '');
            handleRuneDrop(slotId, rune);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">장비 세팅</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="w-full lg:w-3/4 flex justify-center">
                        <EquipmentGrid
                            equippedRunes={equippedRunes}
                            onRuneDrop={handleRuneDrop}
                        />
                    </div>
                    <div className="w-full lg:w-1/4">
                        <div className="mb-4">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
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
                        <RuneFilter
                            selectedTypes={selectedTypes}
                            selectedGrades={selectedGrades}
                            selectedJobs={selectedJobs}
                            onTypeChange={handleTypeChange}
                            onGradeChange={handleGradeChange}
                            onJobChange={handleJobChange}
                            onSearch={handleSearch}
                        />
                        <SearchResults runes={runes} searchTerm={searchTerm} />
                    </div>
                    </DragDropContext>
                </div>
            
        </div>
    );
}
