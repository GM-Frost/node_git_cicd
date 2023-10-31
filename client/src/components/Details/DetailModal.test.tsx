import { render, screen, waitFor } from "@testing-library/react";
import DetailModal from "./DetailModal"; // Import your component
import axios from "axios";

// Mock the axios module to simulate API calls
jest.mock("axios");

describe("DetailModal Component", () => {
  // Define a sample data object to simulate the API response
  const mockResponse = {
    stay: {
      arrivalDate: "2023-11-01",
      departureDate: "2023-11-07",
    },
    room: {
      roomSize: "Deluxe Suite",
      roomQuantity: 2,
    },
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    addressStreet: {
      streetName: "123 Main Street",
      streetNumber: "Apt 4B",
    },
    addressLocation: {
      zipCode: "12345",
      state: "California",
      city: "Los Angeles",
    },
    extras: ["Wi-Fi", "Minibar", "Breakfast"],
    payment: "Credit Card",
    note: "Special request for a room with a view",
    tags: ["Business", "VIP"],
    reminder: true,
    newsletter: false,
    confirm: true,
    id: "",
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });
  });
  test("renders the form", async () => {
    const detailId = "";

    render(
      <DetailModal isOpen={true} onClose={() => {}} detailId={detailId} />
    );

    await waitFor(() => {
      expect(screen.getByText("Reservations Details")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Date of Arrival")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Date of Departure")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Room Size")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Room Quantity")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("First Name")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Last Name")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Email")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Phone number")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Street Name")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Street Number")).toBeInTheDocument();
    });

    // Test ZIP
    await waitFor(() => {
      expect(screen.getByText("ZIP")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("State")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("City")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Extras")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Credit Card")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Cash")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Paypal")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Personal Note")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Tags")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Send me a reminder")).toBeInTheDocument();
    });
  });
  test("renders the form with fetched data", async () => {
    const detailId = "";

    render(
      <DetailModal isOpen={true} onClose={() => {}} detailId={detailId} />
    );
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.stay.arrivalDate)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.stay.departureDate)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.room.roomSize)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.room.roomQuantity)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.firstName)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.lastName)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.email)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.phone)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressStreet.streetName)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressStreet.streetNumber)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressStreet.streetNumber)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressLocation.zipCode)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressLocation.state)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.addressLocation.city)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.payment)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockResponse.note)).toBeInTheDocument();
    });
  });
});
