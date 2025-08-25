"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductFilters as ProductFiltersType } from "@/lib/types"

interface ProductFiltersProps {
  onFilterChange: (filters: Partial<ProductFiltersType>) => void
}

const categories = [
  { id: "pain-relief", name: "Pain Relief", count: 150 },
  { id: "antibiotics", name: "Antibiotics", count: 89 },
  { id: "vitamins", name: "Vitamins & Supplements", count: 200 },
  { id: "heart-health", name: "Heart Health", count: 75 },
  { id: "diabetes", name: "Diabetes Care", count: 65 },
  { id: "respiratory", name: "Respiratory", count: 95 },
  { id: "digestive", name: "Digestive Health", count: 110 },
  { id: "skincare", name: "Skin Care", count: 85 },
]

const manufacturers = [
  { id: "olwen", name: "Olwen Pharmaceuticals", count: 245 },
  { id: "pfizer", name: "Pfizer", count: 189 },
  { id: "johnson", name: "Johnson & Johnson", count: 156 },
  { id: "novartis", name: "Novartis", count: 134 },
  { id: "roche", name: "Roche", count: 98 },
]

const forms = [
  { id: "tablet", name: "Tablet", count: 450 },
  { id: "capsule", name: "Capsule", count: 320 },
  { id: "syrup", name: "Syrup", count: 180 },
  { id: "injection", name: "Injection", count: 95 },
  { id: "cream", name: "Cream", count: 75 },
  { id: "drops", name: "Drops", count: 60 },
]

const ageGroups = [
  { id: "adult", name: "Adult", count: 680 },
  { id: "pediatric", name: "Pediatric", count: 245 },
  { id: "all", name: "All Ages", count: 195 },
]

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Partial<ProductFiltersType>>({})
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    manufacturer: false,
    form: false,
    features: true,
    ageGroup: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (key: keyof ProductFiltersType, value: any) => {
    const newFilters = { ...selectedFilters, [key]: value }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    onFilterChange({})
  }

  const removeFilter = (key: keyof ProductFiltersType) => {
    const newFilters = { ...selectedFilters }
    delete newFilters[key]
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters = Object.keys(selectedFilters).length > 0

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-auto p-1"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {key}: {Array.isArray(value) ? value.join(', ') : String(value)}
                  <button
                    onClick={() => removeFilter(key as keyof ProductFiltersType)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Category</CardTitle>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.category && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedFilters.category === category.id}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 flex-1">{category.name}</span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </label>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Price Range</CardTitle>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => {
                    const min = parseFloat(e.target.value) || 0
                    const max = selectedFilters.priceRange?.[1] || 1000
                    handleFilterChange('priceRange', [min, max])
                  }}
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => {
                    const max = parseFloat(e.target.value) || 1000
                    const min = selectedFilters.priceRange?.[0] || 0
                    handleFilterChange('priceRange', [min, max])
                  }}
                />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Under $25", range: [0, 25] },
                  { label: "$25 - $50", range: [25, 50] },
                  { label: "$50 - $100", range: [50, 100] },
                  { label: "Over $100", range: [100, 1000] },
                ].map((option) => (
                  <label key={option.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={
                        selectedFilters.priceRange?.[0] === option.range[0] &&
                        selectedFilters.priceRange?.[1] === option.range[1]
                      }
                      onChange={() => handleFilterChange('priceRange', option.range)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Features Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('features')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Features</CardTitle>
            {expandedSections.features ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.features && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.inStock || false}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.onSale || false}
                  onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.featured || false}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Featured Products</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.prescriptionRequired === false}
                  onChange={(e) => handleFilterChange('prescriptionRequired', !e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Over-the-Counter (OTC)</span>
              </label>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Manufacturer Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('manufacturer')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Manufacturer</CardTitle>
            {expandedSections.manufacturer ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.manufacturer && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {manufacturers.map((manufacturer) => (
                <label key={manufacturer.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.manufacturer?.includes(manufacturer.id) || false}
                    onChange={(e) => {
                      const current = selectedFilters.manufacturer || []
                      const updated = e.target.checked
                        ? [...current, manufacturer.id]
                        : current.filter(id => id !== manufacturer.id)
                      handleFilterChange('manufacturer', updated.length > 0 ? updated : undefined)
                    }}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 flex-1">{manufacturer.name}</span>
                  <span className="text-xs text-gray-500">({manufacturer.count})</span>
                </label>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Form Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('form')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Form</CardTitle>
            {expandedSections.form ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.form && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {forms.map((form) => (
                <label key={form.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.form?.includes(form.id) || false}
                    onChange={(e) => {
                      const current = selectedFilters.form || []
                      const updated = e.target.checked
                        ? [...current, form.id]
                        : current.filter(id => id !== form.id)
                      handleFilterChange('form', updated.length > 0 ? updated : undefined)
                    }}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 flex-1 capitalize">{form.name}</span>
                  <span className="text-xs text-gray-500">({form.count})</span>
                </label>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Age Group Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('ageGroup')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm">Age Group</CardTitle>
            {expandedSections.ageGroup ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.ageGroup && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {ageGroups.map((ageGroup) => (
                <label key={ageGroup.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.ageGroup?.includes(ageGroup.id) || false}
                    onChange={(e) => {
                      const current = selectedFilters.ageGroup || []
                      const updated = e.target.checked
                        ? [...current, ageGroup.id]
                        : current.filter(id => id !== ageGroup.id)
                      handleFilterChange('ageGroup', updated.length > 0 ? updated : undefined)
                    }}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 flex-1">{ageGroup.name}</span>
                  <span className="text-xs text-gray-500">({ageGroup.count})</span>
                </label>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
