import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { getAuthToken } from "../../utils/get_token_key";
import { toast } from "react-toastify";

export const getTeachers = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/teachers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, list_of_teachers } = response.data;

    if (success) {
      return list_of_teachers;
    } else {
      console.error("Failed to fetch teachers. Response data:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error occurred while getting teachers", error);
    throw error;
  }
};
export const updateTeacherPassword = async (teacherEmail, newPassword) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.put(
      `${API_BASE_URL}/teacher/edit/${teacherEmail}`,
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
      console.error("Failed to reset teacher password:", error_message);
      throw new Error("Failed to reset teacher password");
    }
  } catch (error) {
    console.error("Error occurred while resetting teacher password:", error);
    throw error;
  }
};
export const deleteTeacher = async (teacherEmail) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.delete(
      `${API_BASE_URL}/teacher/${teacherEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { success, error_message } = response.data;

    if (success) {
      // Return any necessary data or success status
      toast.success("teacher deleted successfully"); // Display success message
    } else {
      console.error("Failed to delete teacher:", error_message);
      throw new Error("Failed to delete teacher");
    }
  } catch (error) {
    console.error("Error occurred while deleting teacher:", error);
    throw error;
  }
};
