import React from 'react'
import { SectionProps } from './types/section';
import Section from './Section';

interface Speechs {
    name: string;
    data: { definition: string; synonyms: string[]; examples: string[]; }[];
}

interface RenderSpeechsProps extends SectionProps {
    collapsedHeight: number;
    speechs: Speechs[];
}

export default function RenderSpeechs({ title, items, collapsedHeight, speechs, setWord }: RenderSpeechsProps) {
    const isData = items.length > 0;
    const isCollapsed = collapsedHeight > 0;
    const restOfData = speechs.filter(speech => speech.name !== title);

    return (
        isData ? (
            <>
                {/*First render relevant data then check if collapsed height is calculated if it is render the rest of the data*/}
                <Section title={title} items={items} setWord={setWord} />
                {isCollapsed && restOfData.map((speech, index) => (
                    speech.data.length > 0 && <Section title={speech.name} items={speech.data} setWord={setWord} key={index} />
                ))}
            </>
        ) : (
            restOfData.map((speech, index) => (
                speech.data.length > 0 && <Section title={speech.name} items={speech.data} setWord={setWord} key={index} />
            ))
        )
    )
    {/* If relevant data is empty, then do not look for if collapsed height is calculated or not just render all data */ }
}
