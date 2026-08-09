import { createFileRoute } from '@tanstack/react-router'
import { EnquiryForm } from '../components/pages/EnquiryForm'

export const Route = createFileRoute('/enquiryForm')({
  component: EnquiryForm,
})
