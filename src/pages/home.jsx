import PaButton from "../components/button/PaButton";
import schoolLogoImage from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-3 px-2 font-poppins">
      <div>
        <img src={schoolLogoImage} alt="logo" className="h-auto w-auto" />
      </div>
      <div className="text-center pb-5">
        <h1 className="text-3xl  capitalize font-aushan">
          carlifonia schools mistakes management system
        </h1>
      </div>
      <p className="pb-4"> Please log in to continue.</p>
      <div className="flex flex-col gap-5" onClick={handleLoginClick}>
        <PaButton onClick={handleLoginClick} buttonName="Login" />
      </div>
    </div>
  );
}

export default HomePage;
