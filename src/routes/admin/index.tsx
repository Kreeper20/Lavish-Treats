import { createFileRoute } from '@tanstack/react-router'
import { Orders } from '../../components/context/adminPage'

export const Route = createFileRoute('/admin/')({
    component: Orders,
})

