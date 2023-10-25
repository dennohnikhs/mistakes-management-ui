import { Search } from "react-feather";
import PaGetAll from "../components/button/PaGetAll";
import AddOffenseTypeForm from "../components/add-entries/offenseType";

function OffenseTypesDashBoard() {
  return (
    <div className="min-h-full flex flex-col justify-center items-center py-10 lg:mt-20 font-poppins gap-5">
      <div className="py-3 px-2 bg-pa-black rounded-xl flex flex-row items-center gap-2 ">
        <Search className="w-10 h-7 text-pa-white" />
        <input
          type="text"
          className="py-3 px-4 rounded-lg"
          placeholder="Search Offense Type..."
        />
      </div>
      <div>
        <PaGetAll title="get all Offense Types" />
      </div>
      <AddOffenseTypeForm />
    </div>
  );
}

export default OffenseTypesDashBoard;
