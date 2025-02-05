'use client'

import Card from '@/components/cards/Card'
import Loading from '@/components/Loading'
import useAPIFetch from '@/hooks/useAPIFetch'
import { useParseJson } from '@/hooks/useParseJson'
import { FastApiAIResponse } from '@/types/sentence'
import { useRef, useState } from 'react'

export default function Page() {
    const [word_1, setWord_1] = useState('')
    const [word_2, setWord_2] = useState('')

    const inputRef1 = useRef<HTMLInputElement>(null)
    const inputRef2 = useRef<HTMLInputElement>(null)

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(
        word_1 && word_2 ? `/compare/${word_1}/${word_2}` : null
    )

    const handleClick = () => {
        if (inputRef1.current && inputRef2.current) {
            setWord_1(inputRef1.current.value)
            setWord_2(inputRef2.current.value)
        }
    }

    const jsonResponse = useParseJson(data?.response!)

    return (
        <div className='flex flex-col p-6 bg-lightBlue rounded-md gap-8 w-1/2'>
            <div className='flex flex-col gap-4 bg-white rounded-md p-4'>
                <div className='flex items-center gap-4 w-full justify-around p-6'>
                    <div className='compare-card'>
                        <input type="text" className='outline-none text-primaryText p-2' ref={inputRef1} placeholder="Enter First Word" />
                    </div>

                    <h4 className='font-bold'>AND</h4>

                    <div className='compare-card'>
                        <input type="text" className='outline-none text-primaryText p-2' ref={inputRef2} placeholder="Enter Second Word" />
                    </div>
                </div>

                <div className="button-wrapper w-full flex items-center justify-center">
                    <button className="primary-button w-1/3" onClick={handleClick}>Compare</button>
                </div>
            </div>


            {loading && <Loading />}
            {error && <div>Error: {error}</div>}
            {jsonResponse && data && (
                <Card>
                    <div className="text-base whitespace-pre-wrap">
                        <p className='font-bold'>Similarities:</p>
                        <p>{jsonResponse.similarities}</p>
                        <br />
                        <p className='font-bold'>Differences:</p>
                        <p>{jsonResponse.differences}</p>
                        <br />
                        <p className='font-bold'>Examples of {word_1}:</p>
                        <ul>
                            {jsonResponse[`examples_${word_1}`]?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                        <br />
                        <p className='font-bold'>Examples of {word_2}:</p>
                        <ul>
                            {jsonResponse[`examples_${word_2}`]?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            )}
        </div>
    )
}
