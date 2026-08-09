import Mobilenav from "./Nav";
import { Logo } from "../../components/utils/imports";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className=" border-b border-line py-6 px-4 md:px-8 lg:px-12">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={Logo} alt="Lavish Treats Logo" className="max-w-16 block cursor-pointer" />
        </Link>
        <Mobilenav />
        <Link to="/enquiryForm" className="bg-purple-primary text-white font-medium py-2 uppercase px-4 rounded-full hover:bg-purple-dark transition duration-300 hidden lg:block">
          Order Now
        </Link>
      </div>
    </header>
  )
}