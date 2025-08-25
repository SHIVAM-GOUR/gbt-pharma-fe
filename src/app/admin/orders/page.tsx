"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Eye,
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatPrice, formatDate } from "@/lib/utils"

// Mock data - in real app this would come from API
const orders = [
  {
    id: "ORD-001",
    orderNumber: "OLW-2024-001",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1-555-0123"
    },
    items: [
      { name: "Amoxicillin 500mg", quantity: 2, price: 24.99 },
      { name: "Ibuprofen 200mg", quantity: 1, price: 12.50 }
    ],
    total: 62.48,
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    prescriptionRequired: true,
    prescriptionUploaded: true
  },
  {
    id: "ORD-002",
    orderNumber: "OLW-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1-555-0124"
    },
    items: [
      { name: "Vitamin D3 1000IU", quantity: 3, price: 18.75 }
    ],
    total: 56.25,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210"
    },
    createdAt: "2024-01-15T14:45:00Z",
    updatedAt: "2024-01-15T14:45:00Z",
    prescriptionRequired: false,
    prescriptionUploaded: false
  },
  {
    id: "ORD-003",
    orderNumber: "OLW-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1-555-0125"
    },
    items: [
      { name: "Metformin 500mg", quantity: 1, price: 32.00 },
      { name: "Lisinopril 10mg", quantity: 1, price: 28.50 }
    ],
    total: 60.50,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T11:30:00Z",
    prescriptionRequired: true,
    prescriptionUploaded: true
  },
  {
    id: "ORD-004",
    orderNumber: "OLW-2024-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1-555-0126"
    },
    items: [
      { name: "Aspirin 325mg", quantity: 2, price: 15.99 }
    ],
    total: 31.98,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      street: "321 Elm St",
      city: "Houston",
      state: "TX",
      zipCode: "77001"
    },
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-14T16:20:00Z",
    prescriptionRequired: false,
    prescriptionUploaded: false
  }
]

const statusOptions = ["All", "Pending", "Processing", "Shipped", "Completed", "Cancelled"]
const paymentStatusOptions = ["All", "Pending", "Paid", "Failed", "Refunded"]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("All")
  const [dateRange, setDateRange] = useState("")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus.toLowerCase()
    const matchesPaymentStatus = selectedPaymentStatus === "All" || order.paymentStatus === selectedPaymentStatus.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary'
      case 'processing': return 'warning'
      case 'shipped': return 'info'
      case 'completed': return 'success'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'paid': return 'success'
      case 'failed': return 'destructive'
      case 'refunded': return 'secondary'
      default: return 'secondary'
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} status to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by order number, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Payment Status Filter */}
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {paymentStatusOptions.map(status => (
                <option key={status} value={status}>Payment: {status}</option>
              ))}
            </select>

            {/* Date Range */}
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                    <p className="text-sm text-gray-500">{formatDate(new Date(order.createdAt))}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant={getStatusColor(order.status)} className="capitalize">
                      {order.status}
                    </Badge>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus)} className="capitalize">
                      Payment: {order.paymentStatus}
                    </Badge>
                    {order.prescriptionRequired && (
                      <Badge variant={order.prescriptionUploaded ? "success" : "warning"}>
                        {order.prescriptionUploaded ? "Prescription Verified" : "Prescription Pending"}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Items ({order.items.length})</h4>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Shipping Address</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus !== "All" || selectedPaymentStatus !== "All"
                ? "Try adjusting your search criteria or filters"
                : "No orders have been placed yet"
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'processing').length}
            </p>
            <p className="text-sm text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
            <p className="text-sm text-gray-600">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
