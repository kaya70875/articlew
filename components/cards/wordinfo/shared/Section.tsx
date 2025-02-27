import React from 'react'
import SynonymCard from './SynonymCard';
import { SectionProps } from './types/section';

export default function Section({ title, items, setWord }: SectionProps) {
    return (
        <div className='flex w-full gap-4 flex-col'>
            {items.slice(0, 6).map((item, index) => (
                <div key={index} className='flex w-full justify-between gap-2 items-center bg-white p-2 xs:p-4 rounded-xl shadow-lg'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p className='text-sm text-gray-600'>{title}</p>
                        <p className='font-medium max-w-3xl px-2 xs:px-4'>{item.definition}</p>

                        {item.examples?.slice(0, 1).map((example, index) => (
                            <p className='text-sm text-gray-600 px-4 xs:px-8' key={index} >{example}</p>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <p className='text-sm text-gray-600'>Synonyms</p>
                        <div className='flex items-center gap-4 flex-wrap sm:flex-nowrap'>
                            {item.synonyms.slice(0, 4).map((synonym, index) => (
                                <SynonymCard synonym={synonym} setWord={setWord} key={index} />
                            ))}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
