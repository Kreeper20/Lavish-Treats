import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customOrderConfirm')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">Custom Order Confirmed</h1>
        <p className="text-gray-700 mb-6">Your custom order has been successfully placed. We will contact you shortly with the details.</p>
        <a href="/" className="inline-block bg-purple-primary text-white px-6 py-2 rounded hover:bg-purple-dark transition duration-300">Return to Home</a>
      </div>
    </div>
  )
}
