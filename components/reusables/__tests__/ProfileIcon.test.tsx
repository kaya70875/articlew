import "@testing-library/jest-dom";
import ProfileIcon from "../ProfileIcon";
import { render, screen } from "@testing-library/react";
import * as helpers from "../../../utils/helpers";

// Mock the helpers module
jest.mock("../../../utils/helpers");
const mockedHelpers = helpers as jest.Mocked<typeof helpers>;

describe("ProfileIcon", () => {
    it("should render correctly", () => {
        mockedHelpers.useCurrentUser.mockReturnValue({ name: "John", id: "1", lastname: "Doe" });
        render(<ProfileIcon />);

        expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should display first character of user's name", () => {
        mockedHelpers.useCurrentUser.mockReturnValue({ name: "Alice", id: "2", lastname: "Smith" });
        render(<ProfileIcon />);

        expect(screen.getByText("A")).toBeInTheDocument();
    });
});
