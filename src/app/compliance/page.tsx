"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, FileText, Lock, Users, AlertTriangle, Clock, Award } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const complianceAreas = [
  {
    icon: Shield,
    title: "HIPAA Compliance",
    description: "Protecting patient health information with strict privacy and security measures.",
    status: "100% Compliant",
    progress: 100,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Lock,
    title: "Data Security",
    description: "Advanced encryption and security protocols to protect sensitive information.",
    status: "SOC 2 Certified",
    progress: 100,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: FileText,
    title: "FDA Regulations",
    description: "Full compliance with FDA guidelines for pharmaceutical distribution.",
    status: "Verified",
    progress: 100,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Users,
    title: "Quality Assurance",
    description: "Comprehensive quality management systems and regular audits.",
    status: "ISO Certified",
    progress: 100,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

const regulations = [
  {
    name: "21 CFR Part 820",
    description: "Quality System Regulation for medical devices",
    compliance: "Full Compliance"
  },
  {
    name: "21 CFR Part 211",
    description: "Current Good Manufacturing Practice for pharmaceuticals",
    compliance: "Audited Annually"
  },
  {
    name: "USP <797>",
    description: "Pharmaceutical compounding standards",
    compliance: "Certified"
  },
  {
    name: "DSCSA",
    description: "Drug Supply Chain Security Act requirements",
    compliance: "Implemented"
  }
]

export default function CompliancePage() {
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
              Regulatory <span className="text-accent">Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Maintaining the highest standards of compliance across all pharmaceutical regulations and industry best practices.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                100% Regulatory Compliant
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Compliance Areas */}
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
              Compliance Framework
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive compliance program ensures adherence to all applicable regulations and standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {complianceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${area.bgColor} rounded-full flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${area.color}`} />
                          </div>
                          <CardTitle className="text-lg font-heading">{area.title}</CardTitle>
                        </div>
                        <Badge variant="success" className="text-xs">
                          {area.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{area.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Compliance Level</span>
                          <span className="font-medium">{area.progress}%</span>
                        </div>
                        <Progress value={area.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Regulatory Standards */}
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
              Regulatory Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We adhere to all relevant pharmaceutical regulations and industry standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {regulations.map((regulation, index) => (
              <motion.div
                key={regulation.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 font-heading">
                        {regulation.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {regulation.compliance}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{regulation.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Process */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Our Compliance Process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                Documentation
              </h3>
              <p className="text-gray-600">
                Comprehensive documentation of all processes, procedures, and compliance activities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                Regular Audits
              </h3>
              <p className="text-gray-600">
                Scheduled internal and external audits to ensure ongoing compliance with all regulations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                Continuous Improvement
              </h3>
              <p className="text-gray-600">
                Ongoing enhancement of our compliance program based on industry best practices.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Compliance Statement */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                    Compliance Commitment
                  </h3>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="text-center mb-6">
                    Olwen Lifesciences is committed to maintaining the highest standards of regulatory compliance 
                    in all aspects of our pharmaceutical operations.
                  </p>
                  <div className="space-y-4">
                    <p>
                      We continuously monitor regulatory changes and update our procedures to ensure ongoing compliance. 
                      Our dedicated compliance team works closely with regulatory authorities and industry organizations 
                      to stay current with evolving requirements.
                    </p>
                    <p>
                      Any compliance concerns or questions can be reported through our confidential compliance hotline 
                      or directly to our Chief Compliance Officer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
