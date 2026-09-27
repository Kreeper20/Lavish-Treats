import { createFileRoute } from '@tanstack/react-router'
import { Success } from '../../stripe/success';

export const Route = createFileRoute('/orderConfirm')({
  component: Success,
})


