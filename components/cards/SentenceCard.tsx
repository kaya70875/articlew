import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { getCurrentUser, getSourceName, highlighWord, runSpeaker, speakSentence } from '@/utils/helpers';
import React, { useState } from 'react'
import { mutate } from 'swr';
import Speaker from '../svg/Speaker';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import Loading from '../Loading';
import EllipseHeader from '../reusables/EllipseHeader';

interface SentenceCardProps {
  sentence: string;
  word: string;
  source: string;
}

type name = 'Sentences' | 'Analyze' | 'Speaker';

export default function SentenceCard({ sentence, word, source }: SentenceCardProps) {

  const [grammarClicked, setGrammarClicked] = useState(false);
  const { data, loading, error } = useAPIFetch<FastApiAIResponse>(grammarClicked ? `/analysis/${encodeURIComponent(sentence)}/${word}` : null);

  const { handleFavorites } = useSentenceCardActions();
  const user = getCurrentUser();

  const [favorite, setFavorite] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sentenceCardIcons = [
    {
      name: 'Sentences',
      icon: (<svg width="23" height="22" viewBox="0 0 23 22" fill={favorite ? 'text-primary-blue' : 'none'} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2913 3.50813C19.7805 2.99713 19.1741 2.59177 18.5066 2.31521C17.8392 2.03865 17.1238 1.8963 16.4013 1.8963C15.6788 1.8963 14.9634 2.03865 14.2959 2.31521C13.6285 2.59177 13.022 2.99713 12.5113 3.50813L11.4513 4.56813L10.3913 3.50813C9.3596 2.47643 7.96032 1.89684 6.50129 1.89684C5.04226 1.89684 3.64298 2.47643 2.61129 3.50813C1.5796 4.53982 1 5.93909 1 7.39813C1 8.85716 1.5796 10.2564 2.61129 11.2881L3.67129 12.3481L11.4513 20.1281L19.2313 12.3481L20.2913 11.2881C20.8023 10.7774 21.2076 10.1709 21.4842 9.50348C21.7608 8.83602 21.9031 8.12061 21.9031 7.39813C21.9031 6.67564 21.7608 5.96023 21.4842 5.29277C21.2076 4.62531 20.8023 4.01888 20.2913 3.50813Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
    {
      name: 'Analyze',
      icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.13 1L6 16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 6.13L16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      )
    },
    {
      name: 'Speaker',
      icon: (<Speaker isSpeaking={isSpeaking} />)
    }
  ]

  const handleSourceClick = () => {
    if (typeof window !== 'undefined') {
      window.open(source, '_blank');
    }
  }

  const highlightedSentence = highlighWord(sentence, word);

  const handleSentenceCardActions = async (name: name) => {
    if (name === 'Sentences') {
      setFavorite(prev => !prev);
      await handleFavorites(highlightedSentence, user?.id!, word, favorite ? 'DELETE' : 'POST');
      mutate('/api/words/getFavorites');
    }

    else if (name === 'Speaker') {
      speakSentence(sentence);
    }

    else if (name === 'Analyze') {
      setGrammarClicked(true);
    }
  }

  return (
    <div className='flex flex-col gap-8 justify-between p-6 bg-white rounded-md shadow-md'>
      <p className='text-lg' dangerouslySetInnerHTML={{ __html: highlightedSentence }} />
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-4'>
          {sentenceCardIcons.map((icon, index) => (
            <div key={index} onClick={() => handleSentenceCardActions(icon.name as name)} className={`icon cursor-pointer ${favorite && icon.name === 'Sentences' ? 'fill-primaryBlue text-primaryBlue' : 'text-primaryText'}`}>{icon.icon}</div>
          ))}
        </div>
        <p className='text-base text-primaryBlue hover:underline text-right cursor-pointer capitalize' onClick={handleSourceClick}>{getSourceName(source)}</p>
      </div>
      <section className={`grammar-analysis ${grammarClicked ? 'bg-lightBlue rounded-md p-4 flex flex-col gap-4 opacity-100' : 'h-0 opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
        {loading && <Loading />}
        {data?.response && <header className='flex items-center w-full justify-between'>
          <EllipseHeader ellipseColor='bg-red-400' text='Sentence Analysis' />
          <button onClick={() => setGrammarClicked(false)}>x</button>
        </header>}
        <p className='text-base'>{data?.response}</p>
      </section>
    </div>
  )
}
