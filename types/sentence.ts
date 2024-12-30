import { User } from "next-auth";

export type Sentence = {
    id: string;
    content: string;
    source: string;
    category: string;
    length : number;
    date : string;
    userId: string;
    user: User;
}