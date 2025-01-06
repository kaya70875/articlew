import { FavoriteSentences } from '@/types/sentence'
import React from 'react'
import Image from 'next/image';
import deleteIcon from '@/public/images/delete.svg';
import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { getCurrentUser } from '@/utils/helpers';
import { mutate } from 'swr';

interface FavoriteCardProps {
    favorites: FavoriteSentences[];
}

export default function FavoritesCard({ favorites }: FavoriteCardProps) {
    const user = getCurrentUser();
    const {handleFavorites} = useSentenceCardActions();

    const handleDelete = async (sentence : string) => {
        await handleFavorites(sentence , user?.id!, 'DELETE');
        mutate('/api/words/getFavorites');
    }

    return (
        favorites?.map((sentence, index) => (
            <div className='flex flex-col gap-8 p-8 bg-lightBlue w-full rounded-md'>
                <div className='flex w-full items-center justify-between gap-4'>
                    <p key={index} dangerouslySetInnerHTML={{ __html: sentence.sentence }}></p>
                    <Image src={deleteIcon} onClick={() => handleDelete(sentence.sentence)} className='cursor-pointer' alt='delete-icon' width={20} height={20} />
                </div>
            </div>
        ))

    )
}
