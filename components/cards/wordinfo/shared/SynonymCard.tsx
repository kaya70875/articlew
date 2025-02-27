import { useRouter } from 'next/navigation';
import React from 'react'

interface SynonymCardProps {
    synonym: string;
    setWord: (word: string) => void;
}

export default function SynonymCard({ synonym, setWord }: SynonymCardProps) {
    const router = useRouter();

    const handleSynonymClick = (synonym: string) => {
        router.push(`/search?word=${synonym}`);
        setWord(synonym);
    };

    return (
        <div className="syn-card p-2 flex items-center justify-center border text-primaryText transition-all duration-100 ease-in border-primaryText hover:bg-primaryText hover:text-whitef rounded-md cursor-pointer" onClick={() => handleSynonymClick(synonym)}>
            <div className='text-sm font-semibold'>{synonym}</div>
        </div>
    )
}
