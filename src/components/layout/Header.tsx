import Mobilenav from "./Nav";
import logo from "../../assets/hero.png";

export const Navbar = () => {
  return (
    <header className="flex p-4 items-center justify-between border-b border-line">
        <img src={logo} alt="Lavish Treats Logo" className="w-12 h-12 ml-6 block cursor-pointer" />
        <Mobilenav />
    </header>
  )
}