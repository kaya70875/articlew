'use client';

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
                />
                <div
                    className="filter-icon hover:bg-gray-200 p-2 rounded-md flex items-center gap-2 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={openFilterModal}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className='font-medium text-base text-primaryText'>FILTER</p>
                </div>
            </div>
        </div>
    );
} 