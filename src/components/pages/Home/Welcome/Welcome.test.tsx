import { render, screen } from "@testing-library/react";
import { AppContextProvider } from "../../../../context/AppContext";
import Welcome from "./Welcome";

function renderComponent() {
    render(
        <AppContextProvider>
            <Welcome />
        </AppContextProvider>
    );
}

describe("Welcome", () => {
    test("Should Render a Paragraph with Hello", () => {
        renderComponent();

        const hello = screen.getByText(/hello/i);
        expect(hello).toBeInTheDocument();
        expect(hello).toHaveClass("hello");
    });

    test("Should Render a Headshot Image", () => {
        renderComponent();

        const image = screen.getByRole("img", { name: /headshot/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass("headshot");
    });

    test("Should Render an Element with Name", () => {
        renderComponent();

        const name = screen.getByText(/tivadar debnar/i);
        expect(name).toBeInTheDocument();
    });

    test("Should Render a Title Element", () => {
        renderComponent();

        const title = screen.getByText(/web developer/i);
        expect(title).toBeInTheDocument();
    });

    test("Should Render a List with Seven Items", () => {
        renderComponent();

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass("dev-tools");

        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(7);
    });
});
