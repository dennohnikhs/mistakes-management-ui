import axios from "axios";
import { useState } from "react";
import { Plus } from "react-feather";
import { getAuthToken } from "../../../utils/get_token_key";
import { API_BASE_URL } from "../../constants/constants";

function AddStudentForm() {
  const [name, setName] = useState("");
  const [admission_number, setAdmissionNumber] = useState("");
  const [student_class, setStudentClass] = useState("");
  const [stream, setStream] = useState("");
  const [successMessage, setSuccessMessage] = useState(null); // State for success or error message
  const [errorMessage, setErrorMessage] = useState(null); // State for success or error message
  const handleAddStudent = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/student/new`,
        {
          name,
          admission_number,
          student_class,
          stream,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        console.log(response.data);
        console.log("student added successfully");
        // You can display a success message to the user or perform other actions
        // Set success message
        setSuccessMessage("student added successfully");
      } else {
        // Set error message
        console.log("Failed to add student, ", response.data.error_message);
        setErrorMessage(` ${response.data.error_message}`);
        // Handle the failure, display an error message, etc.
      }
    } catch (error) {
      // Set error message
      console.log("An error occurred while adding student:", error);
      setErrorMessage(true);

      // Handle any unexpected errors
    }
    setName("");
    setAdmissionNumber("");
    setStudentClass("");
    setStream("");
    setTimeout(() => {
      setSuccessMessage(""); // Reset the message after adding student
      setErrorMessage(""); // Reset the message after adding student
    }, 5000);
  };
  return (
    <div>
      <div className="lg:min-h-[30px] text-black text-center">
        {successMessage ? (
          <p className="text-pa-green bg-pa-white py-3 px-3 rounded-lg">
            {successMessage}
          </p>
        ) : (
          <div>
            {errorMessage && (
              <p className="text-red-500 text-xs text-center  bg-pa-white">
                {errorMessage}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="text-pa-white bg-pa-black py-3 px-3 lg:w-[400px] ">
        <div className="gap-2 py-3 pb-4 w-full text-center items-center ">
          <h1> Student details...</h1>
        </div>
        <div className="flex flex-col gap-3 text-pa-black ">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-4 "
            placeholder="name"
            required
          />
          <input
            type="text"
            value={admission_number}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            className="py-3 px-4 "
            placeholder="admission number"
            required
          />
          <input
            type="text"
            value={student_class}
            onChange={(e) => setStudentClass(e.target.value)}
            className="py-3 px-4 "
            placeholder="class"
            required
          />
          <input
            type="text"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="py-3 px-4 "
            placeholder="stream"
            required
          />
        </div>

        <div className="py-5 px-3 flex justify-between ">
          <div></div>
          <button
            className="bg-pa-green text-pa-white py-3 px-3 rounded-lg flex flex-row gap-2"
            onClick={handleAddStudent}
          >
            <Plus className="text-pa-black bg-pa-green rounded-sm " />
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudentForm;
