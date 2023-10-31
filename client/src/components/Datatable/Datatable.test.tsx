import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Datatable from "./Datatable";
import axios from "axios";
import MockAdapter from "axios-mock-adapter"; // Import axios-mock-adapter
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
// Sample data for testing
const mockData = [
  {
    stay: {
      arrivalDate: "2023-10-01",
      departureDate: "2023-10-05",
    },
    room: {
      roomSize: "Standard",
      roomQuantity: 2,
    },
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    addressStreet: {
      streetName: "Main St",
      streetNumber: "123",
    },
    addressLocation: {
      zipCode: "12345",
      state: "CA",
      city: "Los Angeles",
    },
    extras: ["Wi-Fi", "Parking"],
    payment: "Credit Card",
    note: "Special request",
    tags: ["Tag1", "Tag2"],
    reminder: true,
    newsletter: false,
    confirm: true,
    id: "1",
  },
  {
    stay: {
      arrivalDate: "2023-11-01",
      departureDate: "2023-11-05",
    },
    room: {
      roomSize: "Deluxe",
      roomQuantity: 1,
    },
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    addressStreet: {
      streetName: "Oak Ave",
      streetNumber: "456",
    },
    addressLocation: {
      zipCode: "54321",
      state: "NY",
      city: "New York",
    },
    extras: ["Breakfast"],
    payment: "PayPal",
    note: "No specific requests",
    tags: ["Tag3", "Tag4"],
    reminder: false,
    newsletter: true,
    confirm: false,
    id: "2",
  },
];

// Create an instance of the MockAdapter
const mock = new MockAdapter(axios);

describe("Datatable component", () => {
  beforeAll(() => {
    // Mock the Axios GET request
    mock.onGet("/reservations").reply(200, mockData);
  });

  afterAll(() => {
    // Restore the original Axios behavior
    mock.restore();
  });

  test("renders data fetched from the API", async () => {
    render(
      <BrowserRouter>
        <Datatable search="" sort="firstName" />
      </BrowserRouter>
    );

    // Wait for the API call and data to be loaded
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Deluxe (QTY: 1)")).toBeInTheDocument();
    });
  });
  const clickEditButton = async () => {
    const editButtons = screen.getAllByRole("button", {
      name: /Edit/i,
    });
    userEvent.click(editButtons[0]);
  };

  const clickDeleteButton = async () => {
    const deleteButton = screen.getAllByRole("button", {
      name: /Delete/i,
    });
    userEvent.click(deleteButton[0]);
  };

  test("clicks the Edit button", async () => {
    render(
      <BrowserRouter>
        <Datatable search="" sort="firstName" />
      </BrowserRouter>
    );
    await waitFor(clickEditButton);
  });

  test("clicks the Delete button", async () => {
    render(
      <BrowserRouter>
        <Datatable search="" sort="firstName" />
      </BrowserRouter>
    );
    await waitFor(clickDeleteButton);
  });
});
