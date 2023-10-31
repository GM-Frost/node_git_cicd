import React, { useState } from "react";

interface SearchComponentProps {
  onSearchChange: (search: string) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchChange,
  onSortChange,
  currentSort,
}) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const sortOptions = [
    "firstName",
    "lastName",
    "email",
    "zipCode",
    "city",
    "payment",
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <>
      <div className="min-h-14 gap-3 mx-5 flex flex-col sm:flex-row rounded-t-md shadow-xl mt-5 p-4 bg-gray-700 text-white justify-between">
        <div className="flex flex-row gap-3 justify-start sm:justify-around">
          <p className="block">Search By</p>
          <select
            name="number"
            onChange={handleSortChange}
            value={currentSort}
            className="text-gray-800 bg-gray-50 px-1"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          <p>Entries</p>
        </div>
        <div className="font-bold">POC For Hotel Reservation</div>
        <form className="input group flex justify-center max-w-[400px] w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="form-control px-2 rounded-md text-gray-700 focus:outline-none"
          />
        </form>
      </div>
    </>
  );
};

export default SearchComponent;
