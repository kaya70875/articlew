'use client';

import { FilterIcon, SearchIcon, SlidersIcon } from 'lucide-react';
import React from 'react';

interface SearchInputProps {
    word: string;
    setWord: (word: string) => void;
    handleResults: () => void;
    openFilterModal: () => void;
}

export default function SearchInput({ word, setWord, handleResults, openFilterModal }: SearchInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleResults();
        }
    };

    return (
        <div className='sticky top-0 bg-whitef w-full z-10'>
            <div className='input-wrapper py-4 relative w-full'>
                <input
                    type="text"
                    className='hero-input w-full'
                    onChange={(e) => setWord(e.target.value)}
                    value={word}
                    onKeyDown={handleKeyDown}
                    placeholder='Search for a word or phrase...'
                />
                <div
                    className="filter-icon hover:bg-gray-200 p-2 rounded-md flex items-center gap-2 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={openFilterModal}
                >
                    <SlidersIcon className='w-5 h-5 text-primaryText' />
                </div>
            </div>
        </div>
    );
} 