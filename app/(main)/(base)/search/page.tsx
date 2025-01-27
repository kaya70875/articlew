'use client';

import AIWordAnalysis from '@/components/AIWordAnalysis';
import FilterModal, { categoriesList } from '@/components/FilterModal';
import Loading from '@/components/Loading';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import SentenceCard from '@/components/cards/SentenceCard';
import WordInfoCard from '@/components/cards/WordInfoCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiResponse } from '@/types/sentence';
import { Pagination } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {

  const router = useRouter();

  const params = useSearchParams();
  const currentWord = params.get('word') || '';
  const currentPage = parseInt(params.get('page') || '1', 10);

  const [word, setWord] = useState(currentWord);
  const [page, setPage] = useState(currentPage);
  const [categories, setCategories] = useState<string[]>(categoriesList.map(cat => cat.id));

  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error } = useAPIFetch<FastApiResponse>(currentWord ? `/sentences/${currentWord}?categories=${categories.join(',')}&page=${page}` : null);

  const auth = useSession();
  const currentUser = auth.data?.user;

  const totalPage = data?.total_results ? Math.ceil(data.total_results / 10) : 1;

  const handleResults = async () => {
    router.push(`/search?word=${word}&page=1`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`/search?word=${word}&categories=${categories.join(',')}&page=${value}`);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleResults();
    }
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className='flex flex-col gap-8 w-2/3'>
      <header className="top flex flex-col gap-4 h-full">
        <h3>Welcome Again , {currentUser?.name}</h3>
        <p>Choose a word to get started!</p>
      </header>
      <div className='sticky top-0 bg-whitef w-full'>
        <div className='input-wrapper py-4 relative w-full'>
          <input type="text" className='hero-input w-full' onChange={(e) => setWord(e.target.value)} value={word} onKeyDown={handleKeyDown} />
          <div className="filter-icon hover:bg-gray-200 p-2 rounded-md flex items-center gap-2 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setModalOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className='font-medium text-base text-primaryText'>FILTER</p>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {error && <p>Error: {error.message}</p>}

      <div className={`filter-modal transition-all ease-in-out duration-300 ${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <FilterModal onClose={() => setModalOpen(false)} categories={categories} setCategories={setCategories} />
      </div>

      {data && (
        <div className='flex flex-col gap-8'>
          <WordInfoCard currentWord={currentWord} />
          <header className="ai-feedback bg-lightBlue rounded-md w-full p-6 flex flex-col gap-4">
            <EllipseHeader ellipseColor='bg-purple-400' text='AI Feedback' />
            <AIWordAnalysis currentWord={currentWord} />
          </header>
          <article className='flex flex-col gap-8 p-6 bg-lightBlue w-full'>
            <EllipseHeader ellipseColor='bg-blue-300' text='Exact' />
            <div className='sentence-cards flex flex-col gap-8'>
              {data?.sentences?.map((sentence, index) => (
                <SentenceCard key={index} sentence={sentence.text} word={currentWord} source={sentence.source} />
              ))}
            </div>

            <Pagination page={page} count={totalPage} onChange={handlePageChange} className='w-full justify-center items-center flex' />
          </article>
        </div>

      )}
    </div>
  )
}
