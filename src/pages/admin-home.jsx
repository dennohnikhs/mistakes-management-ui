import { useNavigate } from "react-router-dom";
import PaButton from "../components/button/PaButton";

function AdminHome() {
  const navigate = useNavigate();
  const handleRedirectAdminToTeacherMainDashBoard = () => {
    navigate("/teacher-main-dashboard");
  };
  const handleRedirectAdminToStudentsMainDashBoard = () => {
    navigate("/students");
  };
  const handleRedirectAdminToOffenseTypesMainDashBoard = () => {
    navigate("/offense-types");
  };
  const handleRedirectAdminToAdminMainDashBoard = () => {
    navigate("/admins");
  };
  const handleRedirectAdminToOffenseMainDashBoard = () => {
    navigate("/offense");
  };
  const handleRedirectAdminToSessionsMainDashBoard = () => {
    navigate("/sessions");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-3 px-2 font-poppins gap-4 bg-pa-light-gray">
      <div className="bg-pa-black rounded-lg text-pa-white py-5 px-5 lg:w-64 text-center">
        Welcome Admin
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        <div onClick={handleRedirectAdminToTeacherMainDashBoard}>
          <PaButton buttonName="Teachers" />
        </div>
        <div onClick={handleRedirectAdminToStudentsMainDashBoard}>
          <PaButton buttonName="Students" />
        </div>
        <div onClick={handleRedirectAdminToOffenseTypesMainDashBoard}>
          <PaButton buttonName="Offense Types" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        <div onClick={handleRedirectAdminToAdminMainDashBoard}>
          <PaButton buttonName="Admins" />
        </div>
        <div onClick={handleRedirectAdminToSessionsMainDashBoard}>
          <PaButton buttonName="Sessions" />
        </div>
        <div onClick={handleRedirectAdminToOffenseMainDashBoard}>
          <PaButton buttonName="Offense" />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
