import React from 'react'

interface SentenceCardProps {
    sentence : string;
}

export default function SentenceCard({sentence} : SentenceCardProps) {
  return (
    <div className='flex flex-col gap-4 p-4'>
        {sentence}
    </div>
  )
}
