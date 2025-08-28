"use client"

import { motion } from "framer-motion"
import { Award, Shield, FileCheck, Building, Globe, CheckCircle, Calendar, Download } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const licenses = [
  {
    icon: Shield,
    title: "FDA Registration",
    number: "FDA-12345-RX",
    issuer: "U.S. Food and Drug Administration",
    status: "Active",
    expiry: "December 2025",
    description: "Authorized to distribute prescription and OTC medications",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Award,
    title: "DEA License",
    number: "DEA-AB1234567",
    issuer: "Drug Enforcement Administration",
    status: "Active",
    expiry: "March 2026",
    description: "Licensed to handle controlled substances",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Building,
    title: "State Pharmacy License",
    number: "SPL-2024-001",
    issuer: "State Board of Pharmacy",
    status: "Active",
    expiry: "June 2025",
    description: "Licensed pharmacy operations in multiple states",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Globe,
    title: "International Certification",
    number: "ISO-13485:2016",
    issuer: "International Organization for Standardization",
    status: "Active",
    expiry: "September 2025",
    description: "Quality management systems for medical devices",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

const certifications = [
  {
    name: "NABP Accreditation",
    description: "National Association of Boards of Pharmacy verified",
    status: "Verified"
  },
  {
    name: "HIPAA Compliance",
    description: "Health Insurance Portability and Accountability Act",
    status: "Certified"
  },
  {
    name: "PCI DSS Level 1",
    description: "Payment Card Industry Data Security Standard",
    status: "Compliant"
  },
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control 2 audit",
    status: "Audited"
  }
]

export default function LicensingPage() {
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
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Licensing & <span className="text-accent">Certifications</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Our comprehensive licenses and certifications ensure the highest standards of pharmaceutical care.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Fully Licensed & Compliant
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Licenses */}
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
              Our Licenses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain all required licenses and registrations to operate as a trusted pharmaceutical provider.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {licenses.map((license, index) => {
              const Icon = license.icon
              return (
                <motion.div
                  key={license.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${license.bgColor} rounded-full flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${license.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-heading">{license.title}</CardTitle>
                            <p className="text-sm text-gray-500">{license.number}</p>
                          </div>
                        </div>
                        <Badge variant="success" className="text-xs">
                          {license.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{license.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Issued by:</span>
                          <span className="font-medium">{license.issuer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Expires:</span>
                          <span className="font-medium">{license.expiry}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Additional Certifications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Beyond basic licensing, we maintain additional certifications that demonstrate our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 font-heading">
                        {cert.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {cert.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <FileCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                  Verify Our Licenses
                </h3>
                <p className="text-gray-600 mb-6">
                  All our licenses and certifications are publicly verifiable through the respective regulatory bodies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download License Copies
                  </Button>
                  <Button className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Verify Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Regulatory Compliance */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-heading">
              Regulatory Compliance
            </h2>
            <div className="prose prose-lg max-w-none text-left">
              <div className="space-y-6 text-gray-600">
                <p>
                  Olwen Lifesciences operates under strict regulatory oversight and maintains compliance with all applicable laws and regulations governing pharmaceutical operations.
                </p>
                <p>
                  Our licensing and certification status is regularly reviewed and updated to ensure continuous compliance with evolving regulatory requirements.
                </p>
                <p>
                  We are committed to transparency and welcome inquiries about our licensing status from patients, healthcare providers, and regulatory authorities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
