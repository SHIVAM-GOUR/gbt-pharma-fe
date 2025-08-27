"use client"

import { useState, useEffect } from "react"
import { Save, X } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter,
  DialogCloseButton 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface EditProductDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
  onSave: (product: Product) => void
}

const categories = [
  "Pain Relief",
  "Antibiotics", 
  "Vitamins & Supplements",
  "Heart & Blood Pressure",
  "Diabetes Care",
  "Respiratory",
  "Digestive Health",
  "Skin Care",
  "Mental Health",
  "Women's Health"
]

const manufacturers = [
  "PharmaCorp",
  "MediPharm", 
  "DiabetesCare",
  "VitaHealth",
  "HeartMed",
  "RespiCare",
  "DermaTech",
  "GastroMed",
  "MindHealth",
  "WomenCare"
]

const forms = ["tablet", "capsule", "syrup", "injection", "cream", "drops", "inhaler"]

export function EditProductDialog({ open, onClose, product, onSave }: EditProductDialogProps) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    manufacturer: "",
    price: 0,
    stock: 0,
    threshold: 0,
    status: "active",
    prescriptionRequired: false,
    sku: "",
    description: "",
    dosage: "",
    form: "",
    strength: "",
    activeIngredient: "",
    sideEffects: "",
    contraindications: "",
    storageInstructions: "",
    expiryDate: "",
    batchNumber: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData(product)
      setErrors({})
    }
  }, [product])

  const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.manufacturer) newErrors.manufacturer = "Manufacturer is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative"
    if (formData.threshold < 0) newErrors.threshold = "Threshold cannot be negative"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  if (!product) return null

  return (
    <Dialog open={open} onClose={handleClose} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogCloseButton onClose={handleClose} />
        </DialogHeader>

        <DialogBody className="max-h-[70vh] overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="medical-form-label">Product Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g., Amoxicillin 500mg"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="medical-form-label">SKU *</label>
                      <Input
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        placeholder="e.g., AMX-500-001"
                        className={errors.sku ? 'border-red-500' : ''}
                      />
                      {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="medical-form-label">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Product description..."
                      className="medical-form-input min-h-[100px] resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="medical-form-label">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`medical-form-input ${errors.category ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                    <div>
                      <label className="medical-form-label">Manufacturer *</label>
                      <select
                        value={formData.manufacturer}
                        onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                        className={`medical-form-input ${errors.manufacturer ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Manufacturer</option>
                        {manufacturers.map(mfg => (
                          <option key={mfg} value={mfg}>{mfg}</option>
                        ))}
                      </select>
                      {errors.manufacturer && <p className="text-red-500 text-sm mt-1">{errors.manufacturer}</p>}
                    </div>
                    <div>
                      <label className="medical-form-label">Form</label>
                      <select
                        value={formData.form || ""}
                        onChange={(e) => handleInputChange('form', e.target.value)}
                        className="medical-form-input"
                      >
                        <option value="">Select Form</option>
                        {forms.map(form => (
                          <option key={form} value={form}>{form}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="medical-form-label">Dosage</label>
                      <Input
                        value={formData.dosage || ""}
                        onChange={(e) => handleInputChange('dosage', e.target.value)}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <label className="medical-form-label">Strength</label>
                      <Input
                        value={formData.strength || ""}
                        onChange={(e) => handleInputChange('strength', e.target.value)}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="medical-form-label">Active Ingredient</label>
                    <Input
                      value={formData.activeIngredient || ""}
                      onChange={(e) => handleInputChange('activeIngredient', e.target.value)}
                      placeholder="e.g., Amoxicillin"
                    />
                  </div>

                  <div>
                    <label className="medical-form-label">Side Effects</label>
                    <textarea
                      value={formData.sideEffects || ""}
                      onChange={(e) => handleInputChange('sideEffects', e.target.value)}
                      placeholder="List potential side effects..."
                      className="medical-form-input min-h-[80px] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="medical-form-label">Contraindications</label>
                    <textarea
                      value={formData.contraindications || ""}
                      onChange={(e) => handleInputChange('contraindications', e.target.value)}
                      placeholder="List contraindications..."
                      className="medical-form-input min-h-[80px] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="medical-form-label">Storage Instructions</label>
                    <Input
                      value={formData.storageInstructions || ""}
                      onChange={(e) => handleInputChange('storageInstructions', e.target.value)}
                      placeholder="e.g., Store below 25°C"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing & Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="medical-form-label">Price ($) *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="medical-form-label">Stock Quantity *</label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className={errors.stock ? 'border-red-500' : ''}
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                  </div>

                  <div>
                    <label className="medical-form-label">Low Stock Threshold *</label>
                    <Input
                      type="number"
                      value={formData.threshold}
                      onChange={(e) => handleInputChange('threshold', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className={errors.threshold ? 'border-red-500' : ''}
                    />
                    {errors.threshold && <p className="text-red-500 text-sm mt-1">{errors.threshold}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Product Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="medical-form-label">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="medical-form-input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="prescriptionRequired"
                      checked={formData.prescriptionRequired}
                      onChange={(e) => handleInputChange('prescriptionRequired', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="prescriptionRequired" className="text-sm font-medium text-gray-700">
                      Prescription Required
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="medical-form-label">Batch Number</label>
                      <Input
                        value={formData.batchNumber || ""}
                        onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                        placeholder="e.g., BT2024001"
                      />
                    </div>
                    <div>
                      <label className="medical-form-label">Expiry Date</label>
                      <Input
                        type="date"
                        value={formData.expiryDate || ""}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
