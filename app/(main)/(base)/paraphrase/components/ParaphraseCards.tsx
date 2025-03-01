import Card, { IconProps } from "@/components/cards/Card";
import { FastApiAIResponse } from "@/types/aiResponse";

interface ParaphraseCardProps {
    data: FastApiAIResponse;
    icons: IconProps[];
}

export const ParaphraseCards = ({ data, icons }: ParaphraseCardProps) => {
    return (
        <div className='w-full flex flex-col gap-4'>
            {data?.paraphrase.map((sen, index) => (
                <Card text={sen} icons={icons} key={index} />
            ))}
        </div>
    )
}