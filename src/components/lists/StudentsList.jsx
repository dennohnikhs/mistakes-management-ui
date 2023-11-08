import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteStudent, getAllStudents } from "../../apis/studentService";
import Button from "@mui/material/Button";
import StudentsUpdateForm from "../update-form/StudentUpdateForm";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error
  const [gridColumns, setGridColumns] = useState(1);
  const [toggleEditStudentDetails, setToggleEditStudentDetails] =
    useState(false);
  const [name, setName] = useState("");
  const [admission_number, setAdmissionNumber] = useState("");
  const [student_class, setStudentClass] = useState("");
  const [stream, setStream] = useState("");
  const [studentStatus, setStudentStatus] = useState("");

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

  const handleUpdateStudentDetails = async (studentAdmissionNumber) => {
    setGridColumns(2);
    setToggleEditStudentDetails(true);
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
          toast.success("Admin deleted successfully"); // Display success message
          setSuccessMessage("Student deleted successfully");
        }
        handleGetAllStudents();
      } catch (error) {
        console.error("Error occurred while deleting admin:", error);
        toast.error("Error occurred while deleting admin"); // Display error message
      }
    }
  };
  const handleCancelEditStudentDetails = () => {
    setToggleEditStudentDetails(false);
    setGridColumns(1);
  };
  const handleSubmitUpdatedStudentDetails = () => {
    console.log("submitting details...");
  };
  return (
    <div
      className={`grid lg:grid-cols-${gridColumns} bg-gray-200 min-h-screen`}
    >
      <div className="mt-7 ml-3">
        <table className="min-w-full divide-y divide-pa-gray lg:px-5 rounded-xl">
          <thead className="bg-green-500">
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
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleUpdateStudentDetails(student.admission_number)
                    }
                  >
                    <Edit />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="warning"
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
          <div className="text-pa-white bg-pa-black py-3 px-3  ">
            <StudentsUpdateForm />

            <div className="py-5 px-3 flex justify-between ">
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancelEditStudentDetails}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleSubmitUpdatedStudentDetails}
              >
                Update
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
