import { useState } from "react";
import PaButton from "../components/button/PaButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState(""); // State for login message
  const [formSubmitted, setFormSubmitted] = useState(false); // State for form submission
  const navigate = useNavigate();

  const handleLogin = async () => {
    setFormSubmitted(true); // Mark the form as submitted

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          email,
          password,
          isAdmin,
        });

        const { token } = response.data;
        localStorage.setItem(
          "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a",
          token
        );

        // Determine the redirection path based on user role
        const redirectionPath = isAdmin ? "/admin-home" : "/teacher-home";

        // Set the success message
        setLoginMessage(response.data.message);

        setTimeout(() => {
          // Use navigate to redirect to the appropriate dashboard
          navigate(redirectionPath);
        }, 2000);
      } catch (error) {
        // Handle login failure
        setLoginMessage(
          "Invalid email or password. Please confirm your details and try again"
        );
      }
    } else {
      // If the form is submitted but fields are empty, display a required message
      setLoginMessage("Email and password are required");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-3 px-2 font-poppins bg-pa-light-gray">
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
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full max-w-xs px-4 py-2 mb-4 border ${
          formSubmitted && !email ? "border-red-500" : "border-pa-black"
        } rounded-md shadow-md focus:outline-none focus:ring`}
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full max-w-xs px-4 py-2 mb-4 border ${
          formSubmitted && !password ? "border-red-500" : "border-pa-black"
        } rounded-md shadow-md focus:outline-none focus:ring`}
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
          <span className="text-sm text-gray-600 capitalize">Login admin</span>
        </label>
      </div>
      <div className="" onClick={handleLogin}>
        <PaButton buttonName="Continue" />
      </div>
    </div>
  );
}

export default Login;
