"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Reply, 
  Archive, 
  Trash2,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  source: "contact-form" | "email" | "phone" | "chat"
}

// Mock data - in real app this would come from API
const inquiries: Inquiry[] = [
  {
    id: "INQ-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    subject: "Question about prescription upload",
    message: "Hi, I'm having trouble uploading my prescription for Amoxicillin. The file seems to be too large. Can you help me with this?",
    status: "new",
    priority: "medium",
    category: "Technical Support",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    source: "contact-form"
  },
  {
    id: "INQ-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Delivery inquiry",
    message: "I placed an order yesterday but haven't received any tracking information. When can I expect my medicines to arrive?",
    status: "in-progress",
    priority: "high",
    category: "Delivery",
    createdAt: "2024-01-19T14:20:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
    assignedTo: "Support Team",
    source: "email"
  },
  {
    id: "INQ-003",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1-555-0456",
    subject: "Insurance coverage question",
    message: "Does my insurance cover the diabetes medications available on your platform? I need to know before placing an order.",
    status: "resolved",
    priority: "medium",
    category: "Insurance",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
    assignedTo: "Insurance Specialist",
    source: "phone"
  },
  {
    id: "INQ-004",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    subject: "Side effects concern",
    message: "I've been taking the medication I ordered last week and experiencing some side effects. Should I be concerned? Can I speak with a pharmacist?",
    status: "new",
    priority: "urgent",
    category: "Medical",
    createdAt: "2024-01-20T08:15:00Z",
    updatedAt: "2024-01-20T08:15:00Z",
    source: "chat"
  },
  {
    id: "INQ-005",
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    subject: "Account access issue",
    message: "I can't log into my account. I've tried resetting my password multiple times but the reset email never arrives.",
    status: "closed",
    priority: "low",
    category: "Account",
    createdAt: "2024-01-17T12:00:00Z",
    updatedAt: "2024-01-18T10:45:00Z",
    assignedTo: "Tech Support",
    source: "contact-form"
  }
]

const categories = ["All", "Technical Support", "Delivery", "Insurance", "Medical", "Account", "General"]
const statuses = ["All", "new", "in-progress", "resolved", "closed"]
const priorities = ["All", "low", "medium", "high", "urgent"]

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || inquiry.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || inquiry.status === selectedStatus
    const matchesPriority = selectedPriority === "All" || inquiry.priority === selectedPriority

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="info" className="flex items-center"><AlertCircle className="w-3 h-3 mr-1" />New</Badge>
      case 'in-progress':
        return <Badge variant="warning" className="flex items-center"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>
      case 'resolved':
        return <Badge variant="success" className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>
      case 'closed':
        return <Badge variant="outline" className="flex items-center"><XCircle className="w-3 h-3 mr-1" />Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      case 'high':
        return <Badge variant="warning">High</Badge>
      case 'medium':
        return <Badge variant="info">Medium</Badge>
      case 'low':
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'contact-form':
        return <MessageSquare className="w-4 h-4" />
      case 'email':
        return <Mail className="w-4 h-4" />
      case 'phone':
        return <Phone className="w-4 h-4" />
      case 'chat':
        return <MessageSquare className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const stats = [
    { title: "Total Inquiries", value: inquiries.length, color: "text-blue-600" },
    { title: "New", value: inquiries.filter(i => i.status === 'new').length, color: "text-orange-600" },
    { title: "In Progress", value: inquiries.filter(i => i.status === 'in-progress').length, color: "text-yellow-600" },
    { title: "Resolved Today", value: inquiries.filter(i => i.status === 'resolved').length, color: "text-green-600" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiry Management</h1>
          <p className="text-gray-600">Manage customer inquiries and support requests</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive Selected
          </Button>
          <Button>
            <Reply className="w-4 h-4 mr-2" />
            Bulk Reply
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <MessageSquare className={`w-8 h-8 ${stat.color} opacity-20`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="medical-form-input min-w-[150px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="medical-form-input min-w-[120px]"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="medical-form-input min-w-[120px]"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry, index) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getSourceIcon(inquiry.source)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{inquiry.subject}</h3>
                        {getStatusBadge(inquiry.status)}
                        {getPriorityBadge(inquiry.priority)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {inquiry.name}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {inquiry.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-2">{inquiry.message}</p>
                      {inquiry.assignedTo && (
                        <p className="text-sm text-primary mt-2">Assigned to: {inquiry.assignedTo}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Category: {inquiry.category}</span>
                  <span>ID: {inquiry.id}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
