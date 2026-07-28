import { createFileRoute } from '@tanstack/react-router'
import { Desserts } from '../components/pages/Desserts'

export const Route = createFileRoute('/desserts')({
  component: Desserts,
})