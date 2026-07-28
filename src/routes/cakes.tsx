import { createFileRoute } from '@tanstack/react-router'
import { Cakes } from '../components/pages/Cakes'

export const Route = createFileRoute('/cakes')({
  component: Cakes,
})