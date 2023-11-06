import { useState } from "react";
import { Plus } from "react-feather";
import { getAuthToken } from "../../../utils/get_token_key";
import axios from "axios";
import { API_BASE_URL } from "../../constants/constants";

function AddTeacherForm() {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("3");
  const [message, setMessage] = useState(null); // State for success or error message
  const handleAddTeacher = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/teacher/new`,
        {
          name,
          email,
          phone_number,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("teacher added successfully");
        // You can display a success message to the user or perform other actions
        // Set success message
        setMessage("teacher added successfully");
      } else {
        console.error("Failed to add teacher:", response.data.error_message);
        // Set error message
        setMessage(` ${response.data.error_message}`);
        // Handle the failure, display an error message, etc.
      }
    } catch (error) {
      // Set error message
      setMessage("An error occurred while adding teacher");
      console.log("An error occurred while adding teacher:", error);
      // Handle any unexpected errors
    }
    setName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setRole("3");
    setTimeout(() => {
      setMessage(null); // Reset the message after adding teacher
    }, 3000);
  };
  return (
    <div>
      <div className=" px-3 flex justify-between">
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
      <div className="text-pa-white bg-pa-black py-3 px-3 mt-5 lg:w-[400px]">
        <div className="gap-2 py-3 pb-4 w-full text-center items-center ">
          <h1>Fill teacher details</h1>
        </div>
        <div className="flex flex-col gap-3 text-pa-black ">
          <input
            type="text"
            className="py-3 px-4 "
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-3 px-4"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-3 px-4"
            placeholder="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <input
            type="text"
            className="py-3 px-4"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="py-3 px-4"
            placeholder="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="py-5 px-3 flex justify-between ">
          <div></div>
          <button
            className="bg-pa-green text-pa-white py-3 px-3 rounded-lg flex flex-row gap-2"
            onClick={handleAddTeacher}
          >
            <Plus className="text-pa-black bg-pa-green rounded-sm " />
            add teacher
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherForm;
