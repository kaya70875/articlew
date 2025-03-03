import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SentenceCard from "../SentenceCard";
import { highlighWord } from "@/utils/helpers";
import { mutate } from "swr";

const mockHandleFavorites = jest.fn();

jest.mock('next-auth/react', () => {
    return {
        useSession: jest.fn(() => ({
            data: {
                user: {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@doe.com',
                    image: 'https://via.placeholder.com/150'
                }
            }
        })),
    }
})

jest.mock('../../../hooks/useSentenceCardActions', () => {
    return {
        useSentenceCardActions: () => ({
            handleFavorites: mockHandleFavorites
        })
    }
})

jest.mock('swr', () => ({
    __esModule: true,
    default: () => ({
        data: null,
        error: null,
        isValidating: false
    }),
    mutate: jest.fn()
}));

describe('SentenceCard', () => {
    it('should render', () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        expect(screen.getByText('Hello, !')).toBeInTheDocument();
    })

    it('should render the word', () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        expect(screen.getByText('world')).toBeInTheDocument();
    })

    it('should render the source', () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        expect(screen.getByText('google')).toBeInTheDocument();
    })

    it('should highlight the word', () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        expect(screen.getByText('world')).toHaveClass('font-bold underline text-primaryBlue');
    })

    it('should render the grammar analysis window when the button is clicked', () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        const analyzeButton = screen.getByText('Analyze sentence');
        fireEvent.click(analyzeButton);

        const grammarAnalysis = document.querySelector('.grammar-analysis');
        expect(grammarAnalysis).toHaveClass('card-container');
    })

    //Actions
    it('should run handleFavorites with correct parameters when the favorite button is clicked', async () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />)
        const favoriteButton = screen.getByText('Add to favorites');
        fireEvent.click(favoriteButton);

        const highlightedSentence = highlighWord('Hello, world!', 'world');

        await waitFor(() => {
            expect(mockHandleFavorites).toHaveBeenCalledWith(highlightedSentence, '1', 'world', 'POST');
        })
    })

    it('should run mutate function when the favorite button is clicked', async () => {
        render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />);
        const favoriteButton = screen.getByText('Add to favorites');
        if (favoriteButton) {
            fireEvent.click(favoriteButton);
        }

        await waitFor(() => {
            expect(mutate).toHaveBeenCalledTimes(1);
            expect(mutate).toHaveBeenCalledWith('/api/words/getFavorites');
        })
    })

    describe('Style', () => {
        it('should render the correct style when the word is in the favorites', () => {
            render(<SentenceCard sentence='Hello, world!' word='world' source='https://www.google.com' />);
            const favoriteButton = screen.getByText('Add to favorites');
            fireEvent.click(favoriteButton);

            const favoriteButtonIcon = screen.getByTestId('favorite-button-icon');
            expect(favoriteButtonIcon).toHaveClass('text-primaryBlue');
        })
    })

    // Need more tests
})