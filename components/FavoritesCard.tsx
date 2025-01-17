import { CategorySentence, FavoriteSentences } from '@/types/sentence';
import React, { useState, useEffect } from 'react';
import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { getCurrentUser } from '@/utils/helpers';
import { mutate } from 'swr';
import Dropdown from './Dropdown';
import ModalComp from './ModalComp';
import useFetch from '@/hooks/useFetch';
import { useCategoryActions } from '@/hooks/useCategoryActions';

interface FavoriteCardProps {
  favorites: FavoriteSentences[];
}

export default function FavoritesCard({ favorites }: FavoriteCardProps) {
  const { data: categories, loading, error } = useFetch<CategorySentence[]>('/api/words/categories');
  const user = getCurrentUser();
  const { handleFavorites } = useSentenceCardActions();
  const { assignCategory } = useCategoryActions();

  const [modal, setModal] = useState(false);
  const [choosedCategory, setChoosedCategory] = useState<string | null>(null);
  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null);

  useEffect(() => { // Initialize choosedCategory checkbox state to reflect the current choosed category.
    if (selectedSentenceId) {
      const selectedSentence = favorites.find(sentence => sentence._id === selectedSentenceId);
      setChoosedCategory(selectedSentence?.categoryId || null);
    }
  }, [selectedSentenceId, favorites]);

  const handleDelete = async (sentence: string) => {
    await handleFavorites(sentence, user?.id!, '', 'DELETE');
    mutate('/api/words/getFavorites');
  };

  const handleAssignCategory = async () => {
    if (selectedSentenceId && choosedCategory) {
      await assignCategory(choosedCategory, selectedSentenceId, user?.id!);
      mutate('/api/words/getFavorites');
      setModal(false);
    }
  };

  return (
    <>
      {favorites?.map((sentence, index) => (
        <div key={index} className='flex flex-col gap-8 p-8 bg-lightBlue w-full rounded-md'>
          <div className='flex w-full items-center justify-between gap-4'>
            <p dangerouslySetInnerHTML={{ __html: sentence.sentence }} />
            <Dropdown
              position='right'
              dropdownTitle={(
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="none" />
                  <circle cx="7" cy="12" r="0.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="0.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="17" cy="12" r="0.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            >
              <li className='w-full'>
                <p className='text-base cursor-pointer' onClick={() => { setSelectedSentenceId(sentence._id); setModal(true); }}>Assign to a new category</p>
              </li>
              <li className='w-full'>
                <p className='text-base cursor-pointer' onClick={() => handleDelete(sentence.sentence)}>Delete</p>
              </li>
            </Dropdown>
          </div>
        </div>
      ))}

      {modal && (
        <ModalComp
          onClose={() => setModal(false)}
          modalTitle='Assign to a new category'
          buttonTitle='Assign'
          createNewCategory={handleAssignCategory}
        >
          {categories?.map((category, index) => (
            <div
              className={`category-wrapper cursor-pointer bg-lightBlue p-4 flex items-center gap-4`}
              key={index}
              onClick={() => setChoosedCategory(category.category)}
            >
              <input type="checkbox" readOnly checked={choosedCategory === category.category} />
              <p>{category.category}</p>
            </div>
          ))}
        </ModalComp>
      )}
    </>
  );
}