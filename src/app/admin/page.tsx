"use client"

import { motion } from "framer-motion"
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Total Orders",
    value: "856",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Total Customers",
    value: "2,341",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "-3%",
    trend: "down",
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Amoxicillin 500mg",
    amount: "$24.99",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Ibuprofen 200mg",
    amount: "$12.50",
    status: "processing",
    date: "2024-01-15"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Vitamin D3 1000IU",
    amount: "$18.75",
    status: "shipped",
    date: "2024-01-14"
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "Metformin 500mg",
    amount: "$32.00",
    status: "pending",
    date: "2024-01-14"
  }
]

const lowStockProducts = [
  {
    name: "Aspirin 325mg",
    stock: 5,
    threshold: 20,
    category: "Pain Relief"
  },
  {
    name: "Insulin Glargine",
    stock: 2,
    threshold: 10,
    category: "Diabetes"
  },
  {
    name: "Lisinopril 10mg",
    stock: 8,
    threshold: 25,
    category: "Cardiovascular"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success'
    case 'processing': return 'warning'
    case 'shipped': return 'info'
    case 'pending': return 'secondary'
    default: return 'secondary'
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your pharmacy.</p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/orders">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <Badge variant={getStatusColor(order.status)} className="text-xs capitalize">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                      <Badge variant="destructive" className="text-xs">
                        {product.stock} left
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(product.stock / product.threshold) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      Threshold: {product.threshold} units
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link href="/admin/products?filter=low-stock">
                  View All Low Stock
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/admin/products/new">
                  <Package className="w-6 h-6 mb-2" />
                  Add Product
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/orders">
                  <ShoppingCart className="w-6 h-6 mb-2" />
                  View Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/customers">
                  <Users className="w-6 h-6 mb-2" />
                  Manage Customers
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/analytics">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
