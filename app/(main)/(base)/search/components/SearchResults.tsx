'use client';

import React from 'react';
import { Pagination } from '@mui/material';
import WordInfoCard from '@/components/cards/wordinfo/WordInfoCard';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import AIWordAnalysis from '@/components/AIWordAnalysis';
import SentenceCard from '@/components/cards/SentenceCard';
import { FastApiResponse } from '@/types/aiResponse';
import CardContainer from '@/components/reusables/containers/CardContainer';
interface SearchResultsProps {
    data: FastApiResponse;
    currentWord: string;
    page: number;
    totalPage: number;
    setWord: (word: string) => void;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function SearchResults({
    data,
    currentWord,
    page,
    totalPage,
    setWord,
    handlePageChange
}: SearchResultsProps) {
    return (
        <div className='content-wrapper flex flex-col gap-8'>
            <WordInfoCard setWord={setWord} currentWord={currentWord} />

            {currentWord && (
                <CardContainer>
                    <EllipseHeader ellipseColor='bg-purple-400' text='AI Feedback' />
                    <AIWordAnalysis currentWord={currentWord} />
                </CardContainer>
            )}

            <article className='flex flex-col gap-8 p-2 md:p-6 bg-lightBlue w-full'>
                <EllipseHeader ellipseColor='bg-blue-300' text='Exact' />
                <div className='sentence-cards flex flex-col gap-8'>
                    {data?.sentences?.map((sentence, index) => (
                        <SentenceCard
                            key={index}
                            sentence={sentence.text}
                            word={currentWord}
                            source={sentence.source}
                        />
                    ))}
                </div>

                <Pagination
                    page={page}
                    count={totalPage}
                    onChange={handlePageChange}
                    className='w-full justify-center items-center flex'
                />
            </article>
        </div>
    );
} 