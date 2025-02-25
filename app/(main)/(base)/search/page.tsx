'use client';

import AIWordAnalysis from '@/components/AIWordAnalysis';
import FilterModal, { categoriesList } from '@/components/FilterModal';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import SentenceCard from '@/components/cards/SentenceCard';
import WordInfoCard from '@/components/cards/WordInfoCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NoResultsCard from '@/components/cards/NoResultsCard';
import { FastApiResponse } from '@/types/aiResponse';
import { useToast } from '@/context/ToastContext';
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton';
import { scrollToTop } from '@/utils/helpers';
import ApiError from '@/components/errors/ApiError';

export default function Page() {

  const router = useRouter();

  const params = useSearchParams();
  const currentWord = params.get('word') || 'welcome';
  const currentPage = parseInt(params.get('page') || '1', 10);

  const [word, setWord] = useState(currentWord);
  const [page, setPage] = useState(currentPage);
  const [categories, setCategories] = useState<string[]>(categoriesList.map(cat => cat.id));

  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error } = useAPIFetch<FastApiResponse>(`/sentences/${currentWord}?categories=${categories.join(',')}&page=${page}`);
  const { showToast } = useToast();

  const totalPage = data?.total_results ? Math.ceil(data.total_results / 10) : 1;

  const SEARCH_LIMIT = 100;

  const handleResults = async () => {
    if (word.length > SEARCH_LIMIT) {
      return showToast('Word is too long', 'warning');
    };
    router.push(`/search?word=${word}&page=1`);
    scrollToTop();
  }

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
    <div className='main-container'>
      <div className='sticky top-0 bg-whitef w-full z-10'>
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

      {loading &&
        <div className='flex flex-col gap-4'>
          <OverviewSkeleton />
          <OverviewSkeleton />
        </div>}

      {error && <ApiError error={error} errorMessage='Something went wrong while fetching sentences. Please check your internet connection and try again.' />}

      {modalOpen && <FilterModal onClose={() => setModalOpen(false)} categories={categories} setCategories={setCategories} />}

      {data ? (
        <div className='flex flex-col gap-8'>
          <WordInfoCard setWord={setWord} currentWord={currentWord} />
          {currentWord && (<header className="card-container">
            <EllipseHeader ellipseColor='bg-purple-400' text='AI Feedback' />
            <AIWordAnalysis currentWord={currentWord} />
          </header>)}
          <article className='flex flex-col gap-8 p-2 md:p-6 bg-lightBlue w-full'>
            <EllipseHeader ellipseColor='bg-blue-300' text='Exact' />
            <div className='sentence-cards flex flex-col gap-8'>
              {data?.sentences?.map((sentence, index) => (
                <SentenceCard key={index} sentence={sentence.text} word={currentWord} source={sentence.source} />
              ))}
            </div>

            <Pagination page={page} count={totalPage} onChange={handlePageChange} className='w-full justify-center items-center flex' />
          </article>
        </div>

      ) : (
        currentWord && !loading && <NoResultsCard />
      )}
    </div>
  )
}
