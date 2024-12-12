import logo from '../assets/drdo_round_logo.jpg';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-custom-blue-1 to-custom-blue-2 text-white px-16 py-6 flex justify-between items-center z-10 w-full top-0 left-0 shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="DRDO Careers Logo" className="h-8" />
        <div className="text-lg font-bold">DRDO Careers</div>
      </div>
    </nav>
  );
};

export default NavBar;
