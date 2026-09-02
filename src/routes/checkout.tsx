import { createFileRoute } from '@tanstack/react-router'
import { Checkout } from '../components/pages/Checkout'

export const Route = createFileRoute('/checkout')({
  component: Checkout,
})
