'use client';

import Loading from '@/components/Loading';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea';
import SentenceCard from '@/components/cards/SentenceCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React, { useRef, useState } from 'react'

type Context = 'Casual' | 'Academic' | 'Formal' | 'Sortened' | 'Extended' | 'Poetic';

export default function page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('');
    const [context, setContext] = useState<Context>('Casual');

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/paraphrase/${sentence}/${context}` : null);

    const buttonTypes = [
        'Casual',
        'Academic',
        'Formal',
        'Sortened',
        'Extended',
    ]

    const handleParaphraseClick = () => {
        if (textAreaRef.current) {
            setSentence(textAreaRef.current.value);
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-2/3 flex flex-col gap-8 items-center justify-center'>
                <TextArea textAreaRef={textAreaRef}>
                    <div className='flex items-center gap-4'>
                        {buttonTypes.map((buttonType, index) => (
                            <button key={index} className={`${context === buttonType ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-md`} onClick={() => setContext(buttonType as Context)}>
                                {buttonType}
                            </button>
                        ))}
                    </div>
                    <button className='primary-button' onClick={handleParaphraseClick}>Paraphrase</button>
                </TextArea>

                {loading && <Loading />}
                {error && <p>{error}</p>}

                {data && <div className='flex flex-col gap-4 bg-lightBlue w-full p-8 rounded-md'>
                    <EllipseHeader ellipseColor='bg-orange-400' text='Rewrites' />

                    <div className='w-full flex flex-col gap-4'>
                        {data?.paraphrase.map((sentence, index) => (
                            <SentenceCard source='' word='' key={index} sentence={sentence} />
                        ))}
                    </div>
                </div>}
            </div>
        </div>

    )
}
