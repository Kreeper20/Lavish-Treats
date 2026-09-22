import { createFileRoute } from '@tanstack/react-router'
import { Checkout } from '../components/cart/Checkout'

export const Route = createFileRoute('/checkout')({
  component: Checkout,
})
