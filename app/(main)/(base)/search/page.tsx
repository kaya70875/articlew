'use client';

import React from 'react';
import FilterModal from '@/components/FilterModal';
import NoResultsCard from '@/components/cards/NoResultsCard';
import ApiError from '@/components/errors/ApiError';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import SearchLoading from './components/SearchLoading';
import useSearch from '@/hooks/useSearch';
import ModalTransitionContainer from '@/components/reusables/containers/ModalTransitionContainer';

export default function Page() {
  const {
    word,
    setWord,
    currentPage,
    currentWord,
    categories,
    setCategories,
    modalOpen,
    openFilterModal,
    closeFilterModal,
    data,
    loading,
    error,
    totalPage,
    handleResults,
    handlePageChange
  } = useSearch();

  return (
    <div className='main-container'>
      <SearchInput
        word={word}
        setWord={setWord}
        handleResults={handleResults}
        openFilterModal={openFilterModal}
      />

      {loading && <SearchLoading />}

      {error && (
        <ApiError
          error={error}
          errorMessage='Something went wrong while fetching sentences. Please check your internet connection and try again.'
        />
      )}

      <ModalTransitionContainer modalOpen={modalOpen}>
        <FilterModal
          onClose={closeFilterModal}
          categories={categories}
          setCategories={setCategories}
        />
      </ModalTransitionContainer>

      {data ? (
        <SearchResults
          data={data}
          currentWord={currentWord}
          page={currentPage}
          totalPage={totalPage}
          setWord={setWord}
          handlePageChange={handlePageChange}
        />
      ) : (
        currentWord && !loading && <NoResultsCard />
      )}
    </div>
  );
}
