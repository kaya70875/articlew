import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React from 'react'
import Loading from './Loading';
import { highlighWord, prettyAIResponse } from '@/utils/helpers';

interface AIWordAnalysisProps {
    currentWord: string;
}

export default function AIWordAnalysis({ currentWord }: AIWordAnalysisProps) {

    const { data: ai, loading: aiLoading, error: aiError } = useAPIFetch<FastApiAIResponse>(currentWord ? `/generate/${currentWord}` : null);
    const prettierResponse = prettyAIResponse(ai?.response!);
    const highligedResponse = highlighWord(prettierResponse, currentWord, 'text-primaryText');

    return (
        <div className="content flex flex-col gap-4 rounded-lg p-6 bg-white">
            {aiLoading && <Loading />}
            <p className='text-base' dangerouslySetInnerHTML={{ __html: highligedResponse }} />
        </div>
    )
}
