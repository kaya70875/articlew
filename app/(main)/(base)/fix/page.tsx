'use client';

import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea'
import SentenceCard from '@/components/cards/SentenceCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React, { useRef, useState } from 'react'
import Speaker from '@/components/svg/Speaker';
import CopyIcon from '@/components/svg/CopyIcon';
import { extractSpanContent, speakSentence } from '@/utils/helpers';
import Loading from '@/components/Loading';

export default function Page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('');

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/grammar/${sentence}` : null);

    const handleFixButton = () => {
        if (textAreaRef.current) {
            setSentence(textAreaRef.current.value);
        }
    }

    const rawContent = extractSpanContent(data?.response[1] ?? '');

    return (
        <div className='w-1/2 flex flex-col gap-8'>
            <TextArea textAreaRef={textAreaRef}>
                <button className='p-2 flex items-center justify-center bg-orange-300 text-primaryText font-medium rounded-md w-28' onClick={handleFixButton}>Fix</button>
            </TextArea>

            {loading && <Loading />}

            {data?.response && (<div className='sentence-fix p-6 bg-lightBlue rounded-md flex flex-col gap-4'>
                <EllipseHeader ellipseColor='bg-orange-300' text='Sentence Fix' />

                <div className='p-4 bg-white flex flex-col gap-8 justify-between rounded-md'>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: data?.response[0] ?? '' }}></p>
                </div>

                <div className='p-4 bg-white flex flex-col gap-8 justify-between rounded-md'>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: data?.response[1] ?? '' }}></p>
                    <div className='flex items-center gap-4'>
                        <div className='cursor-pointer' onClick={() => speakSentence(rawContent)}>
                            <Speaker isSpeaking={false} />
                        </div>
                        <CopyIcon props={{ color: '#1f2937', cursor: 'pointer', onClick: () => navigator.clipboard.writeText(rawContent) }} />
                    </div>
                </div>
            </div>)}
        </div>
    )
}