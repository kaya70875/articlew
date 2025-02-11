import useAPIFetch from '@/hooks/useAPIFetch';
import React from 'react'
import Loading from './Loading';
import { highlighWord, prettyAIResponse } from '@/utils/helpers';
import CorrectIcon from './svg/CorrectIcon';
import IconWrong from './svg/IconWrong';
import Card from './cards/Card';
import { FastApiAIFeedbackResponse } from '@/types/aiResponse';

interface AIWordAnalysisProps {
    currentWord: string;
}

export default function AIWordAnalysis({ currentWord }: AIWordAnalysisProps) {

    const { data: ai, loading: aiLoading, error: aiError } = useAPIFetch<FastApiAIFeedbackResponse>(currentWord ? `/generate/${currentWord}` : null);

    const prettierResponse = prettyAIResponse(ai?.analysis ?? '');
    const highligedResponse = highlighWord(prettierResponse, currentWord, 'text-primaryText');


    return (
        <Card gap='1rem' >
            {aiLoading && <Loading />}
            {ai && <div className="check flex items-center gap-2">
                {ai?.check.includes('is a correct') ? (<CorrectIcon props={{ color: '#AEC976' }} />) : (<IconWrong props={{ color: 'red' }} />)}
                <p className='text-lg' dangerouslySetInnerHTML={{ __html: highlighWord(ai?.check, currentWord, 'text-primaryText') }}></p>
            </div>}

            {ai && <p className='text-base' dangerouslySetInnerHTML={{ __html: highligedResponse }} />}
        </Card>
    )
}
