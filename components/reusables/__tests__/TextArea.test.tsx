import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "../TextArea";

const textAreaRef = {
    current: null
}

describe("TextArea", () => {
    it("should render", () => {
        render(<TextArea textAreaRef={textAreaRef} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render children", () => {
        render(<TextArea textAreaRef={textAreaRef}>
            <p>Test</p>
        </TextArea>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render defaultValue", () => {
        render(<TextArea textAreaRef={textAreaRef} defaultValue="Test" />);

        expect(screen.getByRole("textbox")).toHaveValue("Test");
    });
});