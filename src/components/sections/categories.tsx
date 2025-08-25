"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "pain-relief",
    name: "Pain Relief",
    description: "Effective solutions for pain management and inflammation",
    icon: "💊",
    productCount: 150,
    color: "from-red-100 to-pink-100",
    borderColor: "border-red-200"
  },
  {
    id: "antibiotics",
    name: "Antibiotics",
    description: "Prescription antibiotics for bacterial infections",
    icon: "🦠",
    productCount: 89,
    color: "from-blue-100 to-cyan-100",
    borderColor: "border-blue-200"
  },
  {
    id: "vitamins",
    name: "Vitamins & Supplements",
    description: "Essential vitamins and nutritional supplements",
    icon: "🌿",
    productCount: 200,
    color: "from-green-100 to-emerald-100",
    borderColor: "border-green-200"
  },
  {
    id: "heart-health",
    name: "Heart Health",
    description: "Cardiovascular medicines and heart care products",
    icon: "❤️",
    productCount: 75,
    color: "from-rose-100 to-red-100",
    borderColor: "border-rose-200"
  },
  {
    id: "diabetes",
    name: "Diabetes Care",
    description: "Diabetes management and blood sugar control",
    icon: "🩺",
    productCount: 65,
    color: "from-purple-100 to-violet-100",
    borderColor: "border-purple-200"
  },
  {
    id: "respiratory",
    name: "Respiratory",
    description: "Treatments for asthma, allergies, and breathing issues",
    icon: "🫁",
    productCount: 95,
    color: "from-sky-100 to-blue-100",
    borderColor: "border-sky-200"
  },
  {
    id: "digestive",
    name: "Digestive Health",
    description: "Solutions for stomach, digestion, and gut health",
    icon: "🍃",
    productCount: 110,
    color: "from-amber-100 to-yellow-100",
    borderColor: "border-amber-200"
  },
  {
    id: "skincare",
    name: "Skin Care",
    description: "Dermatological treatments and skin health products",
    icon: "✨",
    productCount: 85,
    color: "from-pink-100 to-rose-100",
    borderColor: "border-pink-200"
  }
]

export function Categories() {
  return (
    <Section padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find the right medicine for your health needs. Browse our comprehensive 
            categories of quality pharmaceutical products.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${category.borderColor} hover:border-primary`}>
              <CardContent className="p-6">
                <Link href={`/products?category=${category.id}`} className="block">
                  {/* Icon and Background */}
                  <div className={`w-full h-32 bg-gradient-to-br ${category.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-4xl">{category.icon}</span>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 rounded-full animate-float" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Category Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors font-heading">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.productCount} products
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Popular Searches */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 font-heading">
          Popular Searches
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Paracetamol",
            "Vitamin D",
            "Blood Pressure",
            "Diabetes",
            "Antibiotics",
            "Pain Relief",
            "Cough Syrup",
            "Allergy Medicine"
          ].map((search, index) => (
            <motion.div
              key={search}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-primary hover:text-white transition-colors"
              >
                <Link href={`/products?search=${search.toLowerCase()}`}>
                  {search}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
