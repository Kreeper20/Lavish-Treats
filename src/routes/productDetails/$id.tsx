import { createFileRoute } from '@tanstack/react-router'
import { ProductDetails } from '../../components/pages/ProductDetails'

export const Route = createFileRoute("/productDetails/$id")({
  component: ProductDetails,
});

