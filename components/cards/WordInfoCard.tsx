'use client';

import useAPIFetch from '@/hooks/useAPIFetch';
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../Loading';
import Speaker from '../svg/Speaker';
import { speakSentence } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import EllipseHeader from '../reusables/EllipseHeader';
import ChevronUp from '../svg/ChevronUp';
import ChevronDown from '../svg/ChevronDown';
import { FastApiWordResponse } from '@/types/aiResponse';

interface WordInfoCardProps {
    currentWord: string;
    setWord: (word: string) => void;
}

export default function WordInfoCard({ currentWord, setWord }: WordInfoCardProps) {

    const { data: wordInfo, loading: wordInfoLoading, error: wordInfoError } = useAPIFetch<FastApiWordResponse>(currentWord ? `/wordInfo/${currentWord}` : null);
    const [showMore, setShowMore] = useState(false);

    const [collapsedHeight, setCollapsedHeight] = useState(0);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const speechs = [
        {
            name: 'verb',
            data: wordInfo?.verb || []
        },
        {
            name: 'noun',
            data: wordInfo?.noun || []
        },
        {
            name: 'adjective',
            data: wordInfo?.adjectives || []
        },
        {
            name: 'adverb',
            data: wordInfo?.adverb || []
        }
    ]

    const relevantSpeech = wordInfo?.pos || '';
    const relevantSpeechData = speechs.find(speech => speech.name === relevantSpeech)?.data || [];

    useEffect(() => {
        if (!cardContainerRef.current || !wordInfo) return;

        const firstTwoCards = Array.from(cardContainerRef.current.children).slice(0, 2) as HTMLDivElement[];
        const totalHeight = firstTwoCards.reduce((acc, card) => acc + card.offsetHeight, 0);
        setCollapsedHeight(totalHeight);

    }, [currentWord, wordInfo])

    const renderSection = (title: string, items: { definition: string; synonyms: string[]; examples: string[]; }[]) => {
        return (
            <div className='flex w-full gap-4 flex-col' ref={cardContainerRef}>
                {items.map((item, index) => (
                    <div key={index} className='flex w-full justify-between gap-2 items-center bg-white p-2 xs:p-4 rounded-xl shadow-lg'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>{title}</p>
                            <p className='font-medium max-w-3xl px-2 xs:px-4'>{item.definition}</p>

                            {item.examples?.slice(0, 1).map((example, index) => (
                                <p className='text-sm text-gray-600 px-4 xs:px-8' key={index} >{example}</p>
                            ))}
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>Synonyms</p>
                            <div className='flex items-center gap-4 flex-wrap sm:flex-nowrap'>
                                {item.synonyms.slice(0, 4).map((synonym, index) => (
                                    <div className="syn-card p-2 flex items-center justify-center border text-primaryText transition-all duration-100 ease-in border-primaryText hover:bg-primaryText hover:text-whitef rounded-md cursor-pointer" key={index} onClick={() => handleSynonymClick(synonym)}>
                                        <div className='text-sm font-semibold'>{synonym}</div>
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
        setWord(synonym);
    };

    const handleSpeakWord = async () => {
        speakSentence(currentWord);
    }

    return (
        <div className='card-container'>
            <EllipseHeader ellipseColor='bg-primaryBlue' text='Dictionary' />
            <div className='flex items-center w-full justify-between'>
                <div className="word-itself flex items-center gap-3">
                    <div className='cursor-pointer' onClick={handleSpeakWord}>
                        <Speaker isSpeaking={false} />
                    </div>
                    <p className='font-bold text-lg'>{currentWord}</p>
                </div>
                <div className='items-center flex gap-2 cursor-pointer group hover:text-gray-600' onClick={() => setShowMore(prev => !prev)}>
                    <p className='text-sm font-semibold group-hover:text-inherit'>Show more...</p>
                    {showMore ? <ChevronUp /> : <ChevronDown />}
                </div>

            </div>

            {wordInfoError && <p>Error fetching word info</p>}
            {wordInfoLoading && <Loading />}
            {wordInfo && (
                <>
                    {/*Consider the padding for element height*/}
                    <div className={`overflow-hidden transition-all duration-300 flex flex-col gap-4`} key={0}
                        style={{ maxHeight: showMore ? '1500px' : `${collapsedHeight + 16}px` }}
                    >
                        {relevantSpeechData?.length > 0 && renderSection(relevantSpeech, relevantSpeechData)}
                        {/*First render relevant data then check if collapsed height is calculated if it is render the rest of the data*/}
                        {relevantSpeechData.length > 0 ? (collapsedHeight && speechs.filter(speech => speech.name !== relevantSpeech).map(speech => (
                            speech.data.length > 0 && renderSection(speech.name, speech.data)
                        ))) : (speechs.filter(speech => speech.name !== relevantSpeech).map(speech => (
                            speech.data.length > 0 && renderSection(speech.name, speech.data)
                        )))}
                        {/* If relevant data is empty, then do not look for if collapsed height is calculated or not just render all data */}
                    </div>
                </>
            )}
        </div>
    )
}
