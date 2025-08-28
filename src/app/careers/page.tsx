"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, Heart, TrendingUp, MapPin, Clock, DollarSign, GraduationCap } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, dental, vision, and wellness programs.",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Professional development opportunities, training programs, and career advancement.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Competitive salaries, performance bonuses, and comprehensive benefits package.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Continuing education support, conference attendance, and skill development programs.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
]

const openPositions = [
  {
    title: "Clinical Pharmacist",
    department: "Clinical Services",
    location: "Remote / On-site",
    type: "Full-time",
    experience: "3+ years",
    description: "Provide clinical pharmacy services, medication therapy management, and patient consultation.",
    requirements: ["PharmD degree", "State pharmacy license", "Clinical experience", "Strong communication skills"]
  },
  {
    title: "Pharmacy Technician",
    department: "Operations",
    location: "Multiple Locations",
    type: "Full-time",
    experience: "1+ years",
    description: "Support pharmacy operations, prescription processing, and customer service.",
    requirements: ["Pharmacy technician certification", "Attention to detail", "Customer service skills", "Computer proficiency"]
  },
  {
    title: "Software Engineer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Develop and maintain healthcare technology solutions and pharmacy management systems.",
    requirements: ["Bachelor's in Computer Science", "Full-stack development", "Healthcare IT experience", "Agile methodology"]
  },
  {
    title: "Quality Assurance Specialist",
    department: "Quality",
    location: "On-site",
    type: "Full-time",
    experience: "2+ years",
    description: "Ensure compliance with pharmaceutical regulations and quality standards.",
    requirements: ["Bachelor's degree", "QA experience", "Regulatory knowledge", "Attention to detail"]
  }
]

export default function CareersPage() {
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
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Join Our <span className="text-accent">Team</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Build your career with a leading pharmaceutical company committed to improving healthcare outcomes.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                <Users className="w-4 h-4 mr-2" />
                Growing Team of 100+ Professionals
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Join Us */}
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
              Why Choose Olwen Lifesciences?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job – we provide a platform for professional growth and meaningful impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Open Positions */}
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
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore exciting career opportunities across our organization.
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-heading mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {position.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge variant="outline" className="mb-2">
                          {position.experience}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline" className="flex-1">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
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
              Application Process
            </h2>
            <p className="text-lg text-gray-600">
              Our streamlined hiring process is designed to find the best fit for both you and our team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply Online", description: "Submit your application and resume through our careers portal." },
              { step: "2", title: "Initial Review", description: "Our HR team reviews your application and qualifications." },
              { step: "3", title: "Interview", description: "Phone or video interview with hiring manager and team members." },
              { step: "4", title: "Final Decision", description: "Reference checks, background verification, and job offer." }
            ].map((step, index) => (
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

      {/* Contact HR */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Questions About Careers?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our HR team is here to help you learn more about opportunities at Olwen Lifesciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Contact HR Team
              </Button>
              <Button size="lg" variant="outline" className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
