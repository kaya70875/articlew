export type FastApiResponse = {
    categories : string[] | null;
    max_length : number;
    min_lenght : number;
    order : 'asc' | 'desc';
    sentences : Sentence[];
    sort_by : string;
    word : string;
}

export type Sentence = {
    _id : string;
    text: string;
    source: string;
    category: string;
    length : number;
    date : string;
}