import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllAdmins, updateAdminPassword } from "../../apis/adminService";
import { Button } from "@mui/material";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error

  const handleGetAllAdmins = async () => {
    try {
      const admins = await getAllAdmins();
      setAdmins(admins);
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
    // Call handleGetAllAdmins on page load
    handleGetAllAdmins();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  const handleUpdateAdminPassword = async (adminEmail) => {
    const newPassword = prompt("Please enter the new password"); // Prompt the user for the new password
    if (!newPassword) {
      console.error("New password not provided");
      return;
    }

    try {
      await updateAdminPassword(adminEmail, newPassword);
      toast.success("Admin password reset successfully"); // Display success message
    } catch (error) {
      console.log(
        "Error occurred while resetting admin password:",
        error.message
      );
      toast.error("Error occurred while resetting admin password"); // Display error message
    }
  };
  const handleDeleteAdmin = async (adminEmail) => {
    if (
      window.confirm(
        `Are you sure you want to delete this admin with email ${adminEmail}?`
      )
    ) {
      try {
        await handleDeleteAdmin(adminEmail);
        toast.success("Admin deleted successfully"); // Display success message
        handleGetAllAdmins();
      } catch (error) {
        console.error("Error occurred while deleting admin:", error);
        toast.error("Error occurred while deleting admin"); // Display error message
      }
    }
  };

  return (
    // ... same table for displaying the admins
    <div className="bg-green-500">
      <table className="min-w-full divide-y divide-pa-gray lg:mt-7">
        <thead>
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
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">
                  {index + 1}. {admin.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">
                  {admin.phone_number}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pa-gray-900">{admin.email}</div>
              </td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateAdminPassword(admin.email)}
                >
                  <Edit />
                </Button>
              </td>
              <td>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDeleteAdmin(admin.email)}
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

export default AdminList;
