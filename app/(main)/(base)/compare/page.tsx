'use client'

import Loading from '@/components/Loading'
import useAPIFetch from '@/hooks/useAPIFetch'
import { FastApiAIResponse } from '@/types/sentence'
import { useRef, useState, useEffect } from 'react'

export default function Page() {
    const [word_1, setWord_1] = useState('')
    const [word_2, setWord_2] = useState('')

    const [jsonResponse, setJsonResponse] = useState<Record<string, any> | null>(null)

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

    // Use useEffect to update jsonResponse safely
    useEffect(() => {
        if (data?.response) {
            try {
                const jsonString = data.response.replace(/^.*?```json\n|\n```$/g, '')
                const response = JSON.parse(jsonString)
                setJsonResponse(response)
            } catch (error) {
                console.error('Failed to parse JSON:', error)
                setJsonResponse(null)
            }
        }
    }, [data])

    return (
        <div className='flex flex-col gap-8 w-1/2'>
            <div className='flex items-center gap-4 w-full justify-around p-6 bg-lightBlue'>
                <div className='compare-card p-6 bg-white'>
                    <input type="text" ref={inputRef1} placeholder="Enter first word" />
                </div>

                <div className='p-6 bg-white'>
                    <input type="text" ref={inputRef2} placeholder="Enter second word" />
                </div>
            </div>

            <button className="primary-button" onClick={handleClick}>Compare</button>

            {loading && <Loading />}
            {jsonResponse && (
                <div className='compare-result p-6 bg-lightBlue rounded-md flex flex-col gap-4'>
                    <header className='flex items-center w-full justify-between'>
                        <h3>Comparison Result</h3>
                    </header>

                    {/* Render JSON object properly */}
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
                </div>
            )}
        </div>
    )
}
