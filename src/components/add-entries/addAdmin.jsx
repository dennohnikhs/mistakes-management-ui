import { Plus } from "react-feather";
import axios from "axios";
import { useState } from "react";
import { getAuthToken } from "../../../utils/get_token_key";
import { API_BASE_URL } from "../../constants/constants";

function AddAdminForm() {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // State for success or error message

  const handleAddAdmin = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/new`,
        {
          name,
          phone_number,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Admin added successfully");
        // You can display a success message to the user or perform other actions
        // Set success message
        setMessage("Admin added successfully");
      } else {
        console.error("Failed to add admin:", response.data.error_message);
        // Set error message
        setMessage(` ${response.data.error_message}`);
        // Handle the failure, display an error message, etc.
      }
    } catch (error) {
      // Set error message
      setMessage("An error occurred while adding admin");
      console.log("An error occurred while adding admin:", error);
      // Handle any unexpected errors
    }
    setName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setMessage(null); // Reset the message after adding admin
    }, 3000);
  };

  return (
    <div>
      <div className=" px-3 flex justify-between lg:min-h-[50px]">
        <div>
          {message && (
            <p
              className={
                message.includes("successfully")
                  ? "text-pa-green"
                  : "text-red-500"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="text-pa-green"></div>
      <div className="text-pa-white bg-pa-black rounded-lg py-3 px-3 mt-5 lg:w-[400px]">
        <div className="gap-2 py-3 pb-4 w-full text-center items-center ">
          <h1>Fill Admin details</h1>
        </div>
        <div className="flex flex-col gap-3 text-pa-black ">
          <input
            type="text"
            className="py-3 px-4 "
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Make the input required
          />
          <input
            type="text"
            className="py-3 px-4"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Make the input required
          />
          <input
            type="text"
            className="py-3 px-4"
            placeholder="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required // Make the input required
          />

          <input
            type="text"
            className="py-3 px-4"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Make the input required
          />
        </div>

        <div className="py-5 px-3 flex justify-between ">
          <div></div>
          <button
            className="bg-pa-green text-pa-white py-3 px-3 rounded-lg flex flex-row gap-2"
            onClick={handleAddAdmin}
          >
            <Plus className="text-pa-black bg-pa-green rounded-sm " />
            add Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminForm;
