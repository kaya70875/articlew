'use client';

import FilterModal from '@/components/FilterModal';
import Loading from '@/components/Loading';
import SentenceCard from '@/components/SentenceCard';
import useFetch from '@/hooks/useFetch';
import { FastApiResponse } from '@/types/sentence';
import { Pagination } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {

  const router = useRouter();

  const params = useSearchParams();
  const currentWord = params.get('word') || '';
  const currentPage = parseInt(params.get('page') || '1', 10);
  const currentCategories = params.get('categories') || 'science';

  const [word, setWord] = useState(currentWord);
  const [page, setPage] = useState(currentPage);
  const [categories, setCategories] = useState<string[]>(currentCategories ? currentCategories.split(',') : []);

  console.log('cat' , categories);

  const [modalOpen , setModalOpen] = useState(false);

  const { data, loading, error } = useFetch<FastApiResponse>(currentWord ? `/sentences/${currentWord}?categories=${categories.join(',')}&page=${page}` : null);

  const auth = useSession();
  const currentUser = auth.data?.user;

  const totalPage = data?.total_results ? Math.ceil(data.total_results / 10) : 1;

  const handleResults = () => {
    router.push(`/search?word=${word}&categories=${categories.join(',')}&page=1`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`/search?word=${word}&categories=${categories.join(',')}&page=${value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleResults();
    }
  };

  useEffect(() => { 
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => { // Change url when categories change
    handleResults();
  } , [categories])


  return (
    <div className='flex flex-col gap-8 w-full'>
      <header className="top flex flex-col gap-4">
        <h3>Welcome Again , {currentUser?.name}</h3>
        <p>Choose a word to get started!</p>

        <input type="text" className='hero-input' onChange={(e) => setWord(e.target.value)} value={word} onKeyDown={handleKeyDown} />
      </header>

      {loading && <Loading />}

      {modalOpen && (
        <FilterModal onClose={() => setModalOpen(false)} categories={categories} setCategories={setCategories} />
      )}

      {data && (
        <article className='flex flex-col gap-8 p-12 bg-lightBlue w-full'>
          <header className='flex w-full items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <h4>Sentences About <span className='capitalize'>{currentWord}</span></h4>
              <p className='text-primaryBlue text-base flex items-center gap-2'>Active Categories : {categories.map(cat => (
                <span className=''>{cat}</span>
              ))}</p>
            </div>

            <span className='cursor-pointer' onClick={() => setModalOpen(true)}>Change Content</span>
          </header>
          <div className='sentence-cards flex flex-col gap-8'>
            {data?.sentences?.map((sentence, index) => (
              <SentenceCard key={index} sentence={sentence.text} word={currentWord} source={sentence.source} />
            ))}
          </div>

          <Pagination page={page} count={totalPage} onChange={handlePageChange} className='w-full justify-center items-center flex' />
        </article>
      )}

    </div>
  )
}
