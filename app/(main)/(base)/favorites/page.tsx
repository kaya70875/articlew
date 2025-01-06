'use client';

import FavoritesCard from '@/components/FavoritesCard';
import InputField from '@/components/inputs/InputField';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';
import { FavoriteSentences, Sentence } from '@/types/sentence';
import React from 'react'

export default function page() {

    const { data, loading, error } = useFetch<FavoriteSentences[]>('/api/words/getFavorites');
    console.log('data' , data);

    return (
        <div className='flex flex-col w-full gap-8 p-4'>
            <header className='w-full'>
                <h2>Your Favorites</h2>
                <InputField placeholder='Search in favorites' label='' />
            </header>
            <FavoritesCard favorites={data || []} />
        </div>

    )
}
