import { Link, type LinkProps } from '@tanstack/react-router'

export function NavLink({ children, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className="text-purple-deep transition-colors hover:text-purple-dark"
      activeProps={{
        className: 'lg:font-semibold lg:underline  lg:decoration-2 lg:underline-offset-4 decoration-purple-deep',
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {children}
    </Link>
  )
}