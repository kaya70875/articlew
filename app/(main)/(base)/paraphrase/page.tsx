'use client';

import Loading from '@/components/Loading';
import SentenceCard from '@/components/SentenceCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React, { useRef, useState } from 'react'

export default function page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('love');

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/paraphrase/${sentence}` : null);

    const handleParaphraseClick = () => {
        if (textAreaRef.current) {
            setSentence(textAreaRef.current.value);
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-1/2 flex flex-col gap-8 items-center justify-center'>
                <div className='wrapper w-full'>
                    <div className="text-area-wrapper bg-white relative w-full p-4 min-h-36 rounded-md">
                        <textarea className='w-full outline-none resize-none overflow-hidden' ref={textAreaRef} name="paraphrase" id="ph" placeholder='Write a sentence'></textarea>
                        <div className='relative right-0 w-full p-4'>
                            <button onClick={handleParaphraseClick} className="primary-button absolute right-0">Paraphrase</button>
                        </div>
                    </div>
                </div>

                {loading && <Loading />}
                {error && <p>{error}</p>}

                {data && <div className='flex flex-col gap-4 bg-lightBlue w-full p-8 rounded-md'>
                    <div className='w-full flex items-center gap-2'>
                        <div className="ellipse bg-orange-400"></div>
                        <p className='text-primaryText text-base'>Rewrites</p>
                    </div>

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
