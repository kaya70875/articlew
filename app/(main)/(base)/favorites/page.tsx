'use client';

import Dropdown from '@/components/Dropdown';
import FavoritesCard from '@/components/cards/FavoritesCard';
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
import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';

export default function Page() {
    const { data, loading, error } = useFetch<FavoriteSentences[]>('/api/words/getFavorites');
    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetch<CategorySentence[]>('/api/words/categories'); // Fetch categories like 'top 10'
    const { addCategory, deleteCategory } = useCategoryActions();

    const user = getCurrentUser();
    const userId = user?.id;

    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [filteredData, setFilteredData] = useState<FavoriteSentences[]>([]);

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

    useEffect(() => {
        if (searchValue) {
            const filteredByWord = data?.filter(item => item.sentence.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredData(filteredByWord ?? []);
        }
    }, [searchValue])

    return (
        <div className='main-container p-4'>
            <header className='w-full flex flex-col gap-2'>
                <h2>Your Favorites</h2>
                <InputField placeholder='Search in favorites' label='' onChange={(e) => setSearchValue(e.target.value)} />
            </header>

            <div className='filter-options flex items-center gap-4 w-full justify-between'>
                <div className='left flex items-center gap-4'>
                    <Dropdown
                        dropdownTitle={
                            <button className="ghost-button">Categories</button>
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

            </div>

            {selectedCategory && (
                <p>Showing categories for {selectedCategory}</p>
            )}

            <div className={`filter-modal transition-all ease-in-out duration-300 ${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <ModalComp
                    modalTitle='Add New Category'
                    buttonTitle='Add'
                    createNewCategory={handleAddCategory}
                    onClose={() => setModalOpen(false)}
                >
                    <InputField onChange={(e) => setInputValue(e.target.value)} label='Category Name' />
                </ModalComp>
            </div>



            {loading || filteredLoading ? (
                <Loading />
            ) : (
                <FavoritesCard favorites={filteredFavorites || (searchValue ? filteredData : data) || []} />
            )}
        </div>
    );
}