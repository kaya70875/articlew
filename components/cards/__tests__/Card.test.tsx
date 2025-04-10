import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../Card";

const DummySvg = (props: React.PropsWithChildren) => (
  <svg width="100" height="100" viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="40" fill="red" />
  </svg>
);

// Mock the SafeHTML component
jest.mock("../../security/SafeHTML", () => {
  return function MockSafeHTML({ html, className }: { html: string, className: string }) {
    return <div className={className}>{html}</div>;
  };
});

describe("Card", () => {
  it("should render text prop correctly", () => {
    render(<Card text="Hello, world!" />);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("should render children prop correctly", () => {
    render(
      <Card>
        <p>Hello, world!</p>
      </Card>
    );
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("should render icons prop correctly", () => {
    render(
      <Card icons={[{ icon: <DummySvg data-testid="arrow-back-icon" /> }]} />
    );
    expect(screen.getByTestId("arrow-back-icon")).toBeInTheDocument();
  });

  it("should call onClick when icon is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <Card
        text="Test text"
        icons={[
          {
            icon: <DummySvg data-testid="arrow-back-icon" />,
            onClick: mockOnClick,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByTestId("arrow-back-icon").parentElement as HTMLElement);
    expect(mockOnClick).toHaveBeenCalledWith("Test text");
  });

  it("should apply custom borderRadius and gap", () => {
    render(<Card text="Custom styling" borderRadius="1rem" gap="2rem" />);

    // Since we're using emotion css, we need to check the rendered HTML
    const card = screen.getByText("Custom styling").parentElement;
    expect(card).toHaveStyle("border-radius: 1rem");
    expect(card).toHaveStyle("gap: 2rem");
  });

  it("should handle multiple icons", () => {
    const mockOnClick1 = jest.fn();
    const mockOnClick2 = jest.fn();

    render(
      <Card
        text="Multiple icons"
        icons={[
          { icon: <DummySvg data-testid="icon1" />, onClick: mockOnClick1 },
          { icon: <DummySvg data-testid="icon2" />, onClick: mockOnClick2 },
        ]}
      />
    );

    expect(screen.getByTestId("icon1")).toBeInTheDocument();
    expect(screen.getByTestId("icon2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("icon1").parentElement as HTMLElement);
    expect(mockOnClick1).toHaveBeenCalledWith("Multiple icons");
    expect(mockOnClick2).not.toHaveBeenCalled();
  });

  // Test that the source is rendered correctly
  it("should render source correctly", () => {
    render(
      <Card
        source="https://www.google.com"
        icons={[{ icon: <DummySvg data-testid="icon" /> }]}
      />
    );
    expect(screen.getByText("google")).toBeInTheDocument();
  });

  it("should open source URL in new tab when source is clicked", () => {
    const mockOpen = jest.fn();

    window.open = mockOpen;

    render(
      <Card
        source="https://www.google.com"
        icons={[{ icon: <DummySvg data-testid="icon" /> }]}
      />
    );

    fireEvent.click(screen.getByText("google"));

    expect(mockOpen).toHaveBeenCalledWith(
      "https://www.google.com",
      "_blank",
      "noopener,noreferrer"
    );
  });
});
