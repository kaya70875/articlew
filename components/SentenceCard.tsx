import React from 'react'

interface SentenceCardProps {
    sentence : string;
    word : string;
}

export default function SentenceCard({sentence , word} : SentenceCardProps) {

  const highlightedSentence = sentence.replace(
    new RegExp(`(${word})`, 'gi'),
    (match) => `<span class="font-bold underline">${match}</span>`
  )

  return (
    <div className='flex flex-col gap-4 p-8 bg-white'>
        <p className='text-lg' dangerouslySetInnerHTML={{__html : highlightedSentence}}></p>
        <p>Icons</p>
        <p>Github</p>
    </div>
  )
}
