import { createFileRoute } from '@tanstack/react-router'
import {IconShoppingBagCheck} from '@tabler/icons-react'

export const Route = createFileRoute('/orderConfirm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <IconShoppingBagCheck className="mx-auto text-green-500" size={64} />
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-700 mb-4">Thank you for your order. We will contact you soon with a follow up about your order.</p>
        <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
      </div>
    </div>
}
