"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Database, UserCheck, FileText, Clock, Mail } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const privacyPrinciples = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "We implement industry-leading security measures to protect your personal information.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We clearly explain what data we collect and how we use it.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: UserCheck,
    title: "Your Control",
    description: "You have full control over your data and can modify or delete it anytime.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Lock,
    title: "Secure Storage",
    description: "All data is encrypted and stored in secure, compliant data centers.",
    color: "text-red-600",
    bgColor: "bg-red-100"
  }
]

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Your privacy is our priority. Learn how we protect and handle your personal information.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Last Updated: December 2024
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <FileText className="w-4 h-4 mr-2" />
                GDPR Compliant
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Privacy Principles */}
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
              Our Privacy Principles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are committed to protecting your privacy through these core principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {privacyPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${principle.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-6 h-6 ${principle.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
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
              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    make a purchase, or contact us for support.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
                    <li><strong>Medical Information:</strong> Prescription details, health conditions (with consent)</li>
                    <li><strong>Payment Information:</strong> Credit card details, billing address</li>
                    <li><strong>Usage Data:</strong> How you interact with our website and services</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send important updates about your orders and account</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  3. Information Sharing and Disclosure
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties, 
                    except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To trusted service providers who assist in our operations</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  4. Data Security
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure data centers with 24/7 monitoring</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and employee training</li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  5. Your Rights and Choices
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and review your personal data</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your account and personal data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability and export</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Contact Us About Privacy
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>privacy@olwenlifesciences.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-primary" />
                    <span>Data Protection Officer: dpo@olwenlifesciences.com</span>
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
