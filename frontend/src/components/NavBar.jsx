import logo from '../assets/drdo_round_logo.jpg';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav className="bg-gradient-to-r from-custom-blue-1 to-custom-blue-2 text-white px-16 py-6 flex justify-between items-center z-10 w-full top-0 left-0 shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="DRDO Careers Logo" className="h-8" />
        <div className="text-lg font-bold">DRDO Careers</div>
        <div className="flex">
          <button
            onClick={() => navigate("/")}
            className="ml-4 px-6 py-2 bg-transparent rounded-md hover:bg-blue-200 hover:text-black"
          >
            Application form
          </button>
          <button
            onClick={() => navigate("/batchupload")}
            className="ml-4 px-6 py-2 bg-transparent rounded-md hover:bg-blue-200 hover:text-black"
          >
            Batch Upload
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
