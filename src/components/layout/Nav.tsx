import { useState, } from 'react'
import { NavLink } from '../utils/Navlink'

export const Nav = () => {


    return (
        <nav className="flex flex-col font-serif font-medium text-2xl lg:text-lg lg:flex-row gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/cakes">Celebration Cakes</NavLink>
            <NavLink to="/pastries">Pastries</NavLink>
            <NavLink to="/desserts">Desserts</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    )
}

const Mobilenav = () => {
    const [isOpen, setIsOpen] = useState(false)


    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };


    return (
        <>
            <nav >
                <div className="relative w-full pr-6 md:pr-12 flex justify-end">
                    <div className="justify-between gap-6 hidden lg:flex">
                        <Nav />
                    </div>
                    <div className="lg:hidden mt-2">
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col gap-1.5 p-2"
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-purple-deep transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-purple-deep transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-purple-deep transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
                <div
                    className={`absolute ml-auto right-0.5 overflow-hidden bg-white divide-y divide-line border-line lg:hidden transition-all duration-300 ease-linear ${isOpen ? 'max-w-2xl opacity-100 px-8 py-4 gap-4' : 'max-w-0 opacity-0 px-8 py-0 gap-0'
                        }`}
                >
                    <Nav />
                </div>


            </nav>

        </>

    )
}

export default Mobilenav;