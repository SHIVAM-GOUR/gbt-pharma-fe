"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  FileText,
  AlertCircle
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/forms/contact-form"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our healthcare experts",
    details: [
      "Main: +1-800-OLWEN-RX (659-3679)",
      "Emergency: +1-800-OLWEN-ER (659-3637)",
      "International: +1-555-OLWEN-INT"
    ],
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get detailed responses to your queries",
    details: [
      "General: info@olwenlifesciences.com",
      "Support: support@olwenlifesciences.com",
      "Orders: orders@olwenlifesciences.com"
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Instant support from our team",
    details: [
      "Available 24/7",
      "Average response: 2 minutes",
      "Multilingual support"
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "When you can reach us",
    details: [
      "Mon-Fri: 7:00 AM - 10:00 PM EST",
      "Saturday: 9:00 AM - 6:00 PM EST",
      "Sunday: 10:00 AM - 4:00 PM EST"
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

const departments = [
  {
    name: "Customer Support",
    description: "General inquiries and assistance",
    email: "support@olwenlifesciences.com",
    phone: "+1-800-659-3679",
    hours: "24/7"
  },
  {
    name: "Order Support",
    description: "Order status, tracking, and modifications",
    email: "orders@olwenlifesciences.com",
    phone: "+1-800-659-3680",
    hours: "24/7"
  },
  {
    name: "Prescription Support",
    description: "Prescription uploads and verification",
    email: "prescriptions@olwenlifesciences.com",
    phone: "+1-800-659-3681",
    hours: "Mon-Fri 8AM-8PM EST"
  },
  {
    name: "Clinical Support",
    description: "Drug information and interactions",
    email: "clinical@olwenlifesciences.com",
    phone: "+1-800-659-3682",
    hours: "Mon-Fri 9AM-6PM EST"
  }
]

const offices = [
  {
    name: "Headquarters",
    address: "123 Healthcare Plaza, Medical District, New York, NY 10001",
    phone: "+1-555-OLWEN-HQ",
    type: "Main Office"
  },
  {
    name: "West Coast Office",
    address: "456 Innovation Drive, Tech Valley, San Francisco, CA 94105",
    phone: "+1-555-OLWEN-WC",
    type: "Regional Office"
  },
  {
    name: "Distribution Center",
    address: "789 Logistics Way, Commerce City, Chicago, IL 60601",
    phone: "+1-555-OLWEN-DC",
    type: "Fulfillment Center"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    newsletter: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We&apos;re here to help with all your healthcare needs. Reach out to our expert team
                for support, questions, or guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${method.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                      <div className="space-y-1">
                        {method.details.map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-500">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className="py-20 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <div className="py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2"></div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Emergency Contact */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-900 mb-2">Medical Emergency?</h3>
                      <p className="text-sm text-red-700 mb-3">
                        For medical emergencies, please call 911 or visit your nearest emergency room.
                      </p>
                      <Button variant="destructive" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Line: 911
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Support */}
              <Card className="bg-primary text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Headphones className="w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                      <p className="text-sm opacity-90 mb-4">
                        Our support team is available 24/7 to assist you with any questions.
                      </p>
                      <Button variant="secondary" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call: +1-800-659-3679
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Find quick answers to common questions about orders, prescriptions, and more.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        View FAQ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Departments */}
        <div className="py-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
                Contact by Department
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Reach out to the right team for faster, more specialized assistance
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-600">{dept.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {dept.hours}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <a href={`mailto:${dept.email}`} className="hover:text-primary transition-colors">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <a href={`tel:${dept.phone}`} className="hover:text-primary transition-colors">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="py-20 bg-gray-50">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
                Our Locations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Visit us at one of our offices or distribution centers
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {office.type}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{office.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{office.address}</p>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {office.phone}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
