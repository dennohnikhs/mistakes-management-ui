import { useState } from "react";
import PaButton from "../components/button/PaButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState(""); // State for login message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
        isAdmin,
      });
      // console.log(response.data);
      // Extract the token from the response
      const { token } = response.data;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem(
        "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a",
        token
      );
      // Set the success message
      setLoginMessage(response.data.message);
      // Redirect or perform actions for successful login
      // Determine the redirection path based on user role
      setTimeout(() => {
        const redirectionPath = isAdmin ? "/admin-home" : "/teacher-home";

        // Use navigate to redirect to the appropriate dashboard
        navigate(redirectionPath);
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure, display an error message, etc.
      // Set the error message
      // setLoginMessage(error.data.message);
      setLoginMessage(
        "Invalid email or password. Please confirm your details and try again"
      );
    }
    // Clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-3 px-2 font-poppins">
      {/* Display the login message */}
      {loginMessage && (
        <h1
          className={
            loginMessage.includes("success")
              ? "text-green-500 pb-3"
              : "text-red-500 pb-3"
          }
        >
          {loginMessage}
        </h1>
      )}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-xs px-4 py-2 mb-4 border border-pa-black rounded-md shadow-md focus:outline-none focus:ring "
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-xs px-4 py-2 mb-4 border border-pa-black rounded-md shadow-md focus:outline-none focus:ring "
      />

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="loginType"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            className="w-5 h-5 rounded-md "
          />
          <span className="text-sm text-gray-600 capitalize">login admin</span>
        </label>
      </div>
      <div className="" onClick={handleLogin}>
        <PaButton buttonName="Continue" />
      </div>
    </div>
  );
}

export default Login;
