import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { IReservation, initialReservation } from "./AddPage.types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddPage = (props: IReservation) => {
  const [formData, setFormData] = useState<IReservation>(initialReservation);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  //Validation
  const [emptyError, setEmptyError] = useState<boolean>(false);
  const [selectError, setSelectError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  //Local Storage for Tags
  const [tag, setTag] = useState<string[]>(["hotel", "booking"]);
  const [newTag, setNewTag] = useState<string>("");

  //TAGS

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      if (newTag.trim() !== "") {
        setTag([...tag, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const removeTags = (tagToRemove: number) => {
    const updatedTags = tag.filter((_, i) => i !== tagToRemove);
    setTag(updatedTags);
  };

  //Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("stay.")) {
      setFormData({
        ...formData,
        stay: {
          ...formData.stay,
          [name.substring("stay.".length)]: value,
        },
      });
    } else if (name.startsWith("room.size")) {
      setFormData({
        ...formData,
        room: {
          ...formData.room,
          [name.substring("room.".length)]: value,
        },
      });
    } else if (name.startsWith("room.roomQuantity")) {
      const quantity = parseInt(value, 10);
      if (!isNaN(quantity) && quantity >= 1 && quantity <= 5) {
        setFormData({
          ...formData,
          room: {
            ...formData.room,
            roomQuantity: quantity,
          },
        });
      }
    } else if (name.startsWith("addressStreet.")) {
      setFormData({
        ...formData,
        addressStreet: {
          ...formData.addressStreet,
          [name.substring("addressStreet.".length)]: value,
        },
      });
    } else if (name.startsWith("addressLocation.")) {
      setFormData({
        ...formData,
        addressLocation: {
          ...formData.addressLocation,
          [name.substring("addressLocation.".length)]: value,
        },
      });
    } else if (name === "tags") {
      setNewTag(value);
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("room.")) {
      setFormData({
        ...formData,
        room: {
          ...formData.room,
          [name.substring("room.".length)]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.stay.arrivalDate === "" ||
      formData.stay.departureDate === "" ||
      formData.room.roomSize === undefined ||
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.addressStreet.streetName === "" ||
      formData.addressStreet.streetNumber === "" ||
      formData.addressLocation.zipCode === "" ||
      formData.addressLocation.state === "" ||
      formData.addressLocation.city === "" ||
      formData.note === ""
    ) {
      setEmptyError(true);
      setErrorMessage("Please Input all fields");
      toast.error("Please Input all fields");
    } else if (!formData.payment) {
      setSelectError(true);
      setErrorMessage("Please Select a Payment Method");
      toast.error("Please select a payment method");
      return;
    } else if (!formData.confirm) {
      setSelectError(true);
      setErrorMessage("Please Confirm this information is true and valid");
      toast.error("Please Confirm the information");
      return;
    } else {
      try {
        const response = await axios.post("/reservations", {
          ...formData,
          tags: tag,
        });
        console.log("Reservation created:", response.data);
        toast.success("Reservation Created!");
        setFormData(initialReservation);
        setErrorMessage("");
        setEmptyError(false);
        setSelectError(false);
        setTag(["hotel", "booking"]);
      } catch (error) {
        console.error("Error creating reservation:", error);
        toast.error("Error creating reservation");
      }
    }
  };

  const availableExtras = [
    "extraBreakfast",
    "extraTV",
    "extraWiFi",
    "extraParking",
    "extraBalcony",
  ];
  const handleExtraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedOptions = [];

    for (const option of options) {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    setSelectedExtras(selectedOptions);
    setFormData({
      ...formData,
      extras: selectedOptions,
    });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex justify-center items-center  min-h-screen">
          <div className="bg-white p-8 rounded-md shadow-lg w-[80%]">
            <div className="bg-gray-800 p-5 rounded-none text-white">
              <Link
                to={"/"}
                className="flex cursor-pointer hover:text-red-400 justify-start text-gray-800 items-center text-center gap-2"
              >
                <AiOutlineArrowLeft className="bg-gray-100 rounded-full  " />
                <span className="text-gray-100 hover:text-red-400">
                  Go Back
                </span>
              </Link>
              <h2 className="flex flex-wrap justify-center text-2xl font-bold mb-4">
                Add Reservation
              </h2>
            </div>
            <hr />
            <div className="flex flex-wrap justify-center items-center">
              {(emptyError || selectError) && (
                <p className="text-red-600 ">{errorMessage}</p>
              )}
            </div>
            <form
              data-testid="reservation-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-4"
            >
              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="arrivalDate"
                      className="block text-gray-400 text-sm mb-2 text-left"
                    >
                      Date of Arrival
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="date"
                          aria-label="Date of Arrival"
                          name="stay.arrivalDate"
                          value={formData.stay.arrivalDate}
                          onChange={handleInputChange}
                          data-testid="arrivalDateInput"
                        />
                      </div>
                    </label>
                  </div>
                  <div className={`w-full md:w-1/2 px-3 mb-6 md:mb-0 `}>
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Date of Departure
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="date"
                          aria-label="Date of Departure"
                          name="stay.departureDate"
                          data-testid="departureDateInput"
                          value={formData.stay.departureDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-gray-400 text-sm mb-2 text-left"
                      htmlFor="roomSizeSelect"
                    >
                      Room Size
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <select
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          aria-label="Room Size"
                          name="room.roomSize"
                          data-testid="roomSizeSelect"
                          value={formData.room.roomSize}
                          onChange={handleSelectChange}
                        >
                          <option value="standard-room">Standard Room</option>
                          <option value="deluxe-room">Deluxe Room</option>
                          <option value="family-suite">Family Suite</option>
                          <option value="honeymoon-suite">
                            Honeymoon Suite
                          </option>
                          <option value="business-suite">Business Suite</option>
                          <option value="presidential-suite">
                            Presidential Suite
                          </option>
                        </select>
                      </div>
                      <p className="text-gray-500 text-xs italic">
                        Choose a room type
                      </p>
                    </label>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-gray-400 text-sm mb-2 text-left"
                      htmlFor="roomQuantityInput"
                    >
                      Room Quantity
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="number"
                          aria-label="Room Quantity"
                          name="room.roomQuantity"
                          data-testid="roomQuantityInput"
                          value={formData.room.roomQuantity}
                          onChange={handleInputChange}
                          min="1"
                          max="5"
                        />
                      </div>
                      <p className="text-gray-500 text-xs italic">Maximum: 5</p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="firstNameInput"
                      className="block text-gray-400 text-sm mb-2 text-left"
                    >
                      First Name
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="IDM"
                          aria-label="First Name"
                          name="firstName"
                          data-testid="firstNameInput"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          maxLength={25}
                        />
                      </div>
                      <p className="text-gray-500 text-end text-xs italic">
                        {formData.firstName.length}/25
                      </p>
                    </label>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="lastNameInput"
                      className="block text-gray-400 text-sm mb-2 text-left"
                    >
                      Last Name
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="ENG"
                          aria-label="Last Name"
                          name="lastName"
                          data-testid="lastNameInput"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          maxLength={50}
                        />
                      </div>
                      <p className="text-gray-500 text-xs text-end italic">
                        {formData.lastName.length}/50
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Email
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="email"
                          placeholder="idm.test@idm.com"
                          aria-label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          maxLength={50}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Phone number
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="idm.test@idm.com"
                          aria-label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={50}
                        />
                      </div>
                      <p className="text-gray-500 text-xs text-start italic">
                        Add Your country code first
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Street Name
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="IDM Street"
                          aria-label="Street Name"
                          name="addressStreet.streetName"
                          value={formData.addressStreet.streetName}
                          onChange={handleInputChange}
                          maxLength={50}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Street Number
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          aria-label="Street Number"
                          placeholder="1234"
                          name="addressStreet.streetNumber"
                          value={formData.addressStreet.streetNumber}
                          onChange={handleInputChange}
                          maxLength={50}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      ZIP
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="123553"
                          aria-label="Zip Code"
                          name="addressLocation.zipCode"
                          value={formData.addressLocation.zipCode}
                          onChange={handleInputChange}
                          maxLength={7}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      State
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="Ontario"
                          aria-label="State"
                          name="addressLocation.state"
                          value={formData.addressLocation.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-gray-500 text-xs italic">
                        Autocomplete
                      </p>
                    </label>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      City
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="Oakville"
                          aria-label="City"
                          name="addressLocation.city"
                          value={formData.addressLocation.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Extras
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <select
                          multiple
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none bg-gray-100 rounded-lg"
                          aria-label="Extras"
                          name="extras"
                          value={selectedExtras}
                          onChange={handleExtraChange}
                        >
                          {availableExtras.map((extra) => (
                            <option key={extra} value={extra}>
                              {extra}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex  flex-wrap -mx-3 mb-6">
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-2">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="Credit Card"
                        data-ripple-dark="true"
                      >
                        <input
                          name="payment"
                          type="radio"
                          id="Credit Card"
                          value="Credit Card"
                          checked={formData.payment === "Credit Card"}
                          onChange={handleInputChange}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none  text-gray-700"
                        htmlFor="Credit Card"
                      >
                        Credit Card
                      </label>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-2">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="Paypal"
                        data-ripple-dark="true"
                      >
                        <input
                          name="payment"
                          type="radio"
                          value="Paypal"
                          id="Paypal"
                          checked={formData.payment === "Paypal"}
                          onChange={handleInputChange}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none  text-gray-700"
                        htmlFor="Paypal"
                      >
                        Paypal
                      </label>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-2">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="Cash"
                        data-ripple-dark="true"
                      >
                        <input
                          name="payment"
                          type="radio"
                          value="Cash"
                          id="Cash"
                          checked={formData.payment === "Cash"}
                          onChange={handleInputChange}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none  text-gray-700"
                        htmlFor="Cash"
                      >
                        Cash
                      </label>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-2">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="Bitcoin"
                        data-ripple-dark="true"
                      >
                        <input
                          name="payment"
                          type="radio"
                          id="Bitcoin"
                          value="Bitcoin"
                          checked={formData.payment === "Bitcoin"}
                          onChange={handleInputChange}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none  text-gray-700"
                        htmlFor="Bitcoin"
                      >
                        Bitcoin
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-400 text-sm mb-2 text-left">
                      Personal Note
                      <div className="flex items-center border-b border-gray-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="IDM Lab Test"
                          aria-label="Personal Note"
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="tagsInput"
                      className="block text-gray-400 text-sm mb-2 text-left"
                    >
                      Tags
                      <div className="flex flex-wrap  items-center border-b border-gray-500 py-2">
                        <ul className="flex flex-wrap">
                          {tag.map((allTag, index) => (
                            <div
                              key={allTag}
                              data-testid={`tag-${allTag}`}
                              className="relative flex m-1 font-medium py-1 px-1  rounded-full text-gray-600 bg-gray-200 border border-gray-200"
                            >
                              <li className="flex gap-1">
                                <span>{allTag}</span>
                                <GrFormClose
                                  data-testid="removeTags"
                                  onClick={() => removeTags(index)}
                                  className="text-white bg-gray-400 rounded-full w-4 h-4  cursor-pointer  hover:bg-gray-600  hover:text-white"
                                />
                              </li>
                            </div>
                          ))}
                        </ul>
                        <input
                          type="text"
                          value={newTag}
                          name="tags"
                          data-testid="tagsInput"
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          placeholder="Press Space to add tags"
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyUp={(e) => addTags(e)}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap flex-col mb-3">
                  <div className="w-full  mb-6 md:mb-0">
                    <label className="inline-flex items-center space-x-4 cursor-pointer text-gray-600">
                      <span className="relative">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          name="reminder"
                          checked={formData.reminder}
                          onChange={handleInputChange}
                        />
                        <div className="w-10 h-4 rounded-full shadow dark:bg-gray-600 peer-checked:bg-pink-500 peer-checked:bg-opacity-50"></div>
                        <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-pink-500"></div>
                      </span>
                      <span>Send me a reminder</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap flex-col mb-6">
                  <div className="w-full  mb-6 md:mb-0">
                    <label className="inline-flex items-center space-x-4 cursor-pointer text-gray-600">
                      <span className="relative">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                        />
                        <div className="w-10 h-4 rounded-full shadow dark:bg-gray-600 peer-checked:bg-pink-500 peer-checked:bg-opacity-50"></div>
                        <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-pink-500"></div>
                      </span>
                      <span>Subscribe to newsletter</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap flex-col mb-6">
                  <div className="w-full mb-6 md:mb-0">
                    <label className="inline-flex items-center space-x-4 cursor-pointer text-gray-600">
                      <span className="relative">
                        <input
                          type="checkbox"
                          name="confirm"
                          checked={formData.confirm}
                          onChange={handleInputChange}
                        />
                      </span>
                      <span>I confirm the information given above</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap">
                <button
                  data-testid="submit-button"
                  type="submit"
                  className="w-32  bg-pink-600 hover:bg-pink-800 p-2 m-2 rounded-md text-white font-bold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPage;
