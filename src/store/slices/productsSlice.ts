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
        name: 'Aflarose OD',
        description: 'Effective pain relief and fever reducer.',
        shortDescription: 'support bone and joint health',
        price: 580,
       // originalPrice: 15.99,
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
      },
       {
        id: '2',
        name: 'Olmicium Plus',
        description: 'Broad-spectrum antibiotic for bacterial infections.',
        shortDescription: 'strengthen bone growth',
        price: 330,
        //originalPrice: 29.99,
        category: 'Antibiotics',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 75,
        dosage: '500mg',
        strength: '500mg',
        form: 'capsule',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Amoxicillin 500mg'],
        indications: ['Bacterial infections'],
        contraindications: ['Penicillin allergy'],
        sideEffects: ['Nausea', 'Diarrhea'],
        dosageInstructions: 'Adults: 250-500mg every 8 hours.',
        storageInstructions: 'Store below 25°C.',
        prescriptionRequired: true,
        ageGroup: 'all',
        pregnancyCategory: 'B',
        expiryDate: '2025-08-31',
        batchNumber: 'OL2024002',
        approvalNumber: 'FDA-2024-002',
        rating: 4.2,
        reviewCount: 89,
        tags: ['antibiotic', 'prescription'],
        featured: true,
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
        name: 'Aflarose OD',
        description: 'Effective pain relief and fever reducer.',
        shortDescription: 'support bone and joint health',
        price: 580,
       // originalPrice: 15.99,
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
      },
      {
        id: '2',
        name: 'Olmicium Plus',
        description: 'Broad-spectrum antibiotic for bacterial infections.',
        shortDescription: 'strengthen bone growth',
        price: 330,
        //originalPrice: 29.99,
        category: 'Antibiotics',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 75,
        dosage: '500mg',
        strength: '500mg',
        form: 'capsule',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Amoxicillin 500mg'],
        indications: ['Bacterial infections'],
        contraindications: ['Penicillin allergy'],
        sideEffects: ['Nausea', 'Diarrhea'],
        dosageInstructions: 'Adults: 250-500mg every 8 hours.',
        storageInstructions: 'Store below 25°C.',
        prescriptionRequired: true,
        ageGroup: 'all',
        pregnancyCategory: 'B',
        expiryDate: '2025-08-31',
        batchNumber: 'OL2024002',
        approvalNumber: 'FDA-2024-002',
        rating: 4.2,
        reviewCount: 89,
        tags: ['antibiotic', 'prescription'],
        featured: true,
        onSale: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'Wenosis',
        description: 'Essential vitamin for bone health and immunity.',
        shortDescription: 'PCOS',
        price: 290,
        category: 'Vitamins & Supplements',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 200,
        dosage: '1000 IU',
        strength: '1000 IU',
        form: 'tablet',
        manufacturer: 'Olwen Nutritionals',
        activeIngredients: ['Vitamin D3 1000 IU'],
        indications: ['Vitamin D deficiency', 'Bone health'],
        contraindications: ['Hypercalcemia'],
        sideEffects: ['Rare: nausea'],
        dosageInstructions: 'Adults: 1 tablet daily with food.',
        storageInstructions: 'Store in cool, dry place.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2026-06-30',
        batchNumber: 'OL2024003',
        approvalNumber: 'FDA-2024-003',
        rating: 4.7,
        reviewCount: 156,
        tags: ['vitamin', 'supplement'],
        featured: true,
        onSale: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-05'
      },
      {
        id: '4',
        name: 'Olmicox 120',
        description: 'Anti-inflammatory pain reliever.',
        shortDescription: 'relieving pain and swelling of joints',
        price: 160,
        originalPrice: 17.99,
        category: 'Pain Relief',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 120,
        dosage: '400mg',
        strength: '400mg',
        form: 'tablet',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Ibuprofen 400mg'],
        indications: ['Pain relief', 'Inflammation'],
        contraindications: ['Stomach ulcers'],
        sideEffects: ['Stomach upset'],
        dosageInstructions: 'Adults: 1 tablet every 6-8 hours.',
        storageInstructions: 'Store below 25°C.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2025-11-30',
        batchNumber: 'OL2024004',
        approvalNumber: 'FDA-2024-004',
        rating: 4.3,
        reviewCount: 94,
        tags: ['pain relief', 'anti-inflammatory'],
        featured: true,
        onSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-12'
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

    // Mock product database
    const mockProducts: Record<string, Product> = {
      '1': {
        id: '1',
        name: 'Aflarose OD',
        description: 'Effective pain relief and fever reducer. Suitable for adults and children over 12 years. Paracetamol is one of the most commonly used medications for treating pain and reducing fever. It works by blocking the production of prostaglandins, chemicals in the body that cause pain and inflammation.',
        shortDescription: 'Pain relief and fever reducer',
        price: 580,
        // originalPrice: 15.99,
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
        indications: ['Pain relief', 'Fever reduction', 'Headache', 'Muscle pain', 'Toothache', 'Backache'],
        contraindications: ['Severe liver disease', 'Allergy to paracetamol', 'Chronic alcohol use'],
        sideEffects: ['Rare: skin rash', 'Very rare: liver damage with overdose', 'Nausea (uncommon)'],
        dosageInstructions: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours. Do not exceed recommended dose.',
        storageInstructions: 'Store below 25°C in a dry place. Keep out of reach of children. Do not use after expiry date.',
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
      '2': {
        id: '2',
        name: 'Olmicium Plus',
        description: 'Broad-spectrum antibiotic effective against a wide range of bacterial infections. Amoxicillin belongs to the penicillin group of antibiotics and works by stopping the growth of bacteria.',
        shortDescription: 'Broad-spectrum antibiotic for bacterial infections',
        price: 330,
        // originalPrice: 29.99,
        category: 'Antibiotics',
        subcategory: 'Penicillins',
        images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 75,
        dosage: '500mg',
        strength: '500mg',
        form: 'capsule',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Amoxicillin 500mg'],
        indications: ['Respiratory tract infections', 'Urinary tract infections', 'Skin infections', 'Dental infections'],
        contraindications: ['Allergy to penicillin', 'Severe kidney disease', 'Mononucleosis'],
        sideEffects: ['Nausea', 'Diarrhea', 'Skin rash', 'Stomach upset'],
        dosageInstructions: 'Adults: 250-500mg every 8 hours. Take with food to reduce stomach upset. Complete the full course.',
        storageInstructions: 'Store below 25°C. Complete the full course as prescribed. Keep refrigerated if liquid form.',
        prescriptionRequired: true,
        ageGroup: 'all',
        pregnancyCategory: 'B',
        expiryDate: '2025-08-31',
        batchNumber: 'OL2024002',
        approvalNumber: 'FDA-2024-002',
        rating: 4.2,
        reviewCount: 89,
        tags: ['antibiotic', 'prescription', 'infection'],
        featured: true,
        onSale: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10'
      },
      '3': {
        id: '3',
        name: 'Vitamin D3 1000 IU',
        description: 'Essential vitamin supplement for bone health and immune system support. Vitamin D3 helps your body absorb calcium and phosphorus, crucial for maintaining strong bones and teeth.',
        shortDescription: 'Bone health and immune support supplement',
        price: 18.99,
        category: 'Vitamins & Supplements',
        subcategory: 'Vitamins',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 200,
        dosage: '1000 IU',
        strength: '1000 IU',
        form: 'tablet',
        manufacturer: 'Olwen Nutritionals',
        activeIngredients: ['Cholecalciferol (Vitamin D3) 1000 IU'],
        indications: ['Vitamin D deficiency', 'Bone health support', 'Immune system support', 'Calcium absorption'],
        contraindications: ['Hypercalcemia', 'Kidney stones', 'Sarcoidosis'],
        sideEffects: ['Rare: nausea', 'Constipation (with high doses)', 'Headache (uncommon)'],
        dosageInstructions: 'Adults: 1 tablet daily with food. Best taken with a meal containing fat for optimal absorption.',
        storageInstructions: 'Store in a cool, dry place away from direct sunlight. Keep container tightly closed.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2026-06-30',
        batchNumber: 'OL2024003',
        approvalNumber: 'FDA-2024-003',
        rating: 4.7,
        reviewCount: 156,
        tags: ['vitamin', 'supplement', 'bone health', 'immunity'],
        featured: true,
        onSale: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-05'
      },
      '4': {
        id: '4',
        name: 'Ibuprofen 400mg',
        description: 'Non-steroidal anti-inflammatory drug (NSAID) for pain relief and inflammation reduction. Effective for various types of pain including headaches, muscle pain, and arthritis.',
        shortDescription: 'Anti-inflammatory pain reliever',
        price: 14.99,
        originalPrice: 17.99,
        category: 'Pain Relief',
        subcategory: 'NSAIDs',
        images: ['/api/placeholder/400/400'],
        inStock: true,
        stockQuantity: 120,
        dosage: '400mg',
        strength: '400mg',
        form: 'tablet',
        manufacturer: 'Olwen Pharmaceuticals',
        activeIngredients: ['Ibuprofen 400mg'],
        indications: ['Pain relief', 'Inflammation reduction', 'Fever reduction', 'Arthritis pain', 'Muscle pain'],
        contraindications: ['Stomach ulcers', 'Severe heart disease', 'Kidney disease', 'Allergy to NSAIDs'],
        sideEffects: ['Stomach upset', 'Nausea', 'Dizziness', 'Headache'],
        dosageInstructions: 'Adults: 1 tablet every 6-8 hours as needed. Maximum 3 tablets in 24 hours. Take with food.',
        storageInstructions: 'Store below 25°C in original packaging. Keep away from moisture and direct sunlight.',
        prescriptionRequired: false,
        ageGroup: 'adult',
        expiryDate: '2025-11-30',
        batchNumber: 'OL2024004',
        approvalNumber: 'FDA-2024-004',
        rating: 4.3,
        reviewCount: 94,
        tags: ['pain relief', 'anti-inflammatory', 'fever', 'otc'],
        featured: false,
        onSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-12'
      }
    }

    const product = mockProducts[id]
    if (!product) {
      throw new Error(`Product with ID ${id} not found`)
    }

    return product
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
    setPagination: (state, action: PayloadAction<{ page: number }>) => {
      state.pagination.page = action.payload.page
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
        state.currentProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Product not found'
        state.currentProduct = null
      })
  }
})

export const { setFilters, setPagination, clearFilters, clearCurrentProduct, clearError } = productsSlice.actions
export default productsSlice.reducer
