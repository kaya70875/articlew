'use client';

import useAPIFetch from '@/hooks/useAPIFetch';
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../Loading';
import Speaker from '../../svg/Speaker';
import { speakSentence } from '@/utils/helpers';
import EllipseHeader from '../../reusables/EllipseHeader';
import ChevronUp from '../../svg/ChevronUp';
import ChevronDown from '../../svg/ChevronDown';
import { FastApiWordResponse } from '@/types/aiResponse';
import ApiError from '../../errors/ApiError';
import RenderSpeechs from './shared/RenderSpeechs';
import CardContainer from '@/components/reusables/containers/CardContainer';
interface WordInfoCardProps {
    currentWord: string;
    setWord: (word: string) => void;
}

export default function WordInfoCard({ currentWord, setWord }: WordInfoCardProps) {

    const { data: wordInfo, loading: wordInfoLoading, error: wordInfoError } = useAPIFetch<FastApiWordResponse>(currentWord ? `/wordInfo/${currentWord}` : null);
    const [showMore, setShowMore] = useState(false);

    const [collapsedHeight, setCollapsedHeight] = useState(0);
    const cardContainerRef = useRef<HTMLDivElement>(null);

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

    // Find relevant speech (verb, noun, etc..) based on wordInfo.pos
    const relevantSpeech = wordInfo?.pos || '';
    const relevantSpeechData = speechs.find(speech => speech.name === relevantSpeech)?.data || [];

    // Calculate the height of the first two cards on mount to show only two cards at first unless the user clicks on the show more button
    useEffect(() => {
        if (!cardContainerRef.current || !wordInfo) return;

        const relevantSpeechDiv = cardContainerRef.current.firstChild as HTMLDivElement;
        const firstTwoCards = Array.from(relevantSpeechDiv.children).slice(0, 2) as HTMLDivElement[];

        const totalHeight = firstTwoCards.reduce((acc, card) => acc + card.offsetHeight, 0);
        setCollapsedHeight(totalHeight);

    }, [currentWord, wordInfo])

    return (
        <CardContainer>
            <EllipseHeader ellipseColor='bg-primaryBlue' text='Dictionary' />
            <div className='flex items-center w-full justify-between'>
                <div className="word-itself flex items-center gap-3">
                    <div className='cursor-pointer' onClick={() => speakSentence(currentWord)}>
                        <Speaker isSpeaking={false} />
                    </div>
                    <p className='font-bold text-lg'>{currentWord}</p>
                </div>
                <div className='items-center flex gap-2 cursor-pointer group hover:text-gray-600' onClick={() => setShowMore(prev => !prev)}>
                    <p className='text-sm font-semibold group-hover:text-inherit'>Show more...</p>
                    {showMore ? <ChevronUp /> : <ChevronDown />}
                </div>

            </div>
            {wordInfoError && <ApiError error={wordInfoError} errorMessage='Error while getting word informations.' />}
            {wordInfoLoading && <Loading />}
            {wordInfo && (
                <>
                    {/*Consider the padding for element height*/}
                    <div className={`overflow-hidden flex flex-col gap-4`} key={0}
                        style={{ maxHeight: showMore ? '' : `${collapsedHeight + 24}px` }}
                        ref={cardContainerRef}
                    >
                        <RenderSpeechs title={relevantSpeech} items={relevantSpeechData} setWord={setWord} collapsedHeight={collapsedHeight} speechs={speechs} />
                    </div>
                </>
            )}

        </CardContainer>
    )
}