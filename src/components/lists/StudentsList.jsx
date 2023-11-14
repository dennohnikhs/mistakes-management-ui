import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteStudent, getAllStudents } from "../../apis/studentService";
import Button from "@mui/material/Button";
import { API_BASE_URL } from "../../constants/constants";
import axios from "axios";
import { getAuthToken } from "../../../utils/get_token_key";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error
  const [gridColumns, setGridColumns] = useState(1);
  const [toggleEditStudentDetails, setToggleEditStudentDetails] =
    useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentStream, setStudentStream] = useState("");
  const [studentStatus, setStudentStatus] = useState("");
  const [studentAdmissionNumber, setStudentAdmissionNumber] = useState("");

  const handleGetAllStudents = async () => {
    try {
      const listOfStudents = await getAllStudents();
      setStudents(listOfStudents);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized: Invalid or expired token");
      } else {
        console.error(
          "Error occurred while getting the list of students",
          error
        );
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Call handleGetAllAdmins on page load
    handleGetAllStudents();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  const handleEditStudentDetails = async (studentAdmissionNumber) => {
    setGridColumns(2);
    setToggleEditStudentDetails(true);
    setStudentAdmissionNumber(studentAdmissionNumber); // Set the student admission number in state
    // setIsUpdating(true);
  };
  const handleSubmitUpdatedStudentDetails = async () => {
    const updatedStudentDetails = {
      name: studentName,
      student_class: studentClass,
      stream: studentStream,
      status: studentStatus,
    };
    if (!studentName || !studentClass || !studentStream || !studentStatus) {
      setIsUpdating(false); // Set isUpdating back to false if the form is not valid

      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
      return;
    }
    try {
      const token = getAuthToken();
      if (!token) {
        // Handle the case where the token is not available
        setIsUpdating(false); // Set isUpdating back to false if the token is not available
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/student/edit/${studentAdmissionNumber}`,
        updatedStudentDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "this are the results of the updated student",
        updatedStudentDetails
      );
      const { success, error_message } = response.data;

      if (success) {
        // Return any necessary data or success status
        setIsUpdating(true);
        setTimeout(() => {
          setSuccessMessage(true);
        }, 2000);
        setTimeout(() => {
          setIsUpdating(false);
          setSuccessMessage(false);
        }, 4000);

        handleGetAllStudents();
      } else {
        console.error("Failed to update student details:", error_message);
        throw new Error("Failed to update student details");
      }
    } catch (error) {
      console.error("Error occurred while updating student details:", error);
      throw error;
    }
  };

  const handleCancelEditStudentDetails = () => {
    setToggleEditStudentDetails(false);
    setGridColumns(1);
  };

  const handleDeleteStudent = async (studentAdmissionNumber) => {
    if (
      window.confirm(
        `Are you sure you want to delete this student ${studentAdmissionNumber}?`
      )
    ) {
      try {
        let result = await deleteStudent(studentAdmissionNumber);
        if (result) {
          console.log("Student deleted successfully");
          toast.success("student deleted successfully"); // Display success message
          setSuccessMessage("Student deleted successfully");
        }
        handleGetAllStudents();
      } catch (error) {
        console.error("Error occurred while deleting admin:", error);
        toast.error("Error occurred while deleting admin"); // Display error message
      }
    }
  };

  return (
    <div
      className={`grid lg:grid-cols-${gridColumns} bg-pa-light-gray min-h-screen `}
    >
      <div className="mt-7 ml-3">
        <table className="min-w-full  divide-y divide-pa-gray lg:px-5 rounded-xl">
          <thead className="bg-pa-black text-white">
            <tr>
              <th className="lg:px-6 px-2 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
                Admission Number
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
                Class
              </th>

              <th className="px-3 py-3 text-left text-xs  uppercase ">
                Stream
              </th>
              <th className="px-3 py-3 text-left text-xs  uppercase ">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs  uppercase ">Edit</th>
              <th className="px-3 py-3 text-left text-xs  uppercase ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pa-gray">
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="lg:px-6 px-2 py-4 whitespace-nowrap">
                  <div className="text-sm text-pa-gray-900">
                    {index + 1}. {student.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-pa-gray-900">
                    {student.admission_number}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-pa-gray-900">
                    {student.class}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-pa-gray-900">
                    {student.stream}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-pa-gray-900">
                    {student.status}
                  </div>
                </td>
                <td>
                  <Button
                    variant="text"
                    onClick={() =>
                      handleEditStudentDetails(student.admission_number)
                    }
                  >
                    <Edit color="black" className="bg-white" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() =>
                      handleDeleteStudent(student.admission_number)
                    }
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggleEditStudentDetails ? (
        <div className=" lg:mt-7 px-3">
          <div>
            <div className="text-pa-white bg-pa-black ">
              <div className=" py-3 text-center items-center ">
                <h1> New Student details...</h1>
              </div>

              <div className="flex flex-col gap-3 text-pa-white bg-pa-white px-2 py-3">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="py-3 px-4 text-pa-black bg-white border border-gray-300  shadow-lg "
                  placeholder="name"
                  required
                />

                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg"
                  placeholder="class"
                  required
                />
                <input
                  type="text"
                  value={studentStream}
                  onChange={(e) => setStudentStream(e.target.value)}
                  className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg "
                  placeholder="stream"
                  required
                />
                <input
                  type="text"
                  value={studentStatus}
                  onChange={(e) => setStudentStatus(e.target.value)}
                  className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg"
                  placeholder="status"
                  required
                />
              </div>
            </div>

            <div className="py-5 px-3 flex justify-between bg-white ">
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancelEditStudentDetails}
              >
                Cancel
              </Button>
              {errorMessage ? (
                <div className=" text-red-500 text-xs">
                  <div>please provide all the details to update student</div>
                </div>
              ) : null}
              {successMessage ? (
                <div className=" text-green-500 text-xs">
                  <div>student details updated successfully</div>
                </div>
              ) : null}
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleSubmitUpdatedStudentDetails}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <ToastContainer />
    </div>
  );
}

export default StudentsList;
