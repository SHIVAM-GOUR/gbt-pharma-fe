"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Shield, 
  Truck, 
  Clock,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  CheckCircle,
  Upload
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchProductById } from "@/store/slices/productsSlice"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/authSlice"
import { formatPrice } from "@/lib/utils"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentProduct: product, loading } = useAppSelector((state) => state.products)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState("description")
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null)

  const productId = params.id as string

  useEffect(() => {
    if (productId) {
      console.log('Fetching product with ID:', productId)
      dispatch(fetchProductById(productId))
    }
  }, [dispatch, productId])

  // Debug logging
  useEffect(() => {
    console.log('Product state:', { product, loading, productId })
  }, [product, loading, productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const isInWishlist = user?.wishlist?.includes(product?.id || '') || false

  const handleAddToCart = () => {
    if (!product) return

    dispatch(addToCart({
      product,
      quantity,
      prescriptionFile: prescriptionFile ? URL.createObjectURL(prescriptionFile) : undefined
    }))
  }

  const handleWishlistToggle = () => {
    if (!isAuthenticated || !product) return

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product.id))
    }
  }

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPrescriptionFile(file)
    }
  }

  const tabs = [
    { id: "description", label: "Description" },
    { id: "dosage", label: "Dosage & Usage" },
    { id: "ingredients", label: "Ingredients" },
    { id: "warnings", label: "Warnings" },
    { id: "reviews", label: "Reviews" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Button variant="ghost" size="sm" onClick={() => router.push("/products")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
            <span>/</span>
            <span>{product?.category || 'Category'}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name || 'Product'}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                    <span className="text-4xl font-bold text-primary">Rx</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-700">{product.name}</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="trust" className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  FDA Approved
                </Badge>
                <Badge variant="success" className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Quality Assured
                </Badge>
                {!product.prescriptionRequired && (
                  <Badge variant="info" className="flex items-center">
                    <Info className="w-3 h-3 mr-1" />
                    Over-the-Counter
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
                  {product?.name || 'Product Name'}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{product?.shortDescription || 'Product description'}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product?.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product?.rating || 0} ({product?.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product?.price || 0)}
                </span>
                {product?.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product?.onSale && product?.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
                <div>
                  <span className="text-sm text-gray-600">Strength</span>
                  <p className="font-semibold">{product?.strength || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Form</span>
                  <p className="font-semibold capitalize">{product?.form || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Manufacturer</span>
                  <p className="font-semibold">{product?.manufacturer || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Stock</span>
                  <p className={`font-semibold ${product?.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product?.inStock ? `${product?.stockQuantity || 0} available` : 'Out of stock'}
                  </p>
                </div>
              </div>

              {/* Prescription Upload */}
              {product?.prescriptionRequired && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900 mb-2">Prescription Required</h4>
                        <p className="text-sm text-orange-800 mb-3">
                          This medicine requires a valid prescription. Please upload your prescription to proceed.
                        </p>
                        <div className="flex items-center space-x-3">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handlePrescriptionUpload}
                            className="hidden"
                            id="prescription-upload"
                          />
                          <label htmlFor="prescription-upload">
                            <Button variant="outline" size="sm" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Prescription
                            </Button>
                          </label>
                          {prescriptionFile && (
                            <span className="text-sm text-green-600">
                              ✓ {prescriptionFile.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= (product?.stockQuantity || 0)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product?.inStock || (product?.prescriptionRequired && !prescriptionFile)}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlistToggle}
                    className={isInWishlist ? 'text-red-600 border-red-600' : ''}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Free delivery on orders over $50
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Same-day delivery available
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex space-x-1 border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                        selectedTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {selectedTab === "description" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Indications</h4>
                        <ul className="space-y-1">
                          {product.indications.map((indication, index) => (
                            <li key={index} className="text-gray-600 flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              {indication}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          <li className="text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            FDA Approved
                          </li>
                          <li className="text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Quality Tested
                          </li>
                          <li className="text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            {product.prescriptionRequired ? 'Prescription Medicine' : 'Over-the-Counter'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "dosage" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Dosage & Usage Instructions</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommended Dosage</h4>
                      <p className="text-blue-800">{product.dosageInstructions}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Storage Instructions</h4>
                      <p className="text-gray-600">{product.storageInstructions}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
                      <ul className="text-yellow-800 space-y-1">
                        <li>• Always follow the prescribed dosage</li>
                        <li>• Do not exceed the recommended dose</li>
                        <li>• Consult your doctor if symptoms persist</li>
                        <li>• Keep out of reach of children</li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedTab === "ingredients" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active Ingredients</h3>
                    <div className="space-y-3">
                      {product.activeIngredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{ingredient}</span>
                          <Badge variant="outline">{product.strength}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Batch Number:</span>
                          <p className="font-mono">{product.batchNumber}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Approval Number:</span>
                          <p className="font-mono">{product.approvalNumber}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Expiry Date:</span>
                          <p>{new Date(product.expiryDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Age Group:</span>
                          <p className="capitalize">{product.ageGroup}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "warnings" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Warnings & Precautions</h3>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Contraindications
                      </h4>
                      <ul className="text-red-800 space-y-1">
                        {product.contraindications.map((contraindication, index) => (
                          <li key={index}>• {contraindication}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Possible Side Effects</h4>
                      <ul className="text-orange-800 space-y-1">
                        {product.sideEffects.map((sideEffect, index) => (
                          <li key={index}>• {sideEffect}</li>
                        ))}
                      </ul>
                    </div>

                    {product.pregnancyCategory && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Pregnancy Category</h4>
                        <p className="text-purple-800">
                          Category {product.pregnancyCategory} - Consult your healthcare provider if you are pregnant or planning to become pregnant.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
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
                          {product.rating} out of 5 ({product.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="text-center py-12 text-gray-500">
                      <p>Reviews will be displayed here in the full implementation.</p>
                      <p className="text-sm mt-2">This would include individual customer reviews, ratings, and feedback.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
