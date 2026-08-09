import { Link, type LinkProps } from '@tanstack/react-router'

export function NavLink({ children, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className="text-text-nav transition-colors hover:text-purple-deep hover:cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-purple-dark after:transition-all after:duration-300 lg:hover:after:w-full"
      activeProps={{
        className: 'lg:font-semibold lg:underline  lg:decoration-2 lg:underline-offset-7  decoration-purple-dark hover:cursor-pointer ',
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {children}
    </Link>
  )
}