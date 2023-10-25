import { Plus } from "react-feather";

function AddSessionForm() {
  return (
    <div>
      <div className="text-pa-white bg-pa-black py-3 px-3 mt-5 lg:w-[400px]">
        <div className="gap-2 py-3 pb-4 w-full text-center items-center ">
          <h1>Fill Session details</h1>
        </div>
        <div className="flex flex-col gap-3 text-pa-black ">
          <input type="text" className="py-3 px-4 " placeholder="term" />
          <input type="text" className="py-3 px-4" placeholder="start_date" />
          <input type="text" className="py-3 px-4" placeholder="end_date" />
        </div>
        <div className="py-5 px-3 flex justify-between ">
          <div></div>
          <button className="bg-pa-green text-pa-white py-3 px-3 rounded-lg flex flex-row gap-2">
            <Plus className="text-pa-black bg-pa-green rounded-sm " />
            add Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSessionForm;
