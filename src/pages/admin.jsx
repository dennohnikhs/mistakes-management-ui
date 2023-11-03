import { useState } from "react";
import { Search } from "react-feather";
import PaGetAll from "../components/button/PaGetAll";
import AddAdminForm from "../components/add-entries/addAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/get_token_key";
import { API_BASE_URL } from "../constants/constants";

function AdminDashBoard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // State to track error

  const handleRedirectToAdminsTable = async () => {
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
        navigate("/admin-list");
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
  const handleSearchAdminByEmail = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/search/admins?email=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Admin found, set search results and clear the search query
        setSearchResults(response.data.admin);
        setSearchQuery("");
      } else {
        // Admin not found, clear search results and display a message
        setSearchResults();
        // toast.error("Admin not found"); // Display error message

        console.log("Admin not found");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized: Invalid or expired token");
      } else {
        console.error("Error occurred while searching for the admin", error);
        setError(error.message);
      }
    }
    setTimeout(() => {
      setSearchResults("");
    }, 5000);
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center py-10 lg:mt-20 font-poppins gap-5">
      <div className="py-3 px-4 bg-pa-black rounded-xl flex flex-row items-center gap-2">
        <input
          type="text"
          className="py-3 px-2 rounded-lg"
          placeholder="search admin..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="items-center text-white"
          onClick={handleSearchAdminByEmail}
        >
          <Search className="w-10 h-7 text-pa-white" />
        </button>
      </div>

      <div onClick={handleRedirectToAdminsTable}>
        <PaGetAll title="Get all Admins" />
      </div>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((admin) => (
            <li key={admin.id} className="text-red flex flex-col text-pa-green">
              <p className="underline py-3">Admin details</p>
              <div>
                <span className="text-pa-black">id:</span> {admin.id}
              </div>
              <div>
                <span className="text-pa-black">name:</span> {admin.name}
              </div>
              <div>
                <span className="text-pa-black">phone number:</span>{" "}
                {admin.phone_number}
              </div>
            </li>
          ))}
        </ul>
      )}

      <AddAdminForm />

      <ToastContainer />
    </div>
  );
}

export default AdminDashBoard;
