import { CategorySentence, FavoriteSentences } from '@/types/sentence';
import React, { useState, useEffect } from 'react';
import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { useCurrentUser } from '@/utils/helpers';
import { mutate } from 'swr';
import Dropdown from '../Dropdown';
import ModalComp from '../ModalComp';
import useFetch from '@/hooks/useFetch';
import { useCategoryActions } from '@/hooks/useCategoryActions';
import Card from './Card';
import IconDots from '../svg/IconDots';
import Loading from '../Loading';

interface FavoriteCardProps {
  favorites: FavoriteSentences[];
}

export default function FavoritesCard({ favorites }: FavoriteCardProps) {
  const { data: categories, loading, error } = useFetch<CategorySentence[]>('/api/words/categories');

  const user = useCurrentUser();
  const userid = user?.id;

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
    if (!userid) return;

    await handleFavorites(sentence, userid, '', 'DELETE');
    mutate('/api/words/getFavorites');
  };

  const handleAssignCategory = async () => {
    if (!userid) return;

    if (selectedSentenceId && choosedCategory) {
      await assignCategory(choosedCategory, selectedSentenceId, userid);
      mutate('/api/words/getFavorites');
      setModal(false);
    }
  };

  return (
    <>
      {favorites?.map((sentence, index) => (
        <Card text={sentence.sentence} key={index} >
          <div className='flex w-full items-center justify-between gap-4'>
            <Dropdown
              dropdownTitle={(
                <IconDots />
              )}
            >
              <li className='w-full'>
                <p className='text-base cursor-pointer' data-dropdown-clickable onClick={() => { setSelectedSentenceId(sentence._id); setModal(true); }}>Assign to a new category</p>
              </li>
              <li className='w-full'>
                <p className='text-base cursor-pointer' data-dropdown-clickable onClick={() => handleDelete(sentence.sentence)}>Delete</p>
              </li>
            </Dropdown>
          </div>
        </Card>
      ))}

      {error && <p className='text-red-400'>Error: {error}</p>}
      {loading && <Loading />}

      {modal && (
        <ModalComp
          onClose={() => setModal(false)}
          modalTitle='Assign to a new category'
          buttonTitle='Assign'
          createNewCategory={handleAssignCategory}
        >
          {categories?.length ? categories?.map((category, index) => (
            <div
              className={`category-wrapper cursor-pointer bg-lightBlue p-4 flex items-center gap-4`}
              key={index}
              onClick={() => setChoosedCategory(category.category)}
            >
              <input type="checkbox" readOnly checked={choosedCategory === category.category} />
              <p>{category.category}</p>
            </div>
          )) : (
            <p>No Categories Yet.</p>
          )}
        </ModalComp>
      )}
    </>
  );
}