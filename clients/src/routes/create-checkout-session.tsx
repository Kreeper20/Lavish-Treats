import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-checkout-session')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create-checkout-session"!</div>
}
