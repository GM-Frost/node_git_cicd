import { screen, render, waitFor } from "@testing-library/react";
import AddPage from "./AddPage";
import { MemoryRouter } from "react-router-dom";
import { initialReservation } from "./AddPage.types";
import { default as axios } from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

describe("AddPage", () => {
  //Check if the "Add Reservation" Header is present
  test("should render the AddPage component", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );
    const addReservationHeader = screen.getByText("Add Reservation");
    expect(addReservationHeader).toBeInTheDocument();
  });

  test("should handle input change", async () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const arrivalDate = "";
    const departureDate = "";
    const selectedRoomSize = "standard-room";
    const roomQuantity = 1;
    const firstName = "";
    const lastName = "";
    const email = "";
    const phoneNumber = "";
    const streetName = "";
    const streetNumber = "";
    const zipCode = "";
    const state = "";
    const city = "";
    const personalNote = "";

    userEvent.type(screen.getByTestId("arrivalDateInput"), arrivalDate);
    userEvent.type(screen.getByTestId("departureDateInput"), departureDate);
    userEvent.selectOptions(
      screen.getByTestId("roomSizeSelect"),
      selectedRoomSize
    );
    userEvent.type(
      screen.getByTestId("roomQuantityInput"),
      roomQuantity.toString()
    );
    userEvent.type(screen.getByLabelText("First Name"), firstName);
    userEvent.type(screen.getByLabelText("Last Name"), lastName);
    userEvent.type(screen.getByRole("textbox", { name: "Email" }), email);
    userEvent.type(
      screen.getByRole("textbox", { name: "Phone Number" }),
      phoneNumber
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Street Name" }),
      streetName
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Street Number" }),
      streetNumber
    );
    userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), zipCode);
    userEvent.type(screen.getByRole("textbox", { name: "State" }), state);
    userEvent.type(screen.getByRole("textbox", { name: "City" }), city);
    userEvent.type(screen.getByLabelText("Personal Note"), personalNote);

    await waitFor(() => {
      expect(screen.getByTestId("arrivalDateInput")).toHaveValue(arrivalDate);
    });
    await waitFor(() => {
      expect(screen.getByTestId("departureDateInput")).toHaveValue(
        departureDate
      );
    });

    expect(screen.getByTestId("roomSizeSelect")).toHaveValue(selectedRoomSize);
    expect(screen.getByTestId("roomQuantityInput")).toHaveValue(roomQuantity);
    expect(screen.getByTestId("firstNameInput")).toHaveValue(firstName);
    expect(screen.getByTestId("lastNameInput")).toHaveValue(lastName);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue(email);
    expect(screen.getByRole("textbox", { name: "Phone Number" })).toHaveValue(
      phoneNumber
    );
    expect(screen.getByRole("textbox", { name: "Street Name" })).toHaveValue(
      streetName
    );
    expect(screen.getByRole("textbox", { name: "Street Number" })).toHaveValue(
      streetNumber
    );
    expect(screen.getByRole("textbox", { name: "Zip Code" })).toHaveValue(
      zipCode
    );
    expect(screen.getByRole("textbox", { name: "State" })).toHaveValue(state);
    expect(screen.getByRole("textbox", { name: "City" })).toHaveValue(city);
    expect(screen.getByLabelText("Personal Note")).toHaveValue(personalNote);
  });

  test('Selecting multiple options in "Extras" dropdown', () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const selectedExtras = ["extraBreakfast"];
    const extrasSelect = screen.getByLabelText("Extras");
    userEvent.selectOptions(extrasSelect, selectedExtras);
    expect(extrasSelect).toHaveValue(selectedExtras);
  });

  test("Selecting a payment method", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const paymentMethods = [
      { label: "Credit Card", value: "Credit Card" },
      { label: "Paypal", value: "Paypal" },
      { label: "Cash", value: "Cash" },
      { label: "Bitcoin", value: "Bitcoin" },
    ];

    paymentMethods.forEach((method) => {
      const radioButton = screen.getByLabelText(method.label);
      expect(radioButton).not.toBeChecked();
      userEvent.click(radioButton);
    });
  });

  test("should handle tag input and add tags", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const tagInput = screen.getByTestId("tagsInput");

    expect(tagInput).toHaveValue("");

    // Check if the initial tags are displayed
    const initialTags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(initialTags).toHaveLength(2); // Initial tags

    userEvent.type(tagInput, "newTag{enter}");

    // Check that the new tag is added
    const tags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(tags).toHaveLength(2); // Initial tags

    userEvent.clear(tagInput);

    // Check that the first tag is removed
    const remainingTags = screen.queryAllByTestId((id) =>
      id.startsWith("tag-")
    );
    expect(remainingTags).toHaveLength(2);
  });

  test("should handle 'Send me a reminder' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const sendReminderCheckbox = screen.getByText("Send me a reminder");

    expect(sendReminderCheckbox).toBeInTheDocument();
    expect(sendReminderCheckbox).not.toBeChecked();
    userEvent.click(sendReminderCheckbox);
  });

  test("should handle 'Subscribe to newsletter' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const newsletterCheckbox = screen.getByText("Subscribe to newsletter");

    expect(newsletterCheckbox).toBeInTheDocument();
    expect(newsletterCheckbox).not.toBeChecked();

    userEvent.click(newsletterCheckbox);
  });

  test("should handle 'I confirm the information given above' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const confirmCheckbox = screen.getByText(
      "I confirm the information given above"
    );

    expect(confirmCheckbox).toBeInTheDocument();
    expect(confirmCheckbox).not.toBeChecked();
    userEvent.click(confirmCheckbox);
  });

  test("should handle form submission", async () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

 // Mock axios post
 const mockResponse = { data: "mock response" };
 (axios.post as jest.Mock).mockResolvedValue(mockResponse);
 screen.getByRole("button", { name: "Submit" });
 screen.getByTestId("reservation-form");
 userEvent.click(screen.getByTestId("submit-button"));

 (axios.post as jest.Mock).mockResolvedValue({ data: "Some response data" });
 const inputElements = screen.getAllByRole("textbox");
 inputElements.forEach((input) => {
   expect(input).toHaveValue("");
 });
  });
});
