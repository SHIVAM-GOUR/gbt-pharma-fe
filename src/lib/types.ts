// Product Types
export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  images: string[]
  inStock: boolean
  stockQuantity: number
  dosage: string
  strength: string
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops' | 'inhaler'
  manufacturer: string
  activeIngredients: string[]
  indications: string[]
  contraindications: string[]
  sideEffects: string[]
  dosageInstructions: string
  storageInstructions: string
  prescriptionRequired: boolean
  ageGroup: 'adult' | 'pediatric' | 'all'
  pregnancyCategory?: 'A' | 'B' | 'C' | 'D' | 'X'
  expiryDate: string
  batchNumber: string
  approvalNumber: string
  rating: number
  reviewCount: number
  tags: string[]
  featured: boolean
  onSale: boolean
  createdAt: string
  updatedAt: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  prescriptionUploaded?: boolean
  prescriptionFile?: string
  notes?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  couponCode?: string
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  addresses: Address[]
  defaultAddressId?: string
  prescriptions: Prescription[]
  orderHistory: Order[]
  wishlist: string[]
  loyaltyPoints: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface Prescription {
  id: string
  doctorName: string
  hospitalName: string
  prescriptionDate: string
  medications: PrescriptionMedication[]
  fileUrl: string
  isVerified: boolean
  verifiedBy?: string
  verifiedAt?: string
}

export interface PrescriptionMedication {
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  quantity: number
  instructions: string
}

// Order Types
export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  couponCode?: string
  prescriptionRequired: boolean
  prescriptionVerified: boolean
  estimatedDelivery: string
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  prescriptionFile?: string
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery'
  cardLast4?: string
  cardBrand?: string
  transactionId?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  subcategory?: string
  priceRange?: [number, number]
  inStock?: boolean
  prescriptionRequired?: boolean
  form?: string[]
  manufacturer?: string[]
  ageGroup?: string[]
  rating?: number
  onSale?: boolean
  featured?: boolean
  search?: string
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Blog/News Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorImage?: string
  featuredImage: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: string
}

// FAQ Types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  helpful: number
}

// Contact Types
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type: 'general' | 'order' | 'prescription' | 'complaint' | 'suggestion'
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}
