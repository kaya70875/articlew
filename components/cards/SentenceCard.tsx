import { useSentenceCardActions } from '@/hooks/useSentenceCardActions';
import { useCurrentUser, highlighWord, prettyAIResponse, speakSentence } from '@/utils/helpers';
import React, { useState } from 'react'
import { mutate } from 'swr';
import Speaker from '../svg/Speaker';
import useAPIFetch from '@/hooks/useAPIFetch';
import Loading from '../Loading';
import EllipseHeader from '../reusables/EllipseHeader';
import IconAnalyze from '../svg/IconAnalyze';
import IconHearth from '../svg/IconHearth';
import Card from './Card';
import { FastApiAIResponse } from '@/types/aiResponse';
import ApiError from '../errors/ApiError';
import SafeHTML from '../security/SafeHTML';
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
  const user = useCurrentUser();

  const [favorite, setFavorite] = useState(false);

  const sentenceCardIcons = [
    {
      name: 'Sentences',
      icon: (<IconHearth props={{ className: favorite ? 'text-primaryBlue' : '' }} />),
      onClick: () => handleSentenceCardActions('Sentences'),
    },
    {
      name: 'Analyze',
      icon: <IconAnalyze />,
      onClick: () => handleSentenceCardActions('Analyze'),
    },
    {
      name: 'Speaker',
      icon: (<Speaker isSpeaking={false} />),
      onClick: () => handleSentenceCardActions('Speaker'),
    }
  ]

  const highlightedSentence = highlighWord(sentence, word);
  const prettierResponse = prettyAIResponse(data?.response ?? '');

  const handleSentenceCardActions = async (name: name) => {
    if (!user) return;

    if (name === 'Sentences') {
      setFavorite(prev => !prev);
      await handleFavorites(highlightedSentence, user?.id, word, favorite ? 'DELETE' : 'POST');
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
    <Card text={highlightedSentence} icons={sentenceCardIcons} source={source}>
      <section className={`grammar-analysis ${grammarClicked ? 'card-container' : 'h-0 hidden'} transition-all duration-300 ease-in-out`}>
        {error && <ApiError error={error} errorMessage='Error while doing grammar analysis. Please try again later.' />}
        {loading && <Loading />}
        {data?.response && <header className='flex items-center w-full justify-between'>
          <EllipseHeader ellipseColor='bg-red-400' text='Sentence Analysis' />
          <button onClick={() => setGrammarClicked(false)}>x</button>
        </header>}
        <SafeHTML className='text-base' html={prettierResponse} />
      </section>
    </Card>
  )
}
