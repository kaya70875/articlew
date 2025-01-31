import useFetch from '@/hooks/useFetch'
import React, { useState } from 'react'
import Loading from '../Loading'
import { WordnikDefinition, WordnikSynonym } from '@/types/wordnik'
import { useRouter } from 'next/navigation';
import { speakSentence } from '@/utils/helpers';
import EllipseHeader from '../reusables/EllipseHeader';
import Speaker from '../svg/Speaker';
import ChevronUp from '../svg/ChevronUp';
import ChevronDown from '../svg/ChevronDown';

export default function WordInfoCard2({ currentWord }: { currentWord: string }) {

    const router = useRouter();

    const api_key = process.env.NEXT_PUBLIC_WORDNIK_API_KEY

    const { data: definitions, loading: loadingDefinitions, error: errorDefinitions } = useFetch<WordnikDefinition[]>(`https://api.wordnik.com/v4/word.json/${currentWord}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${api_key}`)
    const { data: synonyms, loading: loadingSynonyms, error: errorSynonyms } = useFetch<WordnikSynonym[]>(`https://api.wordnik.com/v4/word.json/${currentWord}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=8&api_key=${api_key}`)

    const verb = definitions?.filter(item => item.partOfSpeech === 'intransitive verb') || []
    const noun = definitions?.filter(item => item.partOfSpeech === 'noun') || []
    const adjective = definitions?.filter(item => item.partOfSpeech === 'adjective') || []
    const adverb = definitions?.filter(item => item.partOfSpeech === 'adverb') || []

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const renderSection = (data: WordnikDefinition[]) => {
        return (
            <div className='flex w-full gap-4 flex-col'>
                {data?.slice(0, 2).map((item, index) => (
                    <div key={index} className='flex w-full justify-between gap-2 items-center bg-white p-4 rounded-md shadow-md'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>{item.partOfSpeech.replace('intransitive ', '')}</p>
                            <p className='font-medium text-lg max-w-3xl px-4' dangerouslySetInnerHTML={{ __html: item.text }} />
                            {<div className='px-8'>{item.exampleUses?.slice(0, 1)?.map(example => (
                                <p className='text-sm'>{example.text}</p>
                            ))}</div>}
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-sm text-gray-600'>Synonyms</p>
                            <div className='flex items-center gap-4'>
                                {synonyms?.map((synonym: WordnikSynonym, index: number) => (
                                    synonym.words.slice(0, 4).map((word: string, wordIndex: number) => (
                                        <div className="syn-card p-2 flex items-center justify-center border border-primaryText rounded-md cursor-pointer" key={wordIndex} onClick={() => handleSynonymClick(word)}>
                                            <p className='text-sm text-primaryText font-semibold'>{word}</p>
                                        </div>
                                    ))
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const handleSynonymClick = (synonym: string) => {
        router.push(`/search?word=${synonym}`);
    };

    const handleSpeakWord = async () => {
        speakSentence(currentWord);
    }

    return (
        <div className='flex flex-col gap-8 p-6 bg-lightBlue rounded-md'>
            <EllipseHeader ellipseColor='bg-primaryBlue' text='Dictionary' />
            <div className='flex items-center w-full justify-between'>
                <div className="word-itself flex items-center gap-3">
                    <div className='cursor-pointer' onClick={handleSpeakWord}>
                        <Speaker isSpeaking={isSpeaking} />
                    </div>
                    <p className='font-bold'>{currentWord}</p>
                </div>

                <div className='cursor-pointer flex items-center gap-2 text-primaryText' onClick={() => setShowMore(prev => !prev)}>
                    <p className='font-bold text-sm'>Show More...</p>
                    {showMore ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>

            {errorDefinitions && <p>Error fetching word info</p>}
            {loadingDefinitions && <Loading />}
            {definitions && (
                <>
                    {verb?.length > 0 && renderSection(verb)}
                    {showMore && (
                        <>
                            {noun?.length > 0 && renderSection(noun)}
                            {adjective?.length > 0 && renderSection(adjective)}
                            {adverb?.length > 0 && renderSection(adverb)}
                        </>
                    )}

                </>
            )}
        </div>
    )
}
