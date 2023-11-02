import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminList() {
  // ... same states and handleGetAllAdmins function
  const [admins, setAdmins] = useState([]); // State to store the list of admins
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error

  const handleGetAllAdmins = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem(
        "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a"
      ); // Replace with your actual token key
      if (!token) {
        // Handle the case where the token is not available (e.g., user is not authenticated)
        console.error("Authentication token not available");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("List of admins:", response.data.list_of_admins);
        setAdmins(response.data.list_of_admins);
      } else {
        console.error("Failed to get admins:", response.data.error_message);
        setError(response.data.error_message);
      }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDeleteAdmin = async (adminEmail) => {
    try {
      const token = localStorage.getItem(
        "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a"
      ); // Replace with your actual token key
      if (!token) {
        // Handle the case where the token is not available (e.g., user is not authenticated)
        console.error("Authentication token not available");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/admin/${adminEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Admin deleted successfully");
        toast.success("Admin deleted successfully"); // Display success message
        handleGetAllAdmins();
      } else {
        console.error("Failed to delete admin:", response.data.error_message);
        toast.error("Failed to delete admin"); // Display error message
      }
    } catch (error) {
      console.log("Error occurred while deleting admin:", error.message);
      toast.error("Error occurred while deleting admin"); // Display error message
    }
  };
  const handleUpdateAdminPassword = async (adminEmail) => {
    const newPassword = prompt("Please enter the new password"); // Prompt the user for the new password
    if (!newPassword) {
      console.error("New password not provided");
      return;
    }

    try {
      const token = localStorage.getItem(
        "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a"
      ); // Replace with your actual token key
      if (!token) {
        console.error("Authentication token not available");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/admin/edit/${adminEmail}`,
        { password: newPassword },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Admin password reset successfully"); // Display success message
      } else {
        console.error(
          "Failed to reset admin password:",
          response.data.error_message
        );
        toast.error("Failed to reset admin password"); // Display error message
      }
    } catch (error) {
      console.log(
        "Error occurred while resetting admin password:",
        error.message
      );
      toast.error("Error occurred while resetting admin password"); // Display error message
    }
  };

  return (
    // ... same table for displaying the admins
    <div>
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
                <button
                  className="px-6 text-pa-green"
                  onClick={() => handleUpdateAdminPassword(admin.email)}
                >
                  <Edit />
                </button>
              </td>
              <td>
                <button
                  className="px-6 text-red-500"
                  onClick={() => handleDeleteAdmin(admin.email)}
                >
                  <Trash2 />
                </button>
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
