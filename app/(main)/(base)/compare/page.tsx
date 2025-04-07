'use client'

import Card from '@/components/cards/Card'
import Loading from '@/components/Loading'
import BaseInformation from '@/components/reusables/BaseInformation'
import useAPIFetch from '@/hooks/useAPIFetch'
import { useEffect, useRef, useState } from 'react'
import compareSvg from '@/public/illustrations/search.svg'
import { FastApiAIResponse, FastApiCompareResponse } from '@/types/aiResponse'
import { useToast } from '@/context/ToastContext'
import IconCompare from '@/components/svg/IconCompare'
import ApiError from '@/components/errors/ApiError'

const WORD_LIMIT = 20

export default function Page() {
    const [word_1, setWord_1] = useState('')
    const [word_2, setWord_2] = useState('')

    const [similarityScore, setSimilarityScore] = useState('0');

    const inputRef1 = useRef<HTMLInputElement>(null)
    const inputRef2 = useRef<HTMLInputElement>(null)

    const { data, loading, error } = useAPIFetch<FastApiCompareResponse>(
        word_1 && word_2 ? `/compare/${word_1}/${word_2}` : null
    )

    const { data: similarityData, loading: similarityLoading, error: similarityError } = useAPIFetch<FastApiAIResponse>(word_1 && word_2 ? `/wordSimilarity/${word_1}/${word_2}` : null)
    const { showToast } = useToast();

    const handleClick = () => {
        if (inputRef1.current && inputRef2.current) {
            if (inputRef1.current.value.length > WORD_LIMIT && inputRef2.current.value.length > WORD_LIMIT) {
                return showToast('Word is too long', 'warning');
            }
            setWord_1(inputRef1.current.value)
            setWord_2(inputRef2.current.value)
        }
    }

    useEffect(() => {
        if (similarityData) {
            setSimilarityScore(similarityData.score.toString());
        }
    }, [similarityData])

    return (
        <div className='main-container'>
            <div className='flex flex-col gap-4 bg-white rounded-xl p-4 items-center justify-center'>
                <div className='flex flex-col sm:flex-row items-center gap-4 w-full justify-between p-2 md:p-3 lg:p-6'>
                    <div className='compare-card'>
                        <p className='font-semibold' >First Word</p>
                        <input type="text" className='outline-none border border-primaryText rounded-lg w-56 text-primaryText py-2 px-3' ref={inputRef1} placeholder="Enter First Word" />
                    </div>

                    <div className='compare-card'>
                        <p className='font-semibold' >Second Word</p>
                        <input type="text" className='outline-none border border-primaryText rounded-lg w-56 text-primaryText py-2 px-3' ref={inputRef2} placeholder="Enter Second Word" />
                    </div>
                </div>

                <div className="button-wrapper w-full flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center text-white gap-2 cursor-pointer premium-button w-48" onClick={handleClick}>
                        <IconCompare />
                        <span className='text-whitef font-medium'>Compare</span>
                    </div>
                    <p className='font-medium'>Similarity Score : {
                        !similarityLoading ? (<span className='text-primaryText font-semibold'>{similarityScore}%</span>
                        ) : ('Calculating...')}</p>
                    {similarityError && <ApiError error={similarityError} errorMessage='Similarity score cannot calculated.' />}
                </div>
            </div>


            {loading && <Loading />}
            {error && <ApiError error={error} errorMessage='Failed to compare words.' />}
            {data && data ? (
                <Card>
                    <div className="text-base whitespace-pre-wrap">
                        <p className='font-bold'>Similarities:</p>
                        <p>{data.similarities}</p>
                        <br />
                        <p className='font-bold'>Differences:</p>
                        <p>{data.differences}</p>
                        <br />
                        <p className='font-bold'>Examples of {word_1}:</p>
                        <ul>
                            {data.examples_word1?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                        <br />
                        <p className='font-bold'>Examples of {word_2}:</p>
                        <ul>
                            {data.examples_word2?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            ) : (
                !loading && <BaseInformation svgFile={compareSvg} svgWidth={350} svgHeight={350} title='Compare Words' description='Compare two words and get insights about their similarities and differences.' />
            )}
        </div>
    )
}
