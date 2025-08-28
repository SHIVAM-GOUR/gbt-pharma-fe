"use client"

import { motion } from "framer-motion"
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Clock, Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const keyTerms = [
  {
    icon: Scale,
    title: "Legal Agreement",
    description: "These terms constitute a legally binding agreement between you and Olwen Lifesciences.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Shield,
    title: "Service Usage",
    description: "Guidelines for proper and lawful use of our pharmaceutical services.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: CheckCircle,
    title: "User Responsibilities",
    description: "Your obligations when using our platform and purchasing medications.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: AlertTriangle,
    title: "Limitations",
    description: "Important limitations and disclaimers regarding our services.",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Terms of <span className="text-accent">Service</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Please read these terms carefully before using our pharmaceutical services.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Effective: December 2024
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Scale className="w-4 h-4 mr-2" />
                Legally Binding
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Terms Overview */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Key Terms Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding your rights and responsibilities when using our services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {keyTerms.map((term, index) => {
              const Icon = term.icon
              return (
                <motion.div
                  key={term.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${term.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-6 h-6 ${term.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                        {term.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {term.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-orange-800">
                <strong>Important:</strong> By using our services, you agree to these terms.
                If you do not agree, please do not use our platform.
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-12">
              {/* Acceptance of Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    By accessing and using Olwen Lifesciences&apos; website and services, you accept and agree 
                    to be bound by the terms and provision of this agreement.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use our service.
                  </p>
                </div>
              </div>

              {/* Service Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  2. Service Description
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Olwen Lifesciences provides online pharmaceutical services including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prescription medication dispensing</li>
                    <li>Over-the-counter medication sales</li>
                    <li>Health supplements and wellness products</li>
                    <li>Pharmaceutical consultation services</li>
                    <li>Health information and resources</li>
                  </ul>
                </div>
              </div>

              {/* User Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  3. User Responsibilities
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    As a user of our services, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of your account</li>
                    <li>Use services only for lawful purposes</li>
                    <li>Follow all applicable laws and regulations</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </div>
              </div>

              {/* Prescription Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  4. Prescription Requirements
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    For prescription medications:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Valid prescription from licensed healthcare provider required</li>
                    <li>Prescription verification process must be completed</li>
                    <li>Age and identity verification may be required</li>
                    <li>Controlled substances subject to additional regulations</li>
                  </ul>
                </div>
              </div>

              {/* Payment and Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  5. Payment and Pricing
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Payment terms and conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are subject to change without notice</li>
                    <li>Payment is due at time of order</li>
                    <li>We accept major credit cards and approved payment methods</li>
                    <li>Insurance claims processed according to your plan</li>
                  </ul>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  6. Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    To the fullest extent permitted by law, Olwen Lifesciences shall not be liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Damages resulting from unauthorized access to your account</li>
                    <li>Service interruptions or technical difficulties</li>
                  </ul>
                </div>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  7. Termination
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We may terminate or suspend your account and access to our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For violation of these terms</li>
                    <li>For fraudulent or illegal activity</li>
                    <li>At our sole discretion with or without notice</li>
                    <li>Upon your request to close your account</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Questions About These Terms?
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>legal@olwenlifesciences.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+1-800-OLWEN-RX (659-3679)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
