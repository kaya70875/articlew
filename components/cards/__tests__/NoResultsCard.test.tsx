import { screen, render } from '@testing-library/react';
import "@testing-library/jest-dom";
import NoResultsCard from '../NoResultsCard';

describe('NoResultsCard', () => {
    it('should render', () => {
        render(<NoResultsCard />);
        expect(screen.getByText('No Results.')).toBeInTheDocument();
        expect(screen.getByText('We are still trying to expand our database. So you can try again later.')).toBeInTheDocument();
    });

    it('should render the image', () => {
        render(<NoResultsCard />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    })
});
