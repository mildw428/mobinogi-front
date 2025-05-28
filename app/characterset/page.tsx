'use client';

import React, { useState } from 'react';
import { Rune } from '@/app/types/rune';
import { Job } from '@/app/types/job';
import EquipmentGrid from './components/EquipmentGrid';
import JobSelector from './components/JobSelector';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import RuneDataProvider from './components/RuneDataProvider';

export default function CharacterSet() {
    const [equippedRunes, setEquippedRunes] = useState<Record<string, Rune>>({});
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleRuneDrop = (slotId: string, rune: Rune) => {
        setEquippedRunes(prev => ({
            ...prev,
            [slotId]: rune
        }));
    };
    
    const handleJobChange = (job: Job | null) => {
        setSelectedJob(job);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">장비 세팅</h1>
            
            <JobSelector 
                selectedJob={selectedJob} 
                onJobChange={handleJobChange} 
            />
            
            <RuneDataProvider>
                {({ allRunes, isLoading, error }) => (
                    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        {isLoading ? (
                            <LoadingState />
                        ) : error ? (
                            <ErrorState errorMessage={error} />
                        ) : (
                            <div className="flex justify-center w-full">
                                <EquipmentGrid
                                    equippedRunes={equippedRunes}
                                    onRuneDrop={handleRuneDrop}
                                    selectedJob={selectedJob}
                                    allRunes={allRunes}
                                />
                            </div>
                        )}
                    </div>
                )}
            </RuneDataProvider>
        </div>
    );
}
