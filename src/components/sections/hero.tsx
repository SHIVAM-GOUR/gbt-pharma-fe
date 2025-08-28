"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Shield, Clock, Award, Truck, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"

const trustIndicators = [
  { icon: Shield, label: "FDA Approved", description: "All medicines are FDA approved and certified" },
  { icon: Clock, label: "24/7 Support", description: "Round-the-clock customer support" },
  { icon: Award, label: "Licensed Pharmacy", description: "Fully licensed and regulated pharmacy" },
  { icon: Truck, label: "Fast Delivery", description: "Same-day delivery in metro areas" },
]

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Medicines Available" },
  { value: "99.9%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Available" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="trust">
                <Shield className="w-3 h-3 mr-1" />
                FDA Approved Pharmacy
              </Badge>
              <Badge variant="safety">
                <Award className="w-3 h-3 mr-1" />
                Licensed & Certified
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your Trusted{" "}
              <span className="text-primary">Healthcare</span>
              <br />
              Partner for{" "}
              <span className="text-accent">Quality Medicines</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the convenience of online pharmacy with expert guidance, 
              quality assurance, and fast delivery. Your health is our priority.
            </motion.p>

            {/* Search Bar */}
            {/* <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for medicines..."
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  />
                </div>
                <Button size="lg" variant="medical" className="group">
                  Search
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="xl" asChild className="group">
                <Link href="/products">
                  Explore Medicines
                 
                </Link>
                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="xl" asChild>
                <Link href="/consultation">
                  Online Consultation
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary font-heading">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual/Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">Rx</span>
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium text-lg">Quality Healthcare</p>
                    <p className="text-gray-500">Trusted by thousands</p>
                  </div>
                </div>
              </div>

              {/* Floating Trust Indicators */}
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon
                return (
                  <motion.div
                    key={indicator.label}
                    className="absolute bg-white rounded-xl shadow-lg p-4 border"
                    style={{
                      top: `${20 + index * 15}%`,
                      left: index % 2 === 0 ? '-10%' : 'auto',
                      right: index % 2 === 1 ? '-10%' : 'auto',
                    }}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                      duration: 3 + index * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{indicator.label}</div>
                        <div className="text-xs text-gray-500 max-w-[120px]">{indicator.description}</div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse-medical"></div>
        </div>
      </motion.div>
    </section>
  )
}
