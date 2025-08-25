"use client"

import Link from "next/link"
import { Star, ShoppingCart, Heart, Shield, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/authSlice"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  const isInWishlist = user?.wishlist?.includes(product.id) || false

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product.id))
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ))
  }

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <Link href={`/products/${product.id}`} className="flex">
            {/* Image */}
            <div className="w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-md">
                  <span className="text-lg font-bold text-primary">Rx</span>
                </div>
                <p className="text-gray-600 text-sm font-medium">{product.name}</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.onSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                    {product.featured && <Badge variant="warning" className="text-xs">Featured</Badge>}
                    {!product.prescriptionRequired && <Badge variant="success" className="text-xs">OTC</Badge>}
                  </div>

                  {/* Title and Info */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Dosage & Form */}
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-xs">{product.strength}</Badge>
                    <Badge variant="outline" className="text-xs capitalize">{product.form}</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{product.ageGroup}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="text-right ml-6">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {product.inStock ? (
                      <Badge variant="success" className="text-xs">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleWishlistToggle}
                        className={`flex-1 ${isInWishlist ? 'text-red-600 border-red-600' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/products/${product.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prescription Warning */}
              {product.prescriptionRequired && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning font-medium">
                      Prescription Required - Upload prescription during checkout
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/products/${product.id}`}>
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
            {product.onSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
            {product.featured && <Badge variant="warning" className="text-xs">Featured</Badge>}
            {!product.prescriptionRequired && <Badge variant="success" className="text-xs">OTC</Badge>}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white ${
              isInWishlist ? 'text-red-600' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full"
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
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{product.shortDescription}</p>
          </div>

          {/* Dosage & Form */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">{product.strength}</Badge>
            <Badge variant="outline" className="text-xs capitalize">{product.form}</Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
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
              <Badge variant="success" className="text-xs">In Stock</Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
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
      </Link>
    </Card>
  )
}
