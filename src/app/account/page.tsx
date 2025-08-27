"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  Edit,
  Plus,
  Eye,
  Download
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchUserOrders, logout } from "@/store/slices/authSlice"
import { formatPrice, formatDate } from "@/lib/utils"

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Order History', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Account Settings', icon: Settings },
]

export default function AccountPage() {
  const dispatch = useAppDispatch()
  const { user, orders, ordersLoading } = useAppSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user.id))
    }
  }, [dispatch, user])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
            <p className="text-gray-600 mb-8">You need to be logged in to access your account</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success'
      case 'shipped': return 'info'
      case 'processing': return 'warning'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
                My Account
              </h1>
              <p className="text-gray-600">
                Welcome back, {user.firstName}! Manage your orders, prescriptions, and account settings.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="success" className="text-xs">
                        Verified Account
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {user.loyaltyPoints} points
                      </span>
                    </div>
                  </div>
                  
                  <nav className="p-2">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                            activeTab === item.id
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      )
                    })}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors text-red-600 hover:bg-red-50 mt-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                          <div className="text-sm text-gray-600">Total Orders</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{user.wishlist?.length || 0}</div>
                          <div className="text-sm text-gray-600">Wishlist Items</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Badge className="w-8 h-8 text-accent mx-auto mb-2 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">{user.loyaltyPoints}</span>
                          </Badge>
                          <div className="text-2xl font-bold text-gray-900">{user.loyaltyPoints}</div>
                          <div className="text-sm text-gray-600">Loyalty Points</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Orders */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Recent Orders</CardTitle>
                          <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                            View All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {ordersLoading ? (
                          <div className="text-center py-8">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">Loading orders...</p>
                          </div>
                        ) : orders.length > 0 ? (
                          <div className="space-y-4">
                            {orders.slice(0, 3).map((order) => (
                              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900">Order #{order.orderNumber}</div>
                                  <div className="text-sm text-gray-600">{formatDate(new Date(order.createdAt))}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-gray-900">{formatPrice(order.total)}</div>
                                  <Badge variant={getOrderStatusColor(order.status)} className="text-xs capitalize">
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No orders yet</p>
                            <Button className="mt-4" asChild>
                              <Link href="/products">Start Shopping</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {ordersLoading ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-gray-600">Loading orders...</p>
                        </div>
                      ) : orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                                  <p className="text-sm text-gray-600">
                                    Placed on {formatDate(new Date(order.createdAt))}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">{formatPrice(order.total)}</div>
                                  <Badge variant={getOrderStatusColor(order.status)} className="text-xs capitalize">
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  {order.items?.length || 0} items • Delivered to {order.shippingAddress.city}, {order.shippingAddress.state}
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                  {order.status === 'delivered' && (
                                    <Button variant="outline" size="sm">
                                      <Download className="w-4 h-4 mr-1" />
                                      Invoice
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                          <Button asChild>
                            <Link href="/products">Browse Products</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'wishlist' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-600 mb-6">Save items you love for later</p>
                        <Button asChild>
                          <Link href="/products">Browse Products</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'addresses' && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Saved Addresses</CardTitle>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Address
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-4">
                          {user.addresses.map((address) => (
                            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-medium text-gray-900 capitalize">{address.type}</span>
                                    {address.isDefault && (
                                      <Badge variant="secondary" className="text-xs">Default</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {address.firstName} {address.lastName}<br />
                                    {address.street}<br />
                                    {address.city}, {address.state} {address.zipCode}<br />
                                    {address.country}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
                          <p className="text-gray-600 mb-6">Add an address for faster checkout</p>
                          <Button>
                            <Plus className="w-4 h-4 mr-1" />
                            Add Address
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'settings' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="medical-form-label">First Name</label>
                              <input
                                type="text"
                                value={user.firstName}
                                className="medical-form-input"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="medical-form-label">Last Name</label>
                              <input
                                type="text"
                                value={user.lastName}
                                className="medical-form-input"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="medical-form-label">Email</label>
                              <input
                                type="email"
                                value={user.email}
                                className="medical-form-input"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="medical-form-label">Phone</label>
                              <input
                                type="tel"
                                value={user.phone}
                                className="medical-form-input"
                                readOnly
                              />
                            </div>
                          </div>
                          <Button className="mt-4">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Information
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
