"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Award, Clock, Truck, Phone, Lock, CheckCircle, Users } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CertificateDialog } from "@/components/dialogs/certificate-dialog"

const trustFeatures = [
  {
    icon: Shield,
    title: "FDA Approved",
    description: "All our medicines are FDA approved and meet the highest safety standards",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Award,
    title: "Licensed Pharmacy",
    description: "Fully licensed and regulated pharmacy with proper certifications",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "Your personal and payment information is protected with bank-level security",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description: "Every product undergoes strict quality checks before reaching you",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  }
]

const serviceFeatures = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your healthcare needs",
    stats: "Available 24/7"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery in metro areas, next-day delivery nationwide",
    stats: "Same-day delivery"
  },
  {
    icon: Phone,
    title: "Expert Consultation",
    description: "Free consultation with licensed pharmacists and healthcare experts",
    stats: "Free consultation"
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Over 50,000 satisfied customers trust us with their healthcare",
    stats: "50,000+ customers"
  }
]

const certifications = [
  { name: "FDA Approved", badge: "FDA-2024-001", hasDialog: true },
  { name: "ISO Certified", badge: "Quality Management", hasDialog: true },
  { name: "Licensed Pharmacy", badge: "PH-2024-001", hasDialog: false },
  { name: "HIPAA Compliant", badge: "Privacy Protected", hasDialog: true },
  { name: "SSL Secured", badge: "256-bit Encryption", hasDialog: false },
  { name: "PCI DSS", badge: "Payment Security", hasDialog: false }
]

export function TrustSafety() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  const handleCertificateClick = (certName: string, hasDialog: boolean) => {
    if (hasDialog) {
      setSelectedCertificate(certName)
    }
  }
  return (
    <Section padding="xl" background="medical">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Your <span className="text-primary">Trust</span> & <span className="text-secondary">Safety</span> First
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We prioritize your health and safety above everything else. Our commitment to 
            quality, security, and reliability makes us your trusted healthcare partner.
          </p>
        </motion.div>
      </div>

      {/* Trust Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Service Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {serviceFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {feature.stats}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
      >
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
            Certifications & Compliance
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We maintain the highest standards of quality, safety, and compliance 
            with all regulatory requirements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center ${cert.hasDialog ? 'cursor-pointer group' : ''}`}
              onClick={() => handleCertificateClick(cert.name, cert.hasDialog)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${cert.hasDialog ? 'group-hover:scale-110 group-hover:shadow-lg group-hover:from-primary/20 group-hover:to-secondary/20' : ''}`}>
                <Shield className={`w-8 h-8 text-primary transition-colors ${cert.hasDialog ? 'group-hover:text-primary/80' : ''}`} />
              </div>
              <h4 className={`text-sm font-semibold text-gray-900 mb-1 ${cert.hasDialog ? 'group-hover:text-primary' : ''}`}>
                {cert.name}
              </h4>
              <p className="text-xs text-gray-500">
                {cert.badge}
              </p>
              {cert.hasDialog && (
                <p className="text-xs text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view certificate
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-heading">99.9%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-heading">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-heading">5K+</div>
              <div className="text-sm text-gray-600">Medicines Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-heading">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Certificate Dialog */}
      <CertificateDialog
        open={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
        certificateType={selectedCertificate || ""}
      />
    </Section>
  )
}
