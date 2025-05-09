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
import { useSearchParams } from 'next/navigation';
import ApiError from '../errors/ApiError';
import ModalTransitionContainer from '../reusables/containers/ModalTransitionContainer';
import DropdownLink from '../dropdown/DropdownLink';

interface FavoriteCardProps {
  favorites: FavoriteSentences[];
}

export default function FavoritesCard({ favorites }: FavoriteCardProps) {
  const { data: categories, loading, error } = useFetch<CategorySentence[]>('/api/words/categories');

  const user = useCurrentUser();
  const userid = user?.id;

  const searchParams = useSearchParams();

  const { handleFavorites } = useSentenceCardActions();
  const { assignCategory, removeFromCategory } = useCategoryActions();

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
      mutate(`/api/words/updateCategory?category=${choosedCategory}`);
      setModal(false);
    }
  };

  const handleRemoveFromCategory = async (sentence: FavoriteSentences) => {
    if (!userid || !sentence.categoryId) return;

    await removeFromCategory(sentence.sentence, sentence.categoryId);
    mutate(`/api/words/updateCategory?category=${sentence.categoryId}`);
  }

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
              <DropdownLink name='Assign to a new category' onClick={() => { setSelectedSentenceId(sentence._id); setModal(true) }} />
              {searchParams.has('category') && <DropdownLink name={`Remove from ${sentence.categoryId}`} onClick={() => handleRemoveFromCategory(sentence)} />}
              <DropdownLink name='Delete' onClick={() => handleDelete(sentence.sentence)} />
            </Dropdown>
          </div>
        </Card>
      ))}

      {error && <ApiError error={error} errorMessage='Cannot get favorites.' />}
      {loading && <Loading />}

      <ModalTransitionContainer modalOpen={modal}>
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
      </ModalTransitionContainer>
    </>
  );
}