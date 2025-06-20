import useAPIFetch from '@/hooks/useAPIFetch';
import React from 'react'
import Loading from './Loading';
import { highlighWord, prettyAIResponse } from '@/utils/helpers';
import CorrectIcon from './svg/CorrectIcon';
import IconWrong from './svg/IconWrong';
import Card from './cards/Card';
import { FastApiAIFeedbackResponse } from '@/types/aiResponse';
import SafeHTML from './security/SafeHTML';
import ApiError from './errors/ApiError';
interface AIWordAnalysisProps {
    currentWord: string;
}

export default function AIWordAnalysis({ currentWord }: AIWordAnalysisProps) {

    const { data: ai, loading: aiLoading, error: aiError } = useAPIFetch<FastApiAIFeedbackResponse>(currentWord ? `/generate/${currentWord}` : null);

    const prettierResponse = prettyAIResponse(ai?.analysis ?? '');
    const highlightedResponse = highlighWord(prettierResponse, currentWord, 'text-primaryText');


    return (
        <Card gap='1rem' >
            {aiLoading && <Loading />}
            {ai && <div className="check flex items-center gap-2">
                {ai?.check.includes('is a correct') ? (<CorrectIcon props={{ color: '#AEC976' }} />) : (<IconWrong props={{ color: 'red' }} />)}
                <SafeHTML className='text-lg' html={highlighWord(ai?.check, currentWord, 'text-primaryText')} />
            </div>}

            {ai && <SafeHTML className='text-base' html={highlightedResponse} />}
            {aiError && <ApiError error={aiError} errorMessage='Failed to generate AI feedback' />}
        </Card>
    )
}
