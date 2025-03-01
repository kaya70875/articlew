'use client';

import Loading from '@/components/Loading';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea';
import useAPIFetch from '@/hooks/useAPIFetch';
import React, { useRef, useState } from 'react'
import Speaker from '@/components/svg/Speaker';
import { speakSentence } from '@/utils/helpers';
import CopyIcon from '@/components/svg/CopyIcon';
import { FastApiAIResponse } from '@/types/aiResponse';
import IconParaphrase from '@/components/svg/IconParaphrase';
import { useToast } from '@/context/ToastContext';
import ApiError from '@/components/errors/ApiError';
import { ParaphraseCards } from './components/ParaphraseCards';
import { ContextButtons } from './components/ContextButtons';
import CardContainer from '@/components/reusables/containers/CardContainer';
type Context = 'Casual' | 'Academic' | 'Formal' | 'Sortened' | 'Extended' | 'Poetic';
const INPUT_LIMIT = 400;

export default function Page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('How can I write this sentence in different ways?');
    const [context, setContext] = useState<Context>('Casual');

    const { showToast } = useToast();

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/paraphrase/${encodeURIComponent(sentence)}/${context}` : null);

    const icons = [
        { icon: <Speaker isSpeaking={false} />, onClick: (sent: string) => speakSentence(sent) },
        { icon: <CopyIcon />, onClick: (sent: string) => navigator.clipboard.writeText(sent) },
    ]

    const handleParaphraseClick = () => {
        if (textAreaRef.current) {
            if (textAreaRef.current.value.length > INPUT_LIMIT) {
                return showToast('Input limit exceeded', 'warning');
            }
            setSentence(textAreaRef.current.value);
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='main-container items-center justify-center'>
                <TextArea textAreaRef={textAreaRef} defaultValue={sentence}>
                    <ContextButtons context={context} setContext={setContext} />
                    <div className="premium-button flex items-center justify-center gap-2 cursor-pointer" onClick={handleParaphraseClick}>
                        <span>Paraphrase</span>
                        <IconParaphrase />
                    </div>
                </TextArea>

                {loading && <Loading />}
                {error && <ApiError error={error} errorMessage='Failed to paraphrase sentence' />}

                {data &&
                    <CardContainer>
                        <EllipseHeader ellipseColor='bg-primaryPurple' text='Rewrites' />
                        <ParaphraseCards data={data} icons={icons} />
                    </CardContainer>}
            </div>
        </div>
    )
}
