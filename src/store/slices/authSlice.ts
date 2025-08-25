import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, Order } from '@/lib/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  orders: Order[]
  ordersLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  orders: [],
  ordersLoading: false
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        addresses: [
          {
            id: '1',
            type: 'home',
            firstName: 'John',
            lastName: 'Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            phone: '+1234567890',
            isDefault: true
          }
        ],
        defaultAddressId: '1',
        prescriptions: [],
        orderHistory: [],
        wishlist: [],
        loyaltyPoints: 150,
        isVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
      return mockUser
    } else {
      throw new Error('Invalid credentials')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
  }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      addresses: [],
      prescriptions: [],
      orderHistory: [],
      wishlist: [],
      loyaltyPoints: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return mockUser
  }
)

export const fetchUserOrders = createAsyncThunk(
  'auth/fetchUserOrders',
  async (userId: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockOrders: Order[] = [
      {
        id: '1',
        userId,
        orderNumber: 'OL2024001',
        status: 'delivered',
        items: [],
        shippingAddress: {
          id: '1',
          type: 'home',
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          isDefault: true
        },
        billingAddress: {
          id: '1',
          type: 'home',
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          isDefault: true
        },
        paymentMethod: {
          type: 'card',
          cardLast4: '1234',
          cardBrand: 'Visa',
          transactionId: 'txn_123456'
        },
        subtotal: 25.98,
        tax: 2.08,
        shipping: 0,
        discount: 0,
        total: 28.06,
        prescriptionRequired: false,
        prescriptionVerified: false,
        estimatedDelivery: '2024-01-20',
        trackingNumber: 'TRK123456789',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-18'
      }
    ]
    
    return mockOrders
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return userData
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.orders = []
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.wishlist.includes(action.payload)) {
        state.user.wishlist.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.wishlist = state.user.wishlist.filter(id => id !== action.payload)
      }
    },
    updateLoyaltyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.loyaltyPoints += action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      // Fetch orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersLoading = true
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersLoading = false
        state.orders = action.payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersLoading = false
        state.error = action.error.message || 'Failed to fetch orders'
      })
      // Update profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload }
        }
      })
  }
})

export const {
  logout,
  clearError,
  addToWishlist,
  removeFromWishlist,
  updateLoyaltyPoints
} = authSlice.actions

export default authSlice.reducer
