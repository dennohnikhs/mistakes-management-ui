import { Search } from "react-feather";
import AddStudentForm from "../components/add-entries/addStudent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../constants/constants";
import axios from "axios";
import { getAuthToken } from "../../utils/get_token_key";
import PaGetAll from "../components/button/PaGetAll";

function StudentsDashBoard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const [error, setError] = useState(null); // State to track error

  const handleRedirectToStudentsTable = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        navigate("/students-list");
      } else {
        console.error(
          "Failed to fetch students. Response data:",
          response.data
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized");
      } else {
        console.error(
          "Error occurred while getting the list of students",
          error
        );
        setError(error.message);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  lg:pt-20 font-poppins gap-5 bg-pa-light-gray">
      <div className="py-3 px-2 bg-pa-black rounded-xl flex flex-row items-center ">
        <input
          type="text"
          className="py-3 lg:px-4 rounded-lg"
          placeholder="Search Student..."
        />
        <Search className="w-10 h-7 text-pa-white" />
      </div>

      <PaGetAll onClick={handleRedirectToStudentsTable}>
        View All Students
      </PaGetAll>

      <AddStudentForm />
    </div>
  );
}

export default StudentsDashBoard;
