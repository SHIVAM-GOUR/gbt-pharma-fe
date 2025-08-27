"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
  priority: string
}

const categories = [
  "General Inquiry",
  "Technical Support", 
  "Delivery",
  "Insurance",
  "Medical",
  "Account",
  "Prescription Help",
  "Billing",
  "Product Information"
]

const priorities = [
  { value: "low", label: "Low - General question" },
  { value: "medium", label: "Medium - Need assistance" },
  { value: "high", label: "High - Urgent help needed" },
  { value: "urgent", label: "Urgent - Critical issue" }
]

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    priority: "medium"
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // In a real app, this would send to your API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create inquiry object that would be sent to backend
      const inquiry = {
        ...formData,
        id: `INQ-${Date.now()}`,
        status: "new",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: "contact-form"
      }
      
      console.log("Inquiry submitted:", inquiry)
      
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: "",
          priority: "medium"
        })
        setIsSubmitted(false)
      }, 3000)
      
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for contacting us. We&apos;ve received your inquiry and will respond within 24 hours.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-green-800">
            <strong>What&apos;s next?</strong><br />
            Our support team will review your inquiry and contact you via email or phone based on your preference.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Contact Information */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600">+1-800-OLWEN-RX</p>
                <p className="text-sm text-gray-500">Mon-Fri 8AM-8PM EST</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">support@olwenlifesciences.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">
                  123 Healthcare Blvd<br />
                  Medical District<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Business Hours</h4>
                <p className="text-gray-600">
                  Mon-Fri: 8:00 AM - 8:00 PM<br />
                  Sat: 9:00 AM - 6:00 PM<br />
                  Sun: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="medical-form-label">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="medical-form-label">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="medical-form-label">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="medical-form-label">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`medical-form-input ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="medical-form-label">Subject *</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief description of your inquiry"
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="medical-form-label">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="medical-form-input"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="medical-form-label">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please provide details about your inquiry..."
                  className={`medical-form-input min-h-[120px] resize-none ${errors.message ? 'border-red-500' : ''}`}
                  rows={5}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Privacy Notice:</strong> Your information is secure and will only be used to respond to your inquiry. 
                  We comply with HIPAA regulations and never share personal information with third parties.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
