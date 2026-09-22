import { Link } from "@tanstack/react-router"
import { Logo } from "../utils/imports"
import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from "@tabler/icons-react"
import { TAndCModal } from "../ui/T&Cmodal"
import { useState } from "react"


const linkStyle = "text-text-dim font-extralight hover:text-purple-light transition duration-300 ease-in-out block"
const iconStly = "text-white mt-4 hover:text-purple-light transition duration-300 ease-in-out cursor-pointer"

export const Footer = () => {
      const [showModal, setShowModal] = useState(false);
  
  return (
    <footer className="border-t items-center bg-purple-deep w-full ">
      <div className="mx-auto max-w-6xl py-12 px-8">
        <div className="items-center grid grid-cols-1 md:grid-cols-2">
          <div>
            <img src={Logo} alt="Lavish Treats Logo" className="max-w-22 block bg-white rounded-2xl p-2" />
            <h1 className="text-white font-serif text-2xl font-semibold mt-4">Lavish Treats</h1>
            <p className="text-text-dim font-extralight mt-2 max-w-xs">Lavish Treats is a bakery that specializes in custom cakes and pastries.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/lavishtreats_/" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram className={iconStly} size={25} stroke={1.5} />
              </a>
              <a href="https://api.whatsapp.com/message/2JTPML3URTPUE1" target="_blank" rel="noopener noreferrer">
                <IconBrandWhatsapp className={iconStly} size={25} stroke={1.5} />
              </a>
              <a href="mailto:lavishtreats.24@gmail.com" target="_blank" rel="noopener noreferrer">
                <IconMail className={iconStly} size={25} stroke={1.5} />
              </a>
            </div>
          </div>

          <div className=" flex gap-8 flex-col md:flex-row justify-between mt-8 md:mt-0">
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="text-text-dim font-extralight flex flex-col gap-2 mt-2">
                <Link to={"/"} className={linkStyle}>Home</Link>
                <Link to={"/about"} className={linkStyle}>About Us</Link>
                <Link to={"/contact"} className={linkStyle}>Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Our Menu</h3>
              <div className="text-text-dim font-extralight flex flex-col gap-2 mt-2">
                <Link to={"/cakes"} className={linkStyle}>Celebration Cakes</Link>
                <Link to={"/shop"} className={linkStyle}>Shop</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Explore</h3>
              <div className="text-text-dim font-extralight flex flex-col gap-2 mt-2">
                <Link to={"/gallery"} className={linkStyle}>Gallery</Link>
                <Link to={"/contact"} className={linkStyle}>Contact</Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="text-center py-2 border-t border-purple-light pt-6 items-center flex flex-col md:flex-row justify-around">
        <p className="text-text-dim font-extralight">
          &copy; {new Date().getFullYear()} Lavish Treats. All rights reserved.
        </p>    
        <p className="text-text-dim font-extralight hover:text-purple-light" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
           Terms of Service | Privacy Policy
        </p>
      </div>
               <TAndCModal showModal={showModal} onClose={() => setShowModal(false)} />

    </footer>
  )
}