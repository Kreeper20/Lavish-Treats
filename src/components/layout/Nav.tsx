import { useEffect, useState, } from 'react'
import { NavLink } from './Navlink'
import { Link } from '@tanstack/react-router'
import { IconChevronDownFilled, IconShoppingBag } from '@tabler/icons-react'
import { Button } from 'react-bootstrap'
import { UseShoppingCart } from '../context/ShoppingCartContext'
import { FlyoutLink } from './flyout'



export const Nav = () => {

    return (

        <nav className="flex flex-col items-start gap-3 lg:gap-6 font-serif text-2xl font-medium text-purple-dark lg:flex-row lg:items-center lg:text-lg divider-x lg:divide-line lg:divide-opacity-50">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>

            <div className="flex justify-start">
                <FlyoutLink FlyoutContent={PricingContent}  >
                    <NavLink to="/cakes">
                        Celebration Cakes <IconChevronDownFilled className="w-4 h-4 inline-block" />
                    </NavLink>
                    <Link to="/custom-order" className="block lg:hidden px-4 py-2 text-text-body text-base hover:bg-gray-100">
                        Custom Order
                    </Link>
                </FlyoutLink>
            </div>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>

    )
}
const PricingContent = () => {
    return (
        <Link to="/custom-order" className="block px-4 py-2 text-text-body text-base hover:bg-gray-100">
            Custom Order
        </Link>
    );
};



const Mobilenav = () => {
    const [isOpen, setIsOpen] = useState(false)


    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

    const closeMenu = () => {
        setIsOpen(false)
    };


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const { openCart, cartQuantity } = UseShoppingCart();

    return (
        <>
            <nav >
                <div className="relative w-full pr-6 md:pr-12 flex justify-end">
                    <div className="justify-between gap-6 hidden lg:flex">
                        <Nav />
                    </div>
                    <div className="lg:hidden mr-6">

                        <Button
                            onClick={openCart}
                            style={{ width: "3rem", height: "3rem", position: "relative" }}
                            variant="outline-primary"
                            className="rounded-full border items-center justify-center flex hover:bg-purple-mid hover:text-white transition delay-100 duration-300 ease-in-out"
                        >
                            <IconShoppingBag className="w-6 h-6" />
                            {cartQuantity > 0 && (
                                <span
                                    className="rounded-full bg-purple-mid flex justify-center items-center"
                                    style={{
                                        color: "white",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        transform: "translate(25%, 25%)",
                                    }}
                                >
                                    {cartQuantity}
                                </span>
                            )}
                        </Button>
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
                    className={`fixed inset-x-0 top-28 bottom-0 z-40 bg-purple-deep/85 transition-opacity lg:hidden duration-300 ${isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                        }`}
                    onClick={closeMenu}
                >
                    <div
                        className={`fixed right-0 top-28 bottom-0 z-50 flex w-full max-w-fit flex-col bg-lilac-50 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        onClick={closeMenu}
                    >
                        <Nav />

                        
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Mobilenav;