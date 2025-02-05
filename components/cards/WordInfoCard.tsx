import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiWordResponse } from '@/types/sentence';
import React, { useState } from 'react'
import Loading from '../Loading';
import Speaker from '../svg/Speaker';
import { speakSentence } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import EllipseHeader from '../reusables/EllipseHeader';
import ChevronUp from '../svg/ChevronUp';
import ChevronDown from '../svg/ChevronDown';

interface WordInfoCardProps {
    currentWord: string;
    setWord: (word: string) => void;
}

export default function WordInfoCard({ currentWord, setWord }: WordInfoCardProps) {

    const { data: wordInfo, loading: wordInfoLoading, error: wordInfoError } = useAPIFetch<FastApiWordResponse>(currentWord ? `/wordInfo/${currentWord}` : null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showMore, setShowMore] = useState(false);

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

    const renderSection = (title: string, items: { definition: string; synonyms: string[]; examples: string[]; }[]) => {
        return (
            <div className='flex w-full gap-4 flex-col'>
                {items.slice(0, 3).map((item, index) => (
                    <div key={index} className='flex w-full justify-between gap-2 items-center bg-white p-4 rounded-md shadow-md'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>{title}</p>
                            <p className='font-medium max-w-3xl px-4'>{item.definition}</p>

                            {item.examples?.slice(0, 1).map((example, index) => (
                                <p className='text-sm text-gray-600 px-8' key={index} >{example}</p>
                            ))}
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>Synonyms</p>
                            <div className='flex items-center gap-4'>
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
        <div className='flex flex-col gap-8 p-6 bg-lightBlue rounded-md'>
            <EllipseHeader ellipseColor='bg-primaryBlue' text='Dictionary' />
            <div className='flex items-center w-full justify-between'>
                <div className="word-itself flex items-center gap-3">
                    <div className='cursor-pointer' onClick={handleSpeakWord}>
                        <Speaker isSpeaking={isSpeaking} />
                    </div>
                    <p className='font-bold'>{currentWord}</p>
                </div>
                <div className='items-center flex gap-2 cursor-pointer' onClick={() => setShowMore(prev => !prev)}>
                    <p className='text-sm font-semibold '>Show more...</p>
                    {showMore ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>

            {wordInfoError && <p>Error fetching word info</p>}
            {wordInfoLoading && <Loading />}
            {wordInfo && (
                <>
                    {relevantSpeechData?.length > 0 && renderSection(relevantSpeech, relevantSpeechData)}
                    <div className={`overflow-hidden transition-all duration-300 ${showMore ? 'max-h-[1500px]' : 'max-h-0'}`} key={0}>
                        {speechs.filter(speech => speech.name !== relevantSpeech).map(speech => (
                            speech.data.length > 0 && renderSection(speech.name, speech.data)
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
