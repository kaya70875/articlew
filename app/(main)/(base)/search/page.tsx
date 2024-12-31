'use client';

import Loading from '@/components/Loading';
import SentenceCard from '@/components/SentenceCard';
import useFetch from '@/hooks/useFetch';
import { FastApiResponse } from '@/types/sentence';
import { CircularProgress } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function page() {

  const router = useRouter();

  const params = useSearchParams();
  const currentWord = params.get('word') || '';

  const [categories, setCategories] = useState<string[]>(['Science', 'News']);
  const [word, setWord] = useState(currentWord);

  const { data, loading, error } = useFetch<FastApiResponse>(currentWord ? `/sentences/${currentWord}` : null);

  const auth = useSession();
  const currentUser = auth.data?.user;

  const handleResults = () => {
    router.push(`/search?word=${word}`);
  };

  return (
    <div className='flex flex-col gap-8 w-full'>
      <header className="top flex flex-col gap-4">
        <h3>Welcome Again , {currentUser?.name}</h3>
        <p>Choose a word to get started!</p>

        <input type="text" className='hero-input' onChange={(e) => setWord(e.target.value)} />
      </header>

      <div className="top-info flex flex-col gap-4">
        <p>* Search Some Words That You Want To İnclude In Any Sentence.</p>
        <p>* Use Filter To See Different Subjects or Sources</p>
      </div>

      <div className="buttons flex items-center gap-4 w-full justify-center">
        <button onClick={handleResults} className="primary-button !py-4 w*48" >
          Generate Sentences
        </button>

        <button className="secondary-button !py-4 w-48">
          Filter
        </button>
      </div>

      {loading && <Loading />}

      {data && (
        <article className='flex flex-col gap-8 p-12 bg-lightBlue w-full'>
          <header className='flex w-full items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <h4>Sentences About <span className='capitalize'>{currentWord}</span></h4>
              <p className='text-primaryBlue text-base flex items-center gap-2'>Active Categories : {categories.map(cat => (
                <span className=''>{cat}</span>
              ))}</p>
            </div>

            <span>Change Content</span>
          </header>
          <div className='sentence-cards flex flex-col gap-4'>
            {data?.sentences.slice(0, 5).map((sentence, index) => (
              <SentenceCard key={index} sentence={sentence.text} word={currentWord} />
            ))}
          </div>
        </article>
      )}

    </div>
  )
}
