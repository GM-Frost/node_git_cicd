import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchComponent from "./SearchComponent";

describe("SearchComponent", () => {
  test("renders correctly", () => {
    const onSearchChange = jest.fn();
    const onSortChange = jest.fn();
    const currentSort = "firstName";

    render(
      <SearchComponent
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        currentSort={currentSort}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    const selectElement = screen.getByRole("combobox");

    expect(searchInput).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
  });

  test("triggers onSearchChange when search input changes", async () => {
    const onSearchChange = jest.fn();
    const onSortChange = jest.fn();
    const currentSort = "firstName";

    render(
      <SearchComponent
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        currentSort={currentSort}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    await userEvent.type(searchInput, "John");

    expect(onSearchChange).toHaveBeenCalledWith("John");
  });

  test("triggers onSortChange when sort selection changes", async () => {
    const onSearchChange = jest.fn();
    const onSortChange = jest.fn();
    const currentSort = "firstName";

    render(
      <SearchComponent
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        currentSort={currentSort}
      />
    );

    const selectElement = screen.getByRole("combobox");
    await userEvent.selectOptions(selectElement, "lastName");
    expect(onSortChange).toHaveBeenCalledWith("lastName");
  });
});
