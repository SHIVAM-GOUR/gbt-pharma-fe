import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductFilters, PaginatedResponse } from '@/lib/types'

interface ProductsState {
  products: Product[]
  featuredProducts: Product[]
  currentProduct: Product | null
  filters: ProductFilters
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {
    sortBy: 'name',
    sortOrder: 'asc'
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  }
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFilters = {}) => {
    // Mock API call - replace with actual API
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        description: 'Effective pain relief and fever reducer. Suitable for adults and children over 12 years.',
        shortDescription: 'Pain relief and fever reducer',
        price: 12.99,
        originalPrice: 15.99,
        category: 'Pain Relief',
        subcategory: 'Analgesics',
        images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 150,
        dosage: '500mg',
        strength: '500mg',
        form: 'tablet',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Paracetamol 500mg'],
        indications: ['Pain relief', 'Fever reduction', 'Headache', 'Muscle pain'],
        contraindications: ['Severe liver disease', 'Allergy to paracetamol'],
        sideEffects: ['Rare: skin rash', 'Very rare: liver damage with overdose'],
        dosageInstructions: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
        storageInstructions: 'Store below 25°C in a dry place. Keep out of reach of children.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2025-12-31',
        batchNumber: 'OL2024001',
        approvalNumber: 'FDA-2024-001',
        rating: 4.5,
        reviewCount: 128,
        tags: ['pain relief', 'fever', 'headache', 'otc'],
        featured: true,
        onSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Amoxicillin 250mg',
        description: 'Broad-spectrum antibiotic for bacterial infections. Prescription required.',
        shortDescription: 'Antibiotic for bacterial infections',
        price: 24.99,
        category: 'Antibiotics',
        subcategory: 'Penicillins',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 75,
        dosage: '250mg',
        strength: '250mg',
        form: 'capsule',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Amoxicillin 250mg'],
        indications: ['Respiratory tract infections', 'Urinary tract infections', 'Skin infections'],
        contraindications: ['Penicillin allergy', 'Severe kidney disease'],
        sideEffects: ['Nausea', 'Diarrhea', 'Skin rash', 'Allergic reactions'],
        dosageInstructions: 'Adults: 250-500mg every 8 hours. Take with food to reduce stomach upset.',
        storageInstructions: 'Store below 25°C. Complete the full course as prescribed.',
        prescriptionRequired: true,
        ageGroup: 'all',
        pregnancyCategory: 'B',
        expiryDate: '2025-08-31',
        batchNumber: 'OL2024002',
        approvalNumber: 'FDA-2024-002',
        rating: 4.2,
        reviewCount: 89,
        tags: ['antibiotic', 'prescription', 'infection'],
        featured: false,
        onSale: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10'
      }
    ]

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      data: mockProducts,
      pagination: {
        page: 1,
        limit: 12,
        total: mockProducts.length,
        totalPages: 1
      }
    } as PaginatedResponse<Product>
  }
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    // Mock API call
    const mockFeaturedProducts: Product[] = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        description: 'Effective pain relief and fever reducer.',
        shortDescription: 'Pain relief and fever reducer',
        price: 12.99,
        originalPrice: 15.99,
        category: 'Pain Relief',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 150,
        dosage: '500mg',
        strength: '500mg',
        form: 'tablet',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Paracetamol 500mg'],
        indications: ['Pain relief', 'Fever reduction'],
        contraindications: ['Severe liver disease'],
        sideEffects: ['Rare: skin rash'],
        dosageInstructions: 'Adults: 1-2 tablets every 4-6 hours.',
        storageInstructions: 'Store below 25°C in a dry place.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2025-12-31',
        batchNumber: 'OL2024001',
        approvalNumber: 'FDA-2024-001',
        rating: 4.5,
        reviewCount: 128,
        tags: ['pain relief', 'fever'],
        featured: true,
        onSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    ]

    await new Promise(resolve => setTimeout(resolve, 500))
    return mockFeaturedProducts
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockProduct: Product = {
      id,
      name: 'Paracetamol 500mg',
      description: 'Effective pain relief and fever reducer. Suitable for adults and children over 12 years.',
      shortDescription: 'Pain relief and fever reducer',
      price: 12.99,
      originalPrice: 15.99,
      category: 'Pain Relief',
      subcategory: 'Analgesics',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
      inStock: true,
      stockQuantity: 150,
      dosage: '500mg',
      strength: '500mg',
      form: 'tablet',
      manufacturer: 'Olwen Pharmaceuticals',
      activeIngredients: ['Paracetamol 500mg'],
      indications: ['Pain relief', 'Fever reduction', 'Headache', 'Muscle pain'],
      contraindications: ['Severe liver disease', 'Allergy to paracetamol'],
      sideEffects: ['Rare: skin rash', 'Very rare: liver damage with overdose'],
      dosageInstructions: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
      storageInstructions: 'Store below 25°C in a dry place. Keep out of reach of children.',
      prescriptionRequired: false,
      ageGroup: 'adult',
      expiryDate: '2025-12-31',
      batchNumber: 'OL2024001',
      approvalNumber: 'FDA-2024-001',
      rating: 4.5,
      reviewCount: 128,
      tags: ['pain relief', 'fever', 'headache', 'otc'],
      featured: true,
      onSale: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    }

    return mockProduct
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        sortBy: 'name',
        sortOrder: 'asc'
      }
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      // Fetch featured products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.featuredProducts = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch featured products'
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
  }
})

export const { setFilters, clearFilters, clearCurrentProduct, clearError } = productsSlice.actions
export default productsSlice.reducer
