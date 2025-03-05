import { act, fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "../Dropdown";
import "@testing-library/jest-dom";

describe('Dropdown', () => {
    it('should render the dropdown', () => {
        render(<Dropdown>
            <div>Test</div>
        </Dropdown>)

        expect(screen.getByText('Dropdown')).toBeInTheDocument();
    })

    it('should render the dropdown children', () => {
        render(<Dropdown>
            <div>Children</div>
        </Dropdown>)

        expect(screen.getByText('Children')).toBeInTheDocument();
    })

    it('should render the dropdown title', () => {
        render(<Dropdown dropdownTitle={'Test'}>
            <div>Children</div>
        </Dropdown>)

        expect(screen.getByText('Test')).toBeInTheDocument();
    })

    it('should render the dropdown menu when button is clicked', () => {
        render(<Dropdown>
            <div>Test</div>
        </Dropdown>)

        const dropdownButton = screen.getByTestId('dropdown-button')
        const dropdownMenu = screen.getByTestId('dropdown-menu')

        // Check if the menu is not visible initially
        expect(dropdownMenu).toHaveStyle('display: none');

        // Click the button to open the menu
        fireEvent.click(dropdownButton);
        expect(dropdownMenu).toHaveStyle('display: block');
    })

    describe('Functionality', () => {
        it('should close the menu when user clicks outside', () => {
            render(<Dropdown>
                <div>Test</div>
            </Dropdown>)

            const dropdownButton = screen.getByTestId('dropdown-button')
            const dropdownMenu = screen.getByTestId('dropdown-menu');

            fireEvent.click(dropdownButton)
            expect(dropdownMenu).toHaveStyle('display: block');

            fireEvent.mouseDown(document.body);
            expect(dropdownMenu).toHaveStyle('display: none');

        })

        it('should close the menu when user clicks on a dropdown link', async () => {
            jest.useFakeTimers();

            render(<Dropdown>
                <header>
                    <p data-testid='dropdown-link' data-dropdown-clickable="true">Click on Me</p>
                </header>
            </Dropdown>)

            const dropdownButton = screen.getByTestId('dropdown-button');
            const dropdownMenu = screen.getByTestId('dropdown-menu');

            // Open the menu
            fireEvent.click(dropdownButton)
            expect(dropdownMenu).toHaveStyle('display: block');

            // Click on the dropdown link
            const dropdownLink = screen.getByTestId('dropdown-link');
            fireEvent.mouseDown(dropdownLink);

            // Wait for any state updates to complete
            await act(async () => {
                jest.advanceTimersByTime(100);
            });

            expect(dropdownMenu).toHaveStyle('display: none');

            jest.useRealTimers();
        })
    })
})
