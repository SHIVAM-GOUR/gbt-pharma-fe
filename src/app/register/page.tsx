"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { registerUser } from "@/store/slices/authSlice"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords don't match"
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!agreeToTerms) {
      return "Please agree to the terms and conditions"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      alert(validationError)
      return
    }
    
    try {
      await dispatch(registerUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      })).unwrap()
      router.push('/account')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <span className="text-white font-bold text-lg">Rx</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground font-heading">Olwen</span>
                <span className="block text-sm text-accent font-medium">Lifesciences</span>
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join thousands of customers who trust us with their healthcare needs
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <div className="flex justify-center space-x-2 mt-4">
                <Badge variant="trust" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Registration
                </Badge>
                <Badge variant="safety" className="text-xs">
                  HIPAA Compliant
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="medical-form-label">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="medical-form-label">Last Name</label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="medical-form-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="medical-form-label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="medical-form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength(formData.password))}`}
                            style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {getStrengthText(passwordStrength(formData.password))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="medical-form-label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2">
                      {formData.password === formData.confirmPassword ? (
                        <div className="flex items-center text-green-600 text-sm">
                          <Check className="w-4 h-4 mr-1" />
                          Passwords match
                        </div>
                      ) : (
                        <div className="text-red-600 text-sm">
                          Passwords don&apos;t match
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscribeNewsletter}
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">
                      Subscribe to our newsletter for health tips and special offers
                    </span>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full group" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login">
                  Sign In Instead
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-blue-600" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
