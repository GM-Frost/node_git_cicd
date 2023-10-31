import React, { useState, useEffect } from "react";
import { IRecord } from "./Datatable.types";
import { MoonLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailModal from "../Details/DetailModal";

interface DataTableProps {
  search: string;
  sort: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Datatable: React.FC<DataTableProps> = ({ search, sort }) => {
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<string[]>([]);
  const [records, setRecords] = useState<IRecord[]>([]);

  const navigate = useNavigate();

  //Observable
  const [refreshData, setRefreshData] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshData(true);
  };

  //Delete Data
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Do you want to delete this record?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:8000/reservations/${id}`);
        handleRefresh();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  //OPEN DETAIL MODAL
  const [recordId, setRecordId] = useState<string>("");
  const [detailsModelOpen, setDetailsModelOpen] = useState<boolean>(false);

  const openDetailModal = (id: string) => {
    setRecordId(id);
    setDetailsModelOpen(true);
  };

  const closeDetailModal = () => {
    setDetailsModelOpen(false);
  };

  // USEEffect Hook to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/reservations");
        console.log(JSON.stringify(response));
        if (response.data.length === 0) {
          setColumns([]);
          setRecords([]);
        } else {
          setColumns(Object.keys(response.data[0]));
          setRecords(response.data);
        }
        setLoading(false);
        setRefreshData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshData]);

  return (
    <>
      <div className="h-full flex items-center justify-center">
        {loading ? (
          <>
            <p className="mt-10">
              Loading... <MoonLoader className="mt-10" color="#3a6bcf" />
            </p>
          </>
        ) : (
          <>
            <div className="w-full max-w-screen mx-5 bg-white shadow-lg rounded-lg overflow-x-auto rounded-t-none">
              <table className="w-full  divide-y  divide-gray-200 dark:divide-gray-700  table-auto">
                <thead className=" bg-gray-700 ">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase dark:text-gray-400"
                      >
                        {column}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-gray-200 dark:divide-gray-700">
                  <>
                    {records.length === 0 ? (
                      <p className="py-5 flex justify-center items-center text-center">
                        "No Records Found"
                      </p>
                    ) : (
                      <>
                        {records
                          .filter((data) => {
                            if (search.toLowerCase() === "") {
                              return true;
                            }
                            if (
                              sort === "firstName" &&
                              data.firstName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return true;
                            } else if (
                              sort === "lastName" &&
                              data.lastName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return true;
                            } else if (
                              sort === "email" &&
                              data.email
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return true;
                            } else if (
                              sort === "city" &&
                              data.addressLocation.city
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return true;
                            }

                            return false;
                          })
                          .map((data) => {
                            //Format the Date:
                            const formattedStartDate = formatDate(
                              data.stay.arrivalDate
                            );
                            const formattedEndDate = formatDate(
                              data.stay.departureDate
                            );
                            const {
                              room: { roomSize, roomQuantity },
                              firstName,
                              lastName,
                              email,
                              phone,
                              addressStreet: { streetName, streetNumber },
                              addressLocation: { zipCode, state, city },
                              extras,
                              payment,
                              note,
                              tags,
                              reminder,
                              newsletter,
                              confirm,
                              id,
                            } = data;

                            return (
                              <>
                                <tr
                                  key={data.id}
                                  className="hover:bg-gray-100 cursor-pointer"
                                  onClick={() => openDetailModal(id)}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {formattedStartDate} - {formattedEndDate}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {roomSize} (QTY: {roomQuantity})
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {firstName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {lastName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {phone}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {streetNumber}, {streetName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {city}, {state}, {zipCode}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {extras.join(", ")}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {payment}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {note}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {tags.join(", ")}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {reminder ? "Yes" : "No"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {newsletter ? "Yes" : "No"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {confirm ? "Yes" : "No"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    {id}
                                  </td>

                                  <td className="px-6 flex gap-2 flex-row justify-evenly py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/update/${id}`);
                                      }}
                                      data-testid="edit-button"
                                      className="bg-cyan-600 p-2 rounded-lg text-white   items-center hover:bg-cyan-700 flex justify-center gap-2"
                                    >
                                      Edit <FaEdit />
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(id);
                                      }}
                                      data-testid="tableDeleteButton"
                                      className="bg-red-500 p-2 rounded-lg items-center  text-white hover:bg-red-600 flex justify-center gap-2"
                                    >
                                      Delete <IoTrashBin />
                                    </button>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <DetailModal
        detailId={recordId}
        isOpen={detailsModelOpen}
        onClose={closeDetailModal}
      />
    </>
  );
};

export default Datatable;
