import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteTeacher,
  getTeachers,
  updateTeacherPassword,
} from "../../apis/teacherService";
import { Button } from "@mui/material";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error

  const handleGetAllTeachers = async () => {
    try {
      const teachers = await getTeachers();
      setTeachers(teachers);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        setError("Unauthorized: Invalid or expired token");
      } else {
        console.error("Error occurred while getting the list of admins", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Call handleGetAllTeachers on page load
    handleGetAllTeachers();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }
  const handleUpdateTeacherPassword = async (teacherEmail) => {
    const newPassword = prompt("Please enter the new password "); // Prompt the user for the new password
    if (!newPassword) {
      console.error("New password not provided");
      return;
    }

    try {
      await updateTeacherPassword(teacherEmail, newPassword);
      toast.success("teacher password reset successfully"); // Display success message
    } catch (error) {
      console.log(
        "Error occurred while resetting teacher password:",
        error.message
      );
      toast.error("Error occurred while resetting teacher password"); // Display error message
    }
  };
  const handleDeleteTeacher = async (teacherEmail) => {
    if (
      window.confirm(
        `Are you sure you want to delete this teacher with email ${teacherEmail}?`
      )
    ) {
      try {
        await deleteTeacher(teacherEmail);
        handleGetAllTeachers();
      } catch (error) {
        console.error("Error occurred while deleting teacher:", error);
        toast.error("Error occurred while deleting teacher"); // Display error message
      }
    }
  };

  return (
    // ... same table for displaying the admins
    <div>
      <table className="min-w-full divide-y divide-pa-gray lg:mt-7">
        <thead className="bg-pa-black text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pa-gray-500 uppercase ">
              Email
            </th>

            <th className="px- py-3 text-left text-xs  uppercase ">
              Reset Password
            </th>
            <th className="px-3 py-3 text-left text-xs  uppercase ">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-pa-gray">
          {teachers.map((teacher, index) => (
            <tr key={teacher.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">
                  {index + 1}. {teacher.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">
                  {teacher.phone_number}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">{teacher.email}</div>
              </td>
              <td>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleUpdateTeacherPassword(teacher.email)}
                >
                  <Edit color="black" />
                </Button>
              </td>
              <td>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteTeacher(teacher.email)}
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default TeacherList;
