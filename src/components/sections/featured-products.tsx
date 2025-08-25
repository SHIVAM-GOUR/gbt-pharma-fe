"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Star, ShoppingCart, Heart, Shield } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchFeaturedProducts } from "@/store/slices/productsSlice"
import { addToCart } from "@/store/slices/cartSlice"
import { formatPrice } from "@/lib/utils"

export function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { featuredProducts, loading } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  if (loading) {
    return (
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Featured <span className="text-primary">Medicines</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          ))}
        </div>
      </Section>
    )
  }

  return (
    <Section padding="xl" background="muted">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Featured <span className="text-primary">Medicines</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most trusted and popular medicines, carefully selected 
            for their quality, effectiveness, and safety.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                      <span className="text-2xl font-bold text-primary">Rx</span>
                    </div>
                    <p className="text-gray-600 font-medium">{product.name}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.onSale && (
                    <Badge variant="destructive" className="text-xs">
                      Sale
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="warning" className="text-xs">
                      Featured
                    </Badge>
                  )}
                  {!product.prescriptionRequired && (
                    <Badge variant="success" className="text-xs">
                      OTC
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>

                {/* Quick Add to Cart */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Product Info */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.shortDescription}</p>
                </div>

                {/* Dosage & Form */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {product.strength}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {product.form}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {product.inStock ? (
                    <Badge variant="success" className="text-xs">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Prescription Required */}
                {product.prescriptionRequired && (
                  <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-warning" />
                      <span className="text-xs text-warning font-medium">
                        Prescription Required
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Products CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button size="lg" variant="outline" asChild className="group">
          <Link href="/products">
            View All Medicines
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  )
}
