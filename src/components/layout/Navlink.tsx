import { Link, type LinkProps } from '@tanstack/react-router'


export function NavLink({ children, ...props }: LinkProps) {
    const navLinkClassName = "hover:bg-transparent hover:shadow-2xs  hover:shadow-purple-mid/40 transition-shadow duration-300 rounded-lg px-4 py-2 lg:px-2 lg:py-1 lg:block text-purple-dark hover:text-purple-primary"
    const activeNavLinkClassName = "bg-transparent shadow-2xs font-normal shadow-gold  transition-shadow duration-300 rounded-lg px-4 py-2 lg:px-2 lg:py-1 text-purple-primary"
    
  return (
    <Link
      {...props}
      className={navLinkClassName }
      activeProps={{
        className: `${activeNavLinkClassName}`,
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {children}
    </Link>
  )
}