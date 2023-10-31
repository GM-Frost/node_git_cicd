import AddButton from "../components/Addbutton/AddButton";
import Datatable from "../components/Datatable/Datatable";
import { useState } from "react";
import SearchComponent from "../components/Search/SearchComponent";
type Props = {};

const HomePage = (props: Props) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("firstName");

  return (
    <>
      <h1 className="text-2xl font-bold flex justify-center items-center">
        POC for Reservations
      </h1>
      <div className="flex justify-end mr-3 flex-wrap">
        <AddButton />
      </div>
      <SearchComponent
        onSearchChange={setSearchFilter}
        onSortChange={setSortFilter}
        currentSort={sortFilter}
      />
      <div className="justify-center flex-wrap w-full">
        <Datatable search={searchFilter} sort={sortFilter} />
      </div>
    </>
  );
};

export default HomePage;
