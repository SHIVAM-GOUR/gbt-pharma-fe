import { Hero } from "@/components/sections/hero"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { Categories } from "@/components/sections/categories"
import { TrustSafety } from "@/components/sections/trust-safety"

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <TrustSafety />
    </div>
  )
}
