import { createFileRoute } from '@tanstack/react-router'
import { Cancel } from '../../stripe/cancel';

export const Route = createFileRoute('/orderCancel')({
  component: Cancel,
})


