import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <>
      <Link to={"/add"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Add +
        </button>
      </Link>
    </>
  );
};

export default AddButton;
