'use client';

import Dropdown from '@/components/Dropdown';
import FavoritesCard from '@/components/FavoritesCard';
import InputField from '@/components/inputs/InputField';
import Loading from '@/components/Loading';
import ModalComp from '@/components/ModalComp';
import { useCategoryActions } from '@/hooks/useCategoryActions';
import useFetch from '@/hooks/useFetch';
import {
    CategorySentence,
    FavoriteSentences
} from '@/types/sentence';
import { getCurrentUser } from '@/utils/helpers';
import React, { useState } from 'react';
import { mutate } from 'swr';

export default function Page() {
    const { data, loading, error } = useFetch<FavoriteSentences[]>('/api/words/getFavorites');
    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetch<CategorySentence[]>('/api/words/categories');
    const { addCategory, deleteCategory } = useCategoryActions();

    const user = getCurrentUser();
    const userId = user?.id;

    const [inputValue, setInputValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: filteredFavorites, loading: filteredLoading, error: filteredError } = useFetch<FavoriteSentences[]>(selectedCategory ? `/api/words/updateCategory?category=${selectedCategory}` : null);

    const categories = categoriesData || [];

    const handleRemoveCategory = async (category: string, e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        await deleteCategory(category, userId!);
        mutate('/api/words/categories');
    }

    const handleAddCategory = async () => {
        await addCategory(inputValue, userId!);
        mutate('/api/words/categories');
        setModalOpen(false);
    }

    const handleChoosingCategory = (category: string) => {
        setSelectedCategory(category);
    }

    return (
        <div className='flex flex-col w-full gap-8 p-4'>
            <header className='w-full flex flex-col gap-2'>
                <h2>Your Favorites</h2>
                <InputField placeholder='Search in favorites' label='' />
            </header>

            <div className='filter-options flex items-center gap-4 w-full'>
                <Dropdown
                    dropdownTitle={
                        <button className='ghost-button'>Categories</button>
                    }
                    handleNewCategoryClick={() => setModalOpen(true)}
                    addButton
                >
                    {categories.map((category, index) => (
                        <li className='flex items-center w-full justify-between' key={index} onClick={() => handleChoosingCategory(category.category)}>
                            {categoriesLoading && <Loading />}
                            <p className='text-base cursor-pointer'>{category.category}</p>
                            <p onClick={(e) => handleRemoveCategory(category.category, e)} className='text-sm cursor-pointer'>x</p>
                        </li>
                    ))}
                </Dropdown>

                <button onClick={() => setSelectedCategory(null)} className='ghost-button'>See All</button>
            </div>

            {selectedCategory && (
                <p>Showing categories for {selectedCategory}</p>
            )}

            {modalOpen && (
                <ModalComp
                    modalTitle='Add New Category'
                    buttonTitle='Add'
                    createNewCategory={handleAddCategory}
                    onClose={() => setModalOpen(false)}
                >
                    <InputField onChange={(e) => setInputValue(e.target.value)} label='Category Name' />
                </ModalComp>
            )}

            {loading || filteredLoading ? (
                <Loading />
            ) : (
                <FavoritesCard favorites={filteredFavorites || data || []} />
            )}
        </div>
    );
}