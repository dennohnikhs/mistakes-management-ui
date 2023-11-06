import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { getAuthToken } from "../../utils/get_token_key";

export const getAllAdmins = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/admins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, list_of_admins } = response.data;

    if (success) {
      return list_of_admins;
    } else {
      console.error("Failed to fetch admins. Response data:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error occurred while getting the list of admins", error);
    throw error;
  }
};
export const updateAdminPassword = async (adminEmail, newPassword) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.put(
      `${API_BASE_URL}/admin/edit/${adminEmail}`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { success, error_message } = response.data;

    if (success) {
      // Return any necessary data or success status
    } else {
      console.error("Failed to reset admin password:", error_message);
      throw new Error("Failed to reset admin password");
    }
  } catch (error) {
    console.error("Error occurred while resetting admin password:", error);
    throw error;
  }
};
export const deleteAdmin = async (adminEmail) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.delete(`${API_BASE_URL}/admin/${adminEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, error_message } = response.data;

    if (success) {
      // Return any necessary data or success status
    } else {
      console.error("Failed to delete admin:", error_message);
      throw new Error("Failed to delete admin");
    }
  } catch (error) {
    console.error("Error occurred while deleting admin:", error);
    throw error;
  }
};
