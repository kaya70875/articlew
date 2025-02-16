'use client';

import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea'
import useAPIFetch from '@/hooks/useAPIFetch';
import React, { useRef, useState } from 'react'
import Speaker from '@/components/svg/Speaker';
import CopyIcon from '@/components/svg/CopyIcon';
import { extractSpanContent, speakSentence } from '@/utils/helpers';
import Loading from '@/components/Loading';
import Card from '@/components/cards/Card';
import fixSvg from '@/public/illustrations/files.svg';
import BaseInformation from '@/components/reusables/BaseInformation';
import { FastApiFixGrammarResponse } from '@/types/aiResponse';
import IconFix from '@/components/svg/IconFix';
import { useToast } from '@/context/ToastContext';

const INPUT_LIMIT = 600

export default function Page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('');

    const { data, loading, error } = useAPIFetch<FastApiFixGrammarResponse>(sentence ? `/grammar/${encodeURIComponent(sentence)}` : null);

    const { showToast } = useToast();

    const handleFixButton = () => {
        if (textAreaRef.current) {
            if (textAreaRef.current.value.length > INPUT_LIMIT) {
                return showToast('Input limit exceeded', 'warning');
            }
            setSentence(textAreaRef.current.value);
        }
    }

    const rawContent = extractSpanContent(data?.corrected_sentence ?? '');
    const icons = [
        { icon: <Speaker isSpeaking={false} />, onClick: () => speakSentence(rawContent) },
        { icon: <CopyIcon />, onClick: () => navigator.clipboard.writeText(rawContent) },
    ]

    return (
        <div className='main-container'>
            <TextArea textAreaRef={textAreaRef}>
                <div className='premium-button flex items-center justify-center gap-2 w-32 cursor-pointer' onClick={handleFixButton}>
                    <span>Fix</span>
                    <IconFix />
                </div>
            </TextArea>

            {loading && <Loading />}
            {error && <p>Error When Fixing Grammar: {error}</p>}

            {data ? (<div className='card-container'>
                <EllipseHeader ellipseColor='bg-primaryPurple' text='Sentence Fix' />

                <div className='p-4 bg-white flex flex-col gap-8 justify-between rounded-md'>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: data?.original_sentence ?? '' }}></p>
                </div>

                <Card text={data.corrected_sentence} icons={icons} />
            </div>) : (
                !loading && <BaseInformation svgFile={fixSvg}
                    svgWidth={350}
                    svgHeight={350}
                    title='Fix your sentence'
                    description='Fix your sentence with our AI-powered tool. Simply paste your sentence, and let our AI algorithm analyze and correct any grammatical errors, punctuation mistakes, and spelling errors. Our tool is designed to help you improve your writing and communication skills, making it easier for you to express yourself clearly and effectively.' />

            )}
        </div>
    )
}