"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchProducts, setFilters, setPagination } from "@/store/slices/productsSlice"
import { ProductFilters as ProductFiltersType } from "@/lib/types"

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { products, loading, filters, pagination } = useAppSelector((state) => state.products)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(fetchProducts(filters))
  }, [dispatch, filters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    dispatch(setFilters({ search: query }))
  }

  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    dispatch(setFilters(newFilters))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
                Our <span className="text-primary">Medicines</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Browse our comprehensive collection of quality medicines and healthcare products.
                All products are FDA approved and sourced from trusted manufacturers.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      {/* Search */}

                      <div className="relative flex-1 max-w-md">

                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Search className="h-5 w-5 text-gray-400" />
                        </span>

                        <Input
                          type="text"
                          placeholder="Search medicines..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}

                          className="w-full h-11 !pl-12 pr-3"
                          aria-label="Search medicines"
                        />
                      </div>


                      {/* Controls */}
                      <div className="flex items-center gap-3">
                        {/* Mobile Filter Toggle */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="lg:hidden"
                        >
                          <SlidersHorizontal className="w-4 h-4 mr-2" />
                          Filters
                        </Button>

                        {/* View Mode Toggle */}
                        <div className="flex items-center border border-gray-200 rounded-lg p-1">
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="h-8 w-8 p-0"
                          >
                            <Grid className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="h-8 w-8 p-0"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Sort */}
                        <select
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          onChange={(e) => {
                            const [sortBy, sortOrder] = e.target.value.split('-')
                            dispatch(setFilters({
                              sortBy: sortBy as ProductFiltersType['sortBy'],
                              sortOrder: sortOrder as ProductFiltersType['sortOrder']
                            }))
                          }}
                        >
                          <option value="name-asc">Name A-Z</option>
                          <option value="name-desc">Name Z-A</option>
                          <option value="price-asc">Price Low to High</option>
                          <option value="price-desc">Price High to Low</option>
                          <option value="rating-desc">Highest Rated</option>
                          <option value="newest-desc">Newest First</option>
                        </select>
                      </div>
                    </div>

                    {/* Active Filters */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {filters.category && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Category: {filters.category}
                          <button
                            onClick={() => dispatch(setFilters({ category: undefined }))}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {filters.search && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: {filters.search}
                          <button
                            onClick={() => {
                              setSearchQuery('')
                              dispatch(setFilters({ search: undefined }))
                            }}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <p className="text-gray-600">
                  Showing {products.length} of {pagination.total} products
                </p>
              </motion.div>

              {/* Products Grid/List */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-80"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse our categories.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('')
                      dispatch(setFilters({}))
                    }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}

              {/* Pagination */}
              {products.length > 0 && pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-12 flex justify-center"
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      disabled={pagination.page === 1}
                      onClick={() => dispatch(setPagination({ page: pagination.page - 1 }))}
                    >
                      Previous
                    </Button>

                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={pagination.page === i + 1 ? 'default' : 'outline'}
                        onClick={() => dispatch(setPagination({ page: i + 1 }))}
                        className="w-10 h-10 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() => dispatch(setPagination({ page: pagination.page + 1 }))}
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
