"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/store"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
  const { items, total, subtotal, tax, shipping, discount } = useAppSelector((state) => state.cart)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handlePlaceOrder = () => {
    // Handle order placement
    console.log('Placing order...', formData)
    // Redirect to order confirmation
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some medicines to proceed with checkout</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/products">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
              </div>
              
              {/* Progress Steps */}
              <div className="hidden md:flex items-center space-x-4">
                {[
                  { number: 1, title: "Information" },
                  { number: 2, title: "Shipping" },
                  { number: 3, title: "Payment" },
                ].map((stepItem) => (
                  <div key={stepItem.number} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.number 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > stepItem.number ? <Check className="w-4 h-4" /> : stepItem.number}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{stepItem.title}</span>
                    {stepItem.number < 3 && (
                      <div className="w-8 h-px bg-gray-300 mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="medical-form-label">First Name</label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="medical-form-label">Last Name</label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="medical-form-label">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="medical-form-label">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="medical-form-label">Street Address</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter street address"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="medical-form-label">City</label>
                          <Input
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="medical-form-label">State</label>
                          <Input
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="medical-form-label">ZIP Code</label>
                          <Input
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            placeholder="Enter ZIP code"
                          />
                        </div>
                        <div>
                          <label className="medical-form-label">Country</label>
                          <select
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="medical-form-input"
                          >
                            <option value="USA">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <CreditCard className="w-5 h-5" />
                          <span>Credit/Debit Card</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <Truck className="w-5 h-5" />
                          <span>Cash on Delivery</span>
                        </label>
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <label className="medical-form-label">Card Number</label>
                            <Input
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div>
                            <label className="medical-form-label">Name on Card</label>
                            <Input
                              value={formData.nameOnCard}
                              onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                              placeholder="Enter name as on card"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="medical-form-label">Expiry Date</label>
                              <Input
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="medical-form-label">CVV</label>
                              <Input
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  
                  {step < 3 ? (
                    <Button onClick={handleNextStep}>
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700">
                      Place Order
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">Rx</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure SSL encrypted checkout</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
