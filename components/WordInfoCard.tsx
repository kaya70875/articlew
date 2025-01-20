import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiWordResponse } from '@/types/sentence';
import React, { useState } from 'react'
import Loading from './Loading';
import Speaker from './svg/Speaker';
import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { runSpeaker } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import EllipseHeader from './reusables/EllipseHeader';

interface WordInfoCardProps {
    currentWord: string;
}

export default function WordInfoCard({ currentWord }: WordInfoCardProps) {

    const { data: wordInfo, loading: wordInfoLoading, error: wordInfoError } = useAPIFetch<FastApiWordResponse>(currentWord ? `/wordInfo/${currentWord}` : null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const router = useRouter();

    const renderSection = (title: string, items: { definition: string; synonyms: string[] }[]) => {
        return (
            <div className='flex w-full gap-4 flex-col'>
                {items.slice(0, 1).map((item, index) => (
                    <div key={index} className='flex w-full justify-between gap-2 items-center bg-white p-4 rounded-md shadow-md'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>{title}</p>
                            <p className='font-medium text-lg max-w-3xl px-4'>{item.definition}</p>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>Synonyms</p>
                            <div className='flex items-center gap-4'>
                                {item.synonyms.map((synonym, index) => (
                                    <div className="syn-card p-2 flex items-center justify-center border border-primaryText rounded-md cursor-pointer" key={index} onClick={() => handleSynonymClick(synonym)}>
                                        <p className='text-sm text-primaryText font-semibold'>{synonym}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const handleSynonymClick = (synonym: string) => {
        router.push(`/search?word=${synonym}`);
    };

    const handleSpeakWord = async () => {
        runSpeaker(currentWord, setIsSpeaking);
    }

    return (
        <div className='flex flex-col gap-8 p-8 bg-lightBlue rounded-md'>
            <EllipseHeader ellipseColor='bg-primaryBlue' text='Dictionary' />
            <div className="word-itself flex items-center gap-3">
                <div className='cursor-pointer' onClick={handleSpeakWord}>
                    <Speaker isSpeaking={isSpeaking} />
                </div>
                <p className='font-bold'>{currentWord}</p>
            </div>
            {wordInfoError && <p>Error fetching word info</p>}
            {wordInfoLoading && <Loading />}
            {wordInfo && (
                <>
                    {wordInfo.noun?.length > 0 && renderSection('Noun', wordInfo.noun)}
                    {wordInfo.verb?.length > 0 && renderSection('Verb', wordInfo.verb)}
                    {wordInfo.adjectives?.length > 0 && renderSection('Adjective', wordInfo.adjectives)}
                    {wordInfo.adverb?.length > 0 && renderSection('Adverb', wordInfo.adverb)}
                </>
            )}
        </div>
    )
}
