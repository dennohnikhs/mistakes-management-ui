import { Search } from "react-feather";
import PaGetAll from "../components/button/PaGetAll";
import AddTeacherForm from "../components/add-entries/addTeacher";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuthToken } from "../../utils/get_token_key";
import { API_BASE_URL } from "../constants/constants";
import axios from "axios";
import { toast } from "react-toastify";

function TeachersDashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to track error
  const [teacherEmail, setTeacherEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const handleRedirectToTeachersTable = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        navigate("/teacher-list");
      } else {
        console.error("Failed to fetch admins. Response data:", response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized: Invalid or expired token");
      } else {
        console.error("Error occurred while getting the list of admins", error);
        setError(error.message);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleSearchTeacherByEmail = async () => {
    if (
      !teacherEmail.includes("@") ||
      !teacherEmail.includes(".") ||
      teacherEmail.includes(" ")
    ) {
      return toast.warning(
        "email address cannot be empty or contain spaces please enter a valid email address e.g. 123@gmail.com"
      );
    }
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }
      const response = await axios.get(
        `${API_BASE_URL}/search/teacher?email=${teacherEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSearchResults(response.data.teacher);
      } else {
        setShowNoResultsMessage(true);
        console.error(
          "Failed to find teacher with the email provided:",
          response.data
        );
        setSearchResults([]); // Set searchResults to an empty array when no results are found
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized: Invalid or expired token");
      } else {
        console.error(
          "Error occurred while finding teacher with the provided email",
          error
        );
        setError(error.message);
      }
      setSearchResults([]); // Set searchResults to an empty array when an error occurs
    }
    setTimeout(() => {
      setSearchResults([]);
      setTeacherEmail("");
      setShowNoResultsMessage(false);
    }, 4000);
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center py-10 lg:mt-20 font-poppins gap-5">
      <div className="py-3 px-2 bg-pa-black rounded-xl flex flex-row items-center gap-2 ">
        <input
          type="text"
          className="py-3 px-4 rounded-lg"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          placeholder="Search Teacher..."
        />
        <Search
          className="w-10 h-7 text-pa-white"
          onClick={handleSearchTeacherByEmail}
        />
      </div>
      <div onClick={handleRedirectToTeachersTable}>
        <PaGetAll title="view all teachers" />
      </div>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((teacher) => (
            <li
              key={teacher.id}
              className="text-red flex flex-col text-pa-green"
            >
              <div>
                <span className="text-pa-black">id:</span> {teacher.id}
              </div>
              <div>
                <span className="text-pa-black">name:</span> {teacher.name}
              </div>
              <div>
                <span className="text-pa-black">phone number:</span>{" "}
                {teacher.phone_number}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          {showNoResultsMessage && (
            <div className="text-red-500">
              No results found for the searched email.
            </div>
          )}
        </div>
      )}

      <AddTeacherForm />
    </div>
  );
}

export default TeachersDashboard;
