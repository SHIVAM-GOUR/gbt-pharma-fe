"use client"

import { motion } from "framer-motion"
import { RotateCcw, Clock, Shield, AlertTriangle, CheckCircle, Package, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const returnTypes = [
  {
    icon: Package,
    title: "Unopened Medications",
    timeframe: "30 days",
    description: "Full refund for unopened, unexpired medications in original packaging.",
    eligible: true,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Shield,
    title: "Damaged Products",
    timeframe: "Immediate",
    description: "Immediate replacement or refund for products damaged during shipping.",
    eligible: true,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: AlertTriangle,
    title: "Prescription Medications",
    timeframe: "Case by case",
    description: "Special handling required due to safety and regulatory requirements.",
    eligible: false,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    icon: CheckCircle,
    title: "OTC Products",
    timeframe: "30 days",
    description: "Returns accepted for over-the-counter products with receipt.",
    eligible: true,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
]

const returnProcess = [
  {
    step: "1",
    title: "Contact Us",
    description: "Call our customer service team or submit a return request online."
  },
  {
    step: "2",
    title: "Return Authorization",
    description: "Receive a return authorization number and shipping instructions."
  },
  {
    step: "3",
    title: "Package & Ship",
    description: "Securely package items and ship using provided return label."
  },
  {
    step: "4",
    title: "Processing",
    description: "We process your return within 5-7 business days of receipt."
  }
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Return <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Easy returns and exchanges to ensure your complete satisfaction with our pharmaceutical products.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-4 h-4 mr-2" />
                30-Day Return Window
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-orange-800">
                <strong>Important:</strong> Due to safety regulations, prescription medications cannot be returned
                once dispensed. Please contact us immediately if you receive the wrong medication or have concerns.
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Return Types */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              What Can Be Returned?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding our return policy for different types of pharmaceutical products.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {returnTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${type.bgColor} rounded-full flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${type.color}`} />
                          </div>
                          <CardTitle className="text-lg font-heading">{type.title}</CardTitle>
                        </div>
                        <Badge variant={type.eligible ? "success" : "destructive"} className="text-xs">
                          {type.eligible ? "Returnable" : "Restricted"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Return Window:</span>
                        <span className="font-medium">{type.timeframe}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Return Process */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              How to Return Items
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step return process makes it easy to return eligible items.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {returnProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Return Conditions */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-heading">
              Return Conditions & Requirements
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Eligible for Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Items in original, unopened packaging</li>
                    <li>• Products within expiration date</li>
                    <li>• Undamaged items with original labels</li>
                    <li>• Valid proof of purchase</li>
                    <li>• Return within 30-day window</li>
                    <li>• Items not exposed to extreme temperatures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    Not Eligible for Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Opened prescription medications</li>
                    <li>• Controlled substances</li>
                    <li>• Expired products</li>
                    <li>• Items without original packaging</li>
                    <li>• Products damaged by customer</li>
                    <li>• Special order or compounded medications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Refund Information */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-heading">
              Refund & Exchange Information
            </h2>
            
            <div className="space-y-6 text-gray-600">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading">
                    Refund Processing
                  </h3>
                  <ul className="space-y-2">
                    <li>• Refunds processed within 5-7 business days of receipt</li>
                    <li>• Original payment method will be credited</li>
                    <li>• Shipping costs are non-refundable (except for our errors)</li>
                    <li>• Return shipping costs are customer responsibility</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading">
                    Exchanges
                  </h3>
                  <ul className="space-y-2">
                    <li>• Exchanges available for same product, different strength/quantity</li>
                    <li>• Price differences will be charged or refunded accordingly</li>
                    <li>• Exchange requests must be made within return window</li>
                    <li>• New prescription may be required for different medications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading">
                    Damaged or Incorrect Orders
                  </h3>
                  <ul className="space-y-2">
                    <li>• Immediate replacement or full refund provided</li>
                    <li>• Return shipping prepaid by Olwen Lifesciences</li>
                    <li>• Priority processing for safety-related issues</li>
                    <li>• Contact us within 48 hours of delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact for Returns */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Need to Return Something?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our customer service team is here to help with your return or exchange request.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">1-800-RETURNS</p>
                  <p className="text-sm text-gray-500">Mon-Fri 8AM-8PM EST</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">returns@olwenlifesciences.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="flex items-center mx-auto">
              <RotateCcw className="w-5 h-5 mr-2" />
              Start Return Request
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
