import { Link } from "@tanstack/react-router"
import { Logo } from "../utils/imports"
import { IconBrandInstagram, IconBrandWhatsapp, IconMail, } from "@tabler/icons-react"
import { TAndCModal } from "../ui/T&Cmodal"
import { useState } from "react"

const linkStyle =
  "text-text-dim font-extralight hover:text-purple-light transition duration-300 ease-in-out"
const iconStyle =
  "text-white hover:text-purple-light transition duration-300 ease-in-out"

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lavishtreats_/",
    Icon: IconBrandInstagram,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/message/2JTPML3URTPUE1",
    Icon: IconBrandWhatsapp,
    external: true,
  },
  {
    label: "Email us",
    href: "mailto:info@lavishtreats.co.uk",
    Icon: IconMail,
    external: false,
  },
]

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Our Menu",
    links: [
      { to: "/cakes", label: "Celebration Cakes" },
      { to: "/shop", label: "Shop" },
    ],
  },
  {
    title: "Explore",
    links: [{ to: "/gallery", label: "Gallery" }, 
      { to: "/custom-order", label: "Custom Order" }],
  },
]

export const Footer = () => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    setEmail(form.get("email") as string);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })

    const error = await res.text();
    if (!res.ok) {
      console.error(error);
      return;
    }

    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="bg-purple-deep w-full  border-t border-purple-light/30">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 items-center">
          <div>
            <img
              src={Logo}
              alt="Lavish Treats logo"
              className="max-w-22 bg-white rounded-2xl p-2"
            />
            <h2 className="text-white font-serif text-2xl font-semibold mt-4">
              Lavish Treats
            </h2>
            <p className="text-text-dim font-extralight mt-2 max-w-xs">
              Lavish Treats is a bakery that specializes in custom cakes and
              pastries.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <Icon className={iconStyle} size={25} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-8 md:flex-row md:justify-between"
          >
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-white">
                  {group.title}
                </h3>
                <ul className="mt-2 flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className={linkStyle}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:ml-auto">
            <h3 className="text-lg font-semibold text-white">
              Subscribe to our newsletter
            </h3>
            <p className="text-text-dim font-extralight mt-2 max-w-xs">
              Get the latest updates on new products and special offers.
            </p>

            {subscribed ? (
              <p role="status" className="mt-3 text-purple-light">
                Thanks for subscribing!!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-3 flex max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 px-4 py-2 rounded-l-md bg-white text-gray-900 border border-purple-light focus:outline-none focus:ring-2 focus:ring-purple-light focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-purple-primary text-white px-4 py-2 rounded-r-md hover:bg-purple-light transition duration-300 ease-in-out"
                >
                  Subscribe
                </button>
              </form>

            )}
          </div>
        </div>
      </div>

      <div className="border-t border-purple-light/30 ">
        <div className="px-8 py-6 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between mx-auto max-w-7xl">
          <p className="text-text-dim font-extralight">
            &copy; {new Date().getFullYear()} Lavish Treats. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-text-dim font-extralight hover:text-purple-light transition duration-300 ease-in-out cursor-pointer"
          >
            Terms of Service | Privacy Policy
          </button>
        </div>

        <TAndCModal showModal={showModal} onClose={() => setShowModal(false)} />
      </div>
    </footer>
  )
}