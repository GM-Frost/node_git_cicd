import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IReservation, initialReservation } from "../addpage/AddPage.types";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

const EditPage = (props: IReservation) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<IReservation>(initialReservation);

  const availableExtras = [
    "extraBreakfast",
    "extraTV",
    "extraWiFi",
    "extraParking",
    "extraBalcony",
  ];

  //Local Storage for Tags
  const [newTag, setNewTag] = useState("");

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && newTag.trim() !== "") {
      setData({
        ...data,
        tags: [...data.tags, newTag.trim()],
      });
      setNewTag(""); // Clear the input field
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`/reservations/${id}`, data);
      toast.info("Reservations updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //fetching Data from ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reservations/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div className="flex  items-center justify-center">
        {loading ? (
          <>
            <p className="mt-10">
              Loading... <MoonLoader className="mt-10" color="#3a6bcf" />
            </p>
          </>
        ) : (
          <div className="w-full max-w-screen flex justify-center items-center  min-h-screen">
            <div className="bg-white p-8 rounded-md shadow-lg w-[80%]">
              <Link
                to={"/"}
                className="flex cursor-pointer hover:text-red-400 justify-start items-center text-center gap-2"
              >
                <AiOutlineArrowLeft className="bg-gray-100 rounded-full" />
                <span>Go Back</span>
              </Link>
              <h2
                data-testid="Edit Your Reservations"
                className="flex flex-wrap justify-center text-2xl font-bold mb-4"
              >
                Edit Your Reservations
              </h2>
              <hr />
              {/* <div className="flex flex-wrap justify-center items-center">
              {(emptyError || selectError) && (
                <p className="text-red-600 ">{errorMessage}</p>
              )}
            </div> */}
              <form
                data-testid="reservation-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <div className="mt-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        htmlFor="arrivalDateInput"
                        className="block text-gray-400 text-sm mb-2 text-left"
                      >
                        Date of Arrival
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="date"
                            data-testid="arrivalDateInput"
                            id="arrivalDateInput"
                            aria-label="Date of Arrival"
                            name="stay.arrivalDate"
                            value={data.stay.arrivalDate}
                            onChange={(e) =>
                              setData({
                                ...data,
                                stay: {
                                  ...data.stay,
                                  arrivalDate: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </label>
                    </div>
                    <div className={`w-full md:w-1/2 px-3 mb-6 md:mb-0 `}>
                      <label
                        htmlFor="departureDateInput"
                        className="block text-gray-400 text-sm mb-2 text-left"
                      >
                        Date of Departure
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="date"
                            aria-label="Date of Departure"
                            name="stay.departureDate"
                            data-testid="departureDateInput"
                            id="departureDateInput"
                            value={data.stay.departureDate}
                            onChange={(e) =>
                              setData({
                                ...data,
                                stay: {
                                  ...data.stay,
                                  departureDate: e.target.value,
                                },
                              })
                            }
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
                            value={data.room.roomSize}
                            onChange={(e) =>
                              setData({
                                ...data,
                                room: {
                                  ...data.room,
                                  roomSize: e.target.value,
                                },
                              })
                            }
                          >
                            <option value="standard-room">Standard Room</option>
                            <option value="deluxe-room">Deluxe Room</option>
                            <option value="family-suite">Family Suite</option>
                            <option value="honeymoon-suite">
                              Honeymoon Suite
                            </option>
                            <option value="business-suite">
                              Business Suite
                            </option>
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
                            value={data.room.roomQuantity}
                            onChange={(e) => {
                              const quantity = parseInt(e.target.value, 10);
                              if (
                                !isNaN(quantity) &&
                                quantity >= 1 &&
                                quantity <= 5
                              ) {
                                setData({
                                  ...data,
                                  room: {
                                    ...data.room,
                                    roomQuantity: quantity,
                                  },
                                });
                              }
                            }}
                            min="1"
                            max="5"
                          />
                        </div>
                        <p className="text-gray-500 text-xs italic">
                          Maximum: 5
                        </p>
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
                            value={data.firstName}
                            onChange={(e) =>
                              setData({ ...data, firstName: e.target.value })
                            }
                            maxLength={25}
                          />
                        </div>
                        <p className="text-gray-500 text-end text-xs italic">
                          {data.firstName.length}/25
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
                            value={data.lastName}
                            onChange={(e) =>
                              setData({ ...data, lastName: e.target.value })
                            }
                            maxLength={50}
                          />
                        </div>
                        <p className="text-gray-500 text-xs text-end italic">
                          {data.lastName.length}/50
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
                            value={data.email}
                            maxLength={50}
                            onChange={(e) => {
                              setData({ ...data, email: e.target.value });
                            }}
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
                            value={data.phone}
                            maxLength={50}
                            onChange={(e) => {
                              setData({ ...data, phone: e.target.value });
                            }}
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
                            value={data.addressStreet.streetName}
                            maxLength={50}
                            onChange={(e) => {
                              setData({
                                ...data,
                                addressStreet: {
                                  ...data.addressStreet,
                                  streetName: e.target.value,
                                },
                              });
                            }}
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
                            value={data.addressStreet.streetNumber}
                            maxLength={50}
                            onChange={(e) => {
                              setData({
                                ...data,
                                addressStreet: {
                                  ...data.addressStreet,
                                  streetNumber: e.target.value,
                                },
                              });
                            }}
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
                            value={data.addressLocation.zipCode}
                            maxLength={7}
                            onChange={(e) => {
                              setData({
                                ...data,
                                addressLocation: {
                                  ...data.addressLocation,
                                  zipCode: e.target.value,
                                },
                              });
                            }}
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
                            value={data.addressLocation.state}
                            onChange={(e) => {
                              setData({
                                ...data,
                                addressLocation: {
                                  ...data.addressLocation,
                                  state: e.target.value,
                                },
                              });
                            }}
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
                            value={data.addressLocation.city}
                            onChange={(e) => {
                              setData({
                                ...data,
                                addressLocation: {
                                  ...data.addressLocation,
                                  city: e.target.value,
                                },
                              });
                            }}
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
                            value={data.extras}
                            onChange={(e) => {
                              const selectedExtras = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              );

                              setData({
                                ...data,
                                extras: selectedExtras,
                              });
                            }}
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
                            checked={data.payment === "Credit Card"}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                            onChange={(e) => {
                              setData({
                                ...data,
                                payment: e.target.value,
                              });
                            }}
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
                            checked={data.payment === "Paypal"}
                            onChange={(e) => {
                              setData({
                                ...data,
                                payment: e.target.value,
                              });
                            }}
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
                            checked={data.payment === "Cash"}
                            onChange={(e) => {
                              setData({
                                ...data,
                                payment: e.target.value,
                              });
                            }}
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
                            checked={data.payment === "Bitcoin"}
                            onChange={(e) => {
                              setData({
                                ...data,
                                payment: e.target.value,
                              });
                            }}
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
                            value={data.note}
                            onChange={(e) => {
                              setData({
                                ...data,
                                note: e.target.value,
                              });
                            }}
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
                            {data.tags.map((allTag, index) => (
                              <div
                                key={allTag}
                                data-testid={`tag-${allTag}`}
                                className="relative flex m-1 font-medium py-1 px-1  rounded-full text-gray-600 bg-gray-200 border border-gray-200"
                              >
                                <li className="flex gap-1">
                                  <span>{allTag}</span>
                                  <GrFormClose
                                    data-testid="removeTags"
                                    onClick={() => {
                                      const updatedTags = data.tags.filter(
                                        (_, i) => i !== index
                                      );
                                      setData({
                                        ...data,
                                        tags: updatedTags,
                                      });
                                    }}
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
                            onKeyUp={addTags}
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
                            checked={data.reminder}
                            onChange={(e) => {
                              setData({
                                ...data,
                                reminder: e.target.checked,
                              });
                            }}
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
                            checked={data.newsletter}
                            onChange={(e) => {
                              setData({
                                ...data,
                                newsletter: e.target.checked,
                              });
                            }}
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
                            checked={data.confirm}
                            onChange={(e) => {
                              setData({
                                ...data,
                                confirm: e.target.checked,
                              });
                            }}
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
        )}
      </div>
    </>
  );
};

export default EditPage;
