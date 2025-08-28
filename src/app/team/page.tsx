"use client"

import { motion } from "framer-motion"
import { Users, Award, Heart, Linkedin, Twitter, Mail } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const leadership = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Executive Officer",
    image: "/api/placeholder/300/300",
    bio: "20+ years in pharmaceutical leadership with expertise in digital health transformation.",
    credentials: ["PharmD", "MBA", "Board Certified"],
    specialties: ["Digital Health", "Pharmaceutical Operations", "Strategic Leadership"]
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Chief Medical Officer",
    image: "/api/placeholder/300/300",
    bio: "Renowned physician with extensive experience in clinical pharmacy and patient care.",
    credentials: ["MD", "PharmD", "BCPS"],
    specialties: ["Clinical Pharmacy", "Patient Safety", "Drug Therapy Management"]
  },
  {
    name: "Dr. Emily Watson",
    role: "Chief Pharmacy Officer",
    image: "/api/placeholder/300/300",
    bio: "Expert pharmacist focused on medication therapy optimization and pharmaceutical care.",
    credentials: ["PharmD", "BCACP", "CDE"],
    specialties: ["Medication Therapy", "Clinical Consultation", "Quality Assurance"]
  },
  {
    name: "James Thompson",
    role: "Chief Technology Officer",
    image: "/api/placeholder/300/300",
    bio: "Technology leader specializing in healthcare IT and pharmaceutical systems.",
    credentials: ["MS Computer Science", "CISSP", "PMP"],
    specialties: ["Healthcare IT", "System Architecture", "Data Security"]
  }
]

const departments = [
  {
    icon: Users,
    name: "Clinical Team",
    count: "25+ Pharmacists",
    description: "Licensed pharmacists providing expert medication consultation and clinical services.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Heart,
    name: "Patient Care",
    count: "15+ Specialists",
    description: "Dedicated patient care coordinators ensuring exceptional service and support.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Award,
    name: "Quality Assurance",
    count: "10+ Experts",
    description: "Quality control specialists maintaining the highest standards of pharmaceutical care.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
]

export default function TeamPage() {
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
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Our <span className="text-accent">Team</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Meet the dedicated professionals committed to providing exceptional pharmaceutical care and service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Leadership Team */}
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
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings together decades of pharmaceutical expertise and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 font-heading">
                          {leader.name}
                        </h3>
                        <p className="text-primary font-medium mb-3">{leader.role}</p>
                        <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">CREDENTIALS</p>
                            <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                              {leader.credentials.map((cred) => (
                                <Badge key={cred} variant="outline" className="text-xs">
                                  {cred}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">SPECIALTIES</p>
                            <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                              {leader.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center md:justify-start space-x-2 mt-4">
                          <Button size="sm" variant="outline" className="p-2">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-2">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments */}
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
              Our Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized teams working together to deliver comprehensive pharmaceutical services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => {
              const Icon = dept.icon
              return (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${dept.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <Icon className={`w-8 h-8 ${dept.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                        {dept.name}
                      </h3>
                      <p className="text-primary font-medium mb-4">{dept.count}</p>
                      <p className="text-gray-600">{dept.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Join Our Team */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for passionate professionals who share our commitment to 
              improving healthcare through innovative pharmaceutical services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact HR
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Values */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-heading">
              Our Values
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Excellence</h3>
                  <p>We strive for excellence in everything we do, from patient care to operational efficiency.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Innovation</h3>
                  <p>We embrace new technologies and approaches to improve pharmaceutical care and patient outcomes.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Integrity</h3>
                  <p>We conduct our business with the highest ethical standards and transparency.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">Compassion</h3>
                  <p>We treat every patient with empathy, respect, and genuine care for their well-being.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
