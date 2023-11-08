import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { getAuthToken } from "../../utils/get_token_key";

export const getAllStudents = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, list_of_students } = response.data;

    if (success) {
      return list_of_students;
    } else {
      console.error("Failed to fetch students. Response data:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error occurred while getting the list of students", error);
    throw error;
  }
};
export const updateStudentDetails = async (
  studentAdmissionNumber,
  newPoints
) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.put(
      `${API_BASE_URL}/student/edit/${studentAdmissionNumber}`,
      { status: newPoints },
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
      console.error("Failed to reset student password:", error_message);
      throw new Error("Failed to reset student password");
    }
  } catch (error) {
    console.error("Error occurred while resetting student password:", error);
    throw error;
  }
};
export const deleteStudent = async (studentAdmissionNumber) => {
  try {
    const token = getAuthToken();
    if (!token) {
      // Handle the case where the token is not available
      return;
    }

    const response = await axios.delete(
      `${API_BASE_URL}/student/${studentAdmissionNumber}`,
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
      console.error("Failed to delete student:", error_message);
      throw new Error("Failed to delete student");
    }
  } catch (error) {
    console.error("Error occurred while deleting student:", error);
    throw error;
  }
};
