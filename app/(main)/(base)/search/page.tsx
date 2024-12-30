'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function page() {


  const auth = useSession();
  const currentUser = auth.data?.user;

  const [word , setWord] = useState<string | null>(null);

  return (
    <div className='flex flex-col gap-8 w-full'>
      <header className="top flex flex-col gap-4">
        <h3>Welcome Again , {currentUser?.name}</h3>
        <p>Choose a word to get started!</p>

        <input type="text" className='hero-input' onChange={(e) => setWord(e.target.value)} />
      </header>

      <div className="top-info flex flex-col gap-4">
        <p>* Search Some Words That You Want To İnclude In Any Sentence.</p>
        <p>* Use Filter To See Different Subjects or Sources</p>
      </div>

      <div className="buttons flex items-center gap-4 w-full justify-center">
        <Link href={`/search/${word}`} className="primary-button !py-4 w*48" >
          Generate Sentences
        </Link>

        <button className="secondary-button !py-4 w-48">
          Filter
        </button>
      </div>

      
    </div>
  )
}
