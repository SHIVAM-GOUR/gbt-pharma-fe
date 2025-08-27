"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { loginUser } from "@/store/slices/authSlice"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await dispatch(loginUser(formData)).unwrap()
      router.push('/account')
    } catch (error) {
      console.error('Login failed:', error)
    }
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
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your account to access your orders and prescriptions
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl">Sign In</CardTitle>
              <div className="flex justify-center space-x-2 mt-4">
                <Badge variant="trust" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Login
                </Badge>
                <Badge variant="safety" className="text-xs">
                  HIPAA Compliant
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Password Field */}
                <div>
                  <label className="medical-form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your password"
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
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Demo Credentials */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">Demo Credentials:</p>
                  <p className="text-xs text-blue-600">Email: user@example.com</p>
                  <p className="text-xs text-blue-600">Password: password</p>
                </div>

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
                      Signing In...
                    </div>
                  ) : (
                    <>
                      Sign In
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
                  <span className="px-2 bg-white text-gray-500">Don&apos;t have an account?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/register">
                  Create New Account
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

          {/* Help Links */}
          <div className="mt-6 text-center space-x-6 text-sm">
            <Link href="/help" className="text-gray-500 hover:text-primary transition-colors">
              Need Help?
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
