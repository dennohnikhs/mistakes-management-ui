import PaButton from "../components/button/PaButton";

function TeacherHome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-3 px-2 font-poppins gap-4 bg-pa-white">
      <div className=" bg-pa-black rounded-lg text-pa-white py-5 px-5 lg:w-64 text-center ">
        Welcome Teacher
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
        <div>
          <PaButton buttonName="Students" />
        </div>
        <div>
          <PaButton buttonName="Offense Types" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
        <div>
          <PaButton buttonName="Sessions" />
        </div>
        <div>
          <PaButton buttonName="Offense" />
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
