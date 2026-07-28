import { createFileRoute } from '@tanstack/react-router'
import { Pastries } from '../components/pages/Pastries'

export const Route = createFileRoute('/pastries')({
  component: Pastries,
})
