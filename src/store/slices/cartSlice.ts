import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem, Product } from '@/lib/types'

interface CartState extends Cart {
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  isOpen: false
}

const calculateTotals = (items: CartItem[], couponCode?: string) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99 // Free shipping over $50
  
  let discount = 0
  if (couponCode === 'WELCOME10') {
    discount = subtotal * 0.1 // 10% discount
  } else if (couponCode === 'SAVE20') {
    discount = subtotal * 0.2 // 20% discount
  }
  
  const total = subtotal + tax + shipping - discount
  
  return { subtotal, tax, shipping, discount, total }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number; prescriptionFile?: string; notes?: string }>) => {
      const { product, quantity = 1, prescriptionFile, notes } = action.payload
      
      const existingItem = state.items.find(item => item.productId === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
        if (prescriptionFile) {
          existingItem.prescriptionFile = prescriptionFile
          existingItem.prescriptionUploaded = true
        }
        if (notes) {
          existingItem.notes = notes
        }
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          quantity,
          prescriptionUploaded: !!prescriptionFile,
          prescriptionFile,
          notes
        }
        state.items.push(newItem)
      }
      
      const totals = calculateTotals(state.items, state.couponCode)
      Object.assign(state, totals)
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      
      const totals = calculateTotals(state.items, state.couponCode)
      Object.assign(state, totals)
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
      }
      
      const totals = calculateTotals(state.items, state.couponCode)
      Object.assign(state, totals)
    },
    
    updatePrescription: (state, action: PayloadAction<{ id: string; prescriptionFile: string }>) => {
      const { id, prescriptionFile } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        item.prescriptionFile = prescriptionFile
        item.prescriptionUploaded = true
      }
    },
    
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload
      
      const totals = calculateTotals(state.items, action.payload)
      Object.assign(state, totals)
    },
    
    removeCoupon: (state) => {
      state.couponCode = undefined
      
      const totals = calculateTotals(state.items)
      Object.assign(state, totals)
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.subtotal = 0
      state.tax = 0
      state.shipping = 0
      state.discount = 0
      state.couponCode = undefined
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    openCart: (state) => {
      state.isOpen = true
    },
    
    closeCart: (state) => {
      state.isOpen = false
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updatePrescription,
  applyCoupon,
  removeCoupon,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions

export default cartSlice.reducer
