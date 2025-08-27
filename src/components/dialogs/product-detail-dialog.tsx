"use client"

import { Eye, Package, Calendar, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody,
  DialogCloseButton 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  category: string
  manufacturer: string
  price: number
  stock: number
  threshold: number
  status: string
  prescriptionRequired: boolean
  sku: string
  description: string
  dosage?: string
  form?: string
  strength?: string
  activeIngredient?: string
  sideEffects?: string
  contraindications?: string
  storageInstructions?: string
  expiryDate?: string
  batchNumber?: string
}

interface ProductDetailDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
}

export function ProductDetailDialog({ open, onClose, product }: ProductDetailDialogProps) {
  if (!product) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'inactive':
        return <Badge variant="warning">Inactive</Badge>
      case 'discontinued':
        return <Badge variant="destructive">Discontinued</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { color: 'text-red-600', icon: AlertTriangle, text: 'Out of Stock' }
    } else if (product.stock <= product.threshold) {
      return { color: 'text-yellow-600', icon: AlertTriangle, text: 'Low Stock' }
    } else {
      return { color: 'text-green-600', icon: CheckCircle, text: 'In Stock' }
    }
  }

  const stockStatus = getStockStatus()
  const StockIcon = stockStatus.icon

  return (
    <Dialog open={open} onClose={onClose} size="xl">
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>{product.name}</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Product Details</p>
            </div>
          </div>
          <DialogCloseButton onClose={onClose} />
        </DialogHeader>

        <DialogBody className="max-h-[70vh] overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Product Name</label>
                      <p className="text-gray-900 font-semibold">{product.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">SKU</label>
                      <p className="text-gray-900 font-mono">{product.sku}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{product.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Manufacturer</label>
                      <p className="text-gray-900">{product.manufacturer}</p>
                    </div>
                  </div>

                  {product.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <p className="text-gray-900 mt-1 leading-relaxed">{product.description}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {product.dosage && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Dosage</label>
                        <p className="text-gray-900">{product.dosage}</p>
                      </div>
                    )}
                    {product.strength && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Strength</label>
                        <p className="text-gray-900">{product.strength}</p>
                      </div>
                    )}
                    {product.form && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Form</label>
                        <p className="text-gray-900 capitalize">{product.form}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              {(product.activeIngredient || product.sideEffects || product.contraindications || product.storageInstructions) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {product.activeIngredient && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Active Ingredient</label>
                        <p className="text-gray-900">{product.activeIngredient}</p>
                      </div>
                    )}

                    {product.sideEffects && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Side Effects</label>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-1">
                          <p className="text-orange-800 text-sm">{product.sideEffects}</p>
                        </div>
                      </div>
                    )}

                    {product.contraindications && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Contraindications</label>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-1">
                          <p className="text-red-800 text-sm">{product.contraindications}</p>
                        </div>
                      </div>
                    )}

                    {product.storageInstructions && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Storage Instructions</label>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-1">
                          <p className="text-blue-800 text-sm">{product.storageInstructions}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Compliance Information */}
              {(product.batchNumber || product.expiryDate) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance & Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {product.batchNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Batch Number</label>
                          <p className="text-gray-900 font-mono">{product.batchNumber}</p>
                        </div>
                      )}
                      {product.expiryDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                          <p className="text-gray-900">{new Date(product.expiryDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    {getStatusBadge(product.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Price</span>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Prescription</span>
                    {product.prescriptionRequired ? (
                      <Badge variant="warning" className="flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        Required
                      </Badge>
                    ) : (
                      <Badge variant="success" className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        OTC
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Stock Level</span>
                    <div className="flex items-center space-x-2">
                      <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
                      <span className={`text-sm font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Stock</span>
                      <span className="font-medium">{product.stock} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Low Stock Threshold</span>
                      <span className="font-medium">{product.threshold} units</span>
                    </div>
                  </div>

                  {/* Stock Level Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Stock Level</span>
                      <span>{product.stock} / {Math.max(product.stock, product.threshold * 2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          product.stock === 0
                            ? 'bg-red-500'
                            : product.stock <= product.threshold
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / Math.max(product.stock, product.threshold * 2)) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Product ID</span>
                      <span className="text-sm font-mono">{product.id}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm">Today</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              {(product.stock <= product.threshold || product.stock === 0) && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">
                          {product.stock === 0 ? 'Out of Stock' : 'Low Stock Alert'}
                        </h4>
                        <p className="text-sm text-yellow-800">
                          {product.stock === 0
                            ? 'This product is currently out of stock and needs immediate restocking.'
                            : `Stock level is below the threshold of ${product.threshold} units. Consider restocking soon.`
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
