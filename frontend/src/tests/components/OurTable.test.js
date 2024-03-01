import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OurTable, { ButtonColumn, DateColumn, HrefButtonColumn, PlaintextColumn} from "main/components/OurTable";
import {getContrastYIQ} from "main/components/OurTable";
import { isHexColor } from "main/components/OurTable";

describe("OurTable tests", () => {
    const threeRows = [
        {
            col1: 'Hello',
            col2: 'World',
            createdAt: '2021-04-01T04:00:00.000',
            log: "foo\nbar\n  baz",
        },
        {
            col1: 'react-table',
            col2: 'rocks',
            createdAt: '2022-01-04T14:00:00.000',
            log: "foo\nbar",

        },
        {
            col1: 'whatever',
            col2: 'you want',
            createdAt: '2023-04-01T23:00:00.000',
            log: "bar\n  baz",
        }
    ];
    const clickMeCallback = jest.fn();

    const columns = [
        {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
        },
        {
            Header: 'Column 2',
            accessor: 'col2',
        },
        ButtonColumn("Click", "primary", clickMeCallback, "testId"),
        DateColumn("Date", (cell) => cell.row.original.createdAt),
        PlaintextColumn("Log", (cell) => cell.row.original.log),
        HrefButtonColumn("TestHrefButtonColumn", "primary", "/test", "testId")
    ];

    test("renders an empty table without crashing", () => {
        render(
            <OurTable columns={columns} data={[]} />
        );
    });

    test("TestHrefButtonColumn works as it should", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );
        expect(await screen.findByTestId("testId-cell-row-0-col-TestHrefButtonColumn-button")).toBeInTheDocument();
        const button = screen.getByTestId("testId-cell-row-0-col-TestHrefButtonColumn-button");
        expect(button).toHaveAttribute("href", "/test");
    });


    test("Button with predefined variant appears in the table and is clickable", async () => {
        render(<OurTable columns={[ButtonColumn("Click", "primary", clickMeCallback, "testId")]} data={threeRows} />);
      
        const button = await screen.findByTestId("testId-cell-row-0-col-Click-button");
        expect(button).toBeInTheDocument();      
        fireEvent.click(button);
        await waitFor(() => expect(clickMeCallback).toBeCalledTimes(1));
      });    

    test("Button with hex color code appears with correct style and is clickable", async () => {
        render(<OurTable columns={[ButtonColumn("Click", "#4CAF50", clickMeCallback, "testId")]} data={threeRows} />);
      
        const button = await screen.findByTestId("testId-cell-row-0-col-Click-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle(`background-color: #4CAF50`);
        expect(button).toHaveStyle(`color: ${getContrastYIQ("#4CAF50")}`);
        fireEvent.click(button);
        await waitFor(() => expect(clickMeCallback).toBeCalledTimes(1));
      });    

    test("The button appears in the table", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );

        expect(await screen.findByTestId("testId-cell-row-0-col-Click-button")).toBeInTheDocument();
        const button = screen.getByTestId("testId-cell-row-0-col-Click-button");
        fireEvent.click(button);
        await waitFor(() => expect(clickMeCallback).toBeCalledTimes(1));
    });

    test("default testid is testId", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );
        expect(await screen.findByTestId("testid-header-col1")).toBeInTheDocument();
    });

    test("getContrastYIQ returns 'black' for light background colors", () => {
        const lightColorHex = "#FFFFFF"; 
        const textColor = getContrastYIQ(lightColorHex);
        expect(textColor).toBe('black');
    });

    test("getContrastYIQ returns 'white' for dark background colors", () => {
        const darkColorHex = "#000000"; 
        const textColor = getContrastYIQ(darkColorHex);
        expect(textColor).toBe('white');
    });
      
    test("click on a header and a sort caret should appear", async () => {
        render(
            <OurTable columns={columns} data={threeRows} testid={"sampleTestId"} />
        );

        expect(await screen.findByTestId("sampleTestId-header-col1")).toBeInTheDocument();
        const col1Header = screen.getByTestId("sampleTestId-header-col1");

        const col1SortCarets = screen.getByTestId("sampleTestId-header-col1-sort-carets");
        expect(col1SortCarets).toHaveTextContent('');

        const col1Row0 = screen.getByTestId("sampleTestId-cell-row-0-col-col1");
        expect(col1Row0).toHaveTextContent("Hello");

        fireEvent.click(col1Header);
        expect(await screen.findByText("🔼")).toBeInTheDocument();

        fireEvent.click(col1Header);
        expect(await screen.findByText("🔽")).toBeInTheDocument();
    });
});

test("Hex color code correctly identified at start, middle, and end of string", () => {
    expect(isHexColor("#ABC")).toBe(true);
    expect(isHexColor("Text #ABC Text")).toBe(false);
    expect(isHexColor("#ABCDEF")).toBe(true);
    expect(isHexColor("Text #ABCDEF")).toBe(false);
  });  

test("getContrastYIQ returns 'black' for color with YIQ exactly at boundary", () => {
    const boundaryColorHex = "#4CAF50"; 
    expect(getContrastYIQ(boundaryColorHex)).toBe('black');
  });

