'use client';

import SentenceCard from '@/components/SentenceCard'
import useFetch from '@/hooks/useFetch';
import { FastApiResponse } from '@/types/sentence';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {

    const params = useParams();
    const word = params.word;

    console.log(word);

    const [categories , setCategories] = useState<string[]>(['Science' , 'News']);

    const {data , loading , error} = useFetch<FastApiResponse>(`/sentences/${word}`);

  return (
        <article className='flex flex-col gap-8 p-8 bg-lightBlue w-full'>
        <header className='flex w-full items-center justify-between'>
          <div className='flex flex-col gap-4'>
            <h4>Sentences About <span>{word}</span></h4>
            <p className='text-primaryBlue text-base flex items-center gap-2'>Active Categories : {categories.map(cat => (
              <span className=''>{cat}</span>
            ))}</p>
          </div>

          <span>Change Content</span>
        </header>
        <div className='sentence-cards flex flex-col gap-4'>
          {data?.sentences.slice(0 , 5).map((sentence , index) => (
            <SentenceCard key={index} sentence={sentence.text}/>
          ))}
        </div>
      </article>
  )
}
