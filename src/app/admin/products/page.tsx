"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddProductDialog } from "@/components/dialogs/add-product-dialog"
import { EditProductDialog } from "@/components/dialogs/edit-product-dialog"
import { ProductDetailDialog } from "@/components/dialogs/product-detail-dialog"
import { DeleteConfirmationDialog } from "@/components/dialogs/delete-confirmation-dialog"
import { formatPrice } from "@/lib/utils"

// Mock data - in real app this would come from API
const products = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    manufacturer: "PharmaCorp",
    price: 24.99,
    stock: 150,
    threshold: 20,
    status: "active",
    prescriptionRequired: true,
    image: "/api/placeholder/100/100",
    sku: "AMX-500-001",
    description: "Broad-spectrum antibiotic for bacterial infections"
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    manufacturer: "MediPharm",
    price: 12.50,
    stock: 5,
    threshold: 25,
    status: "active",
    prescriptionRequired: false,
    image: "/api/placeholder/100/100",
    sku: "IBU-200-002",
    description: "Non-steroidal anti-inflammatory drug"
  },
  {
    id: 3,
    name: "Metformin 500mg",
    category: "Diabetes",
    manufacturer: "DiabetesCare",
    price: 32.00,
    stock: 75,
    threshold: 30,
    status: "active",
    prescriptionRequired: true,
    image: "/api/placeholder/100/100",
    sku: "MET-500-003",
    description: "Type 2 diabetes medication"
  },
  {
    id: 4,
    name: "Vitamin D3 1000IU",
    category: "Vitamins",
    manufacturer: "VitaHealth",
    price: 18.75,
    stock: 200,
    threshold: 50,
    status: "active",
    prescriptionRequired: false,
    image: "/api/placeholder/100/100",
    sku: "VIT-D3-004",
    description: "Essential vitamin supplement"
  },
  {
    id: 5,
    name: "Lisinopril 10mg",
    category: "Cardiovascular",
    manufacturer: "HeartMed",
    price: 28.50,
    stock: 8,
    threshold: 25,
    status: "active",
    prescriptionRequired: true,
    image: "/api/placeholder/100/100",
    sku: "LIS-10-005",
    description: "ACE inhibitor for hypertension"
  }
]

const categories = ["All", "Antibiotics", "Pain Relief", "Diabetes", "Vitamins", "Cardiovascular"]
const statusOptions = ["All", "Active", "Inactive", "Low Stock"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || 
                         (selectedStatus === "Active" && product.status === "active") ||
                         (selectedStatus === "Inactive" && product.status === "inactive") ||
                         (selectedStatus === "Low Stock" && product.stock <= product.threshold)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Dialog handlers
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    setShowDetailDialog(true)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowEditDialog(true)
  }

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setShowDeleteDialog(true)
  }

  const handleAddProduct = (productData: any) => {
    // In real app, this would call an API
    console.log("Adding product:", productData)
    // Add to products array or refresh from API
  }

  const handleSaveProduct = (productData: any) => {
    // In real app, this would call an API
    console.log("Saving product:", productData)
    // Update products array or refresh from API
  }

  const handleConfirmDelete = async (productId: number) => {
    setIsDeleting(true)
    try {
      // In real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Deleting product:", productId)
      // Remove from products array or refresh from API
      setShowDeleteDialog(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (stock <= threshold) return { label: "Low Stock", variant: "warning" as const }
    return { label: "In Stock", variant: "success" as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your pharmacy inventory and product catalog</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.map((product, index) => {
          const stockStatus = getStockStatus(product.stock, product.threshold)
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                          
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                            {product.prescriptionRequired && (
                              <Badge variant="secondary">Prescription Required</Badge>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                          <p className="text-xs text-gray-500">Threshold: {product.threshold}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Manufacturer:</span>
                          <span className="text-sm font-medium">{product.manufacturer}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewProduct(product)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {product.stock <= product.threshold && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                            <span className="text-sm text-yellow-800">
                              Low stock warning: Only {product.stock} units remaining
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "All" || selectedStatus !== "All"
                ? "Try adjusting your search criteria or filters"
                : "Get started by adding your first product"
              }
            </p>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {products.filter(p => p.stock > p.threshold).length}
            </p>
            <p className="text-sm text-gray-600">In Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.stock <= p.threshold && p.stock > 0).length}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Components */}
      <AddProductDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddProduct}
      />

      <EditProductDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <ProductDetailDialog
        open={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        product={selectedProduct}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
