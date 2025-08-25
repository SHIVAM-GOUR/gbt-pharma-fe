"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Globe, Heart, Target, Eye, Lightbulb } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Medicines Available" },
  { value: "99.9%", label: "Customer Satisfaction" },
]

const values = [
  {
    icon: Heart,
    title: "Patient-Centric Care",
    description: "Every decision we make is guided by what's best for our patients' health and well-being.",
    color: "text-red-600"
  },
  {
    icon: Shield,
    title: "Quality & Safety",
    description: "We maintain the highest standards of quality and safety in all our pharmaceutical products.",
    color: "text-blue-600"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate to bring cutting-edge healthcare solutions to our customers.",
    color: "text-yellow-600"
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Making quality healthcare accessible and affordable for everyone, everywhere.",
    color: "text-green-600"
  }
]

const certifications = [
  {
    title: "FDA Approved",
    description: "All our medicines are approved by the Food and Drug Administration",
    badge: "FDA-2024-001"
  },
  {
    title: "ISO 9001:2015",
    description: "Quality Management System certification for consistent quality",
    badge: "ISO-QMS-2024"
  },
  {
    title: "WHO-GMP",
    description: "World Health Organization Good Manufacturing Practice certified",
    badge: "WHO-GMP-2024"
  },
  {
    title: "HIPAA Compliant",
    description: "Full compliance with Health Insurance Portability and Accountability Act",
    badge: "HIPAA-2024"
  }
]

const timeline = [
  {
    year: "2009",
    title: "Foundation",
    description: "Olwen Lifesciences was founded with a mission to make quality healthcare accessible to all."
  },
  {
    year: "2012",
    title: "FDA Approval",
    description: "Received our first FDA approval and launched our online pharmacy platform."
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Expanded operations nationwide and introduced 24/7 customer support."
  },
  {
    year: "2018",
    title: "Innovation",
    description: "Launched telemedicine services and prescription management system."
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Introduced AI-powered drug interaction checker and mobile app."
  },
  {
    year: "2024",
    title: "Present",
    description: "Serving 50,000+ customers with 5,000+ medicines and expanding globally."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section padding="xl" background="medical">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
              About <span className="text-primary">Olwen Lifesciences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your trusted partner in healthcare for over 15 years. We're committed to providing 
              quality medicines, expert guidance, and exceptional service to improve lives worldwide.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section padding="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Mission, Vision, Values */}
      <Section padding="xl" background="muted">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, affordable, and quality healthcare solutions that improve 
                  the lives of our customers while maintaining the highest standards of safety and efficacy.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted online pharmacy, revolutionizing healthcare 
                  delivery through innovation, technology, and unwavering commitment to patient care.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, compassion, excellence, and innovation guide everything we do. 
                  We believe in putting patients first and building lasting relationships based on trust.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Core Values Detail */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values shape our culture and guide our decisions every day
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${value.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Timeline */}
      <Section padding="xl" background="muted">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a small startup to a trusted healthcare partner - here's how we've grown
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-center mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index < timeline.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-16 bg-gray-300" />
              )}
              
              {/* Year Badge */}
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-8 relative z-10">
                {item.year}
              </div>
              
              {/* Content */}
              <Card className="flex-1">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Certifications & Compliance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of quality, safety, and regulatory compliance
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {cert.badge}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" background="primary">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Olwen Lifesciences 
              for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Medicines
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
