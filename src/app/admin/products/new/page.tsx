"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  "Antibiotics",
  "Pain Relief", 
  "Diabetes",
  "Vitamins",
  "Cardiovascular",
  "Respiratory",
  "Dermatology",
  "Gastrointestinal",
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

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    manufacturer: "",
    price: "",
    stock: "",
    threshold: "",
    sku: "",
    prescriptionRequired: false,
    status: "active",
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

  const [images, setImages] = useState<string[]>([])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload to a server
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would send this to your API
    console.log("Creating product:", { ...formData, images })
    
    // Redirect back to products list
    router.push("/admin/products")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Create a new product in your pharmacy inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Product Information */}
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
                      required
                    />
                  </div>
                  <div>
                    <label className="medical-form-label">SKU *</label>
                    <Input
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="e.g., AMX-500-001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="medical-form-label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="medical-form-input resize-none"
                    placeholder="Brief description of the product..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="medical-form-label">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="medical-form-input"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="medical-form-label">Manufacturer *</label>
                    <select
                      value={formData.manufacturer}
                      onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                      className="medical-form-input"
                      required
                    >
                      <option value="">Select Manufacturer</option>
                      {manufacturers.map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                      ))}
                    </select>
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
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="medical-form-label">Active Ingredient</label>
                    <Input
                      value={formData.activeIngredient}
                      onChange={(e) => handleInputChange('activeIngredient', e.target.value)}
                      placeholder="e.g., Amoxicillin"
                    />
                  </div>
                  <div>
                    <label className="medical-form-label">Strength</label>
                    <Input
                      value={formData.strength}
                      onChange={(e) => handleInputChange('strength', e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div>
                    <label className="medical-form-label">Form</label>
                    <select
                      value={formData.form}
                      onChange={(e) => handleInputChange('form', e.target.value)}
                      className="medical-form-input"
                    >
                      <option value="">Select Form</option>
                      <option value="tablet">Tablet</option>
                      <option value="capsule">Capsule</option>
                      <option value="liquid">Liquid</option>
                      <option value="injection">Injection</option>
                      <option value="cream">Cream</option>
                      <option value="ointment">Ointment</option>
                      <option value="drops">Drops</option>
                      <option value="inhaler">Inhaler</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="medical-form-label">Side Effects</label>
                  <textarea
                    value={formData.sideEffects}
                    onChange={(e) => handleInputChange('sideEffects', e.target.value)}
                    rows={2}
                    className="medical-form-input resize-none"
                    placeholder="Common side effects..."
                  />
                </div>

                <div>
                  <label className="medical-form-label">Contraindications</label>
                  <textarea
                    value={formData.contraindications}
                    onChange={(e) => handleInputChange('contraindications', e.target.value)}
                    rows={2}
                    className="medical-form-input resize-none"
                    placeholder="When not to use this medication..."
                  />
                </div>

                <div>
                  <label className="medical-form-label">Storage Instructions</label>
                  <Input
                    value={formData.storageInstructions}
                    onChange={(e) => handleInputChange('storageInstructions', e.target.value)}
                    placeholder="e.g., Store in cool, dry place"
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
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="medical-form-label">Stock Quantity *</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <label className="medical-form-label">Low Stock Threshold</label>
                  <Input
                    type="number"
                    value={formData.threshold}
                    onChange={(e) => handleInputChange('threshold', e.target.value)}
                    placeholder="10"
                  />
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

                <div className="flex items-center space-x-2">
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
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="medical-form-label">Upload Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload images</p>
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="medical-form-label">Expiry Date</label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="medical-form-label">Batch Number</label>
                  <Input
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                    placeholder="e.g., BT2024001"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}
