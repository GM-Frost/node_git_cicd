import React, { useState, useEffect } from "react";
import {
  IReservation,
  initialReservation,
} from "../../pages/addpage/AddPage.types";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";

type DetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  detailId: string;
};

const DetailModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  detailId,
}) => {
  const [formData, setFormData] = useState<IReservation>(initialReservation);

  //fetching Data from ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reservations/${detailId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [detailId]);
  return (
    <>
      {isOpen && formData.id === detailId ? (
        <>
          <div className="fixed inset-0 flex items-start justify-center z-50 overflow-y-auto mb-10">
            <button
              tabIndex={-1}
              onClick={() => onClose()}
              data-testid="close-button"
              className="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
            ></button>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-container bg-white shadow-xl rounded-lg p-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-3/4 absolute top-20">
              <div className="flex justify-start top-3 left-3 absolute">
                <p>ID# {detailId}</p>
              </div>
              <h2 className="justify-center text-center text-xl font-bold mb-4">
                Reservations Details
              </h2>
              <div className="flex justify-end top-3 right-3 absolute">
                <GrFormClose
                  onClick={() => onClose()}
                  className="bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg  ml-auto inline-flex items-center"
                />
              </div>
              <form>
                <div className="mt-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Date of Arrival
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.stay.arrivalDate}
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Date of Departure
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.stay.departureDate}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Room Size
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.room.roomSize}
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Room Quantity
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.room.roomQuantity}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        First Name
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.firstName}
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Last Name
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.lastName}
                          </div>
                        </div>
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.email}
                          </div>
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.phone}
                          </div>
                        </div>
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.addressStreet.streetName}
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Street Number
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.addressStreet.streetNumber}
                          </div>
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.addressLocation.zipCode}
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        State
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.addressLocation.state}
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        City
                        <div className="flex items-center border-b border-gray-500 py-2">
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.addressLocation.city}
                          </div>
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none bg-gray-100 rounded-lg">
                            {formData.extras.map((extra) => (
                              <div key={extra}>{extra}</div>
                            ))}
                          </div>
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
                            type="radio"
                            disabled
                            checked={formData.payment === "Credit Card"}
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
                          htmlFor="paypal"
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
                            type="radio"
                            disabled
                            checked={formData.payment === "Paypal"}
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
                          htmlFor="paypal"
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
                            type="radio"
                            disabled
                            checked={formData.payment === "Cash"}
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
                          htmlFor="cash"
                        >
                          Cash
                        </label>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-2">
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex cursor-pointer items-center rounded-full p-3"
                          htmlFor="bitcoin"
                          data-ripple-dark="true"
                        >
                          <input
                            type="radio"
                            disabled
                            checked={formData.payment === "Bitcoin"}
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
                          htmlFor="bitcoin"
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
                          <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                            {formData.note}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-400 text-sm mb-2 text-left">
                        Tags
                        <div className="flex flex-wrap  items-center border-b border-gray-500 py-2">
                          <ul className="flex flex-wrap">
                            {formData.tags.map((allTag) => (
                              <div
                                key={allTag}
                                className="relative flex m-1 font-medium py-1 px-1  rounded-full text-gray-600 bg-gray-200 border border-gray-200"
                              >
                                <li className="flex gap-1">
                                  <span>{allTag}</span>
                                  <GrFormClose className="text-white bg-gray-400 rounded-full w-4 h-4  cursor-pointer  hover:bg-gray-600  hover:text-white" />
                                </li>
                              </div>
                            ))}
                          </ul>
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
                            disabled
                            defaultChecked={formData.reminder}
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
                            disabled
                            defaultChecked={formData.newsletter}
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
                            disabled
                            defaultChecked={formData.confirm}
                          />
                        </span>
                        <span>I confirm the information given above</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default DetailModal;
