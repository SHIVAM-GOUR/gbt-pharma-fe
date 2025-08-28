"use client"

import { motion } from "framer-motion"
import { Newspaper, Calendar, Download, ExternalLink, Award, TrendingUp, Users } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const pressReleases = [
  {
    title: "Olwen Lifesciences Expands Digital Health Services",
    date: "December 15, 2024",
    category: "Company News",
    excerpt: "New telemedicine platform and AI-powered medication management tools launched to improve patient care.",
    link: "#"
  },
  {
    title: "Partnership with Leading Healthcare Systems Announced",
    date: "November 28, 2024",
    category: "Partnerships",
    excerpt: "Strategic partnerships with major hospital networks to enhance pharmaceutical care delivery.",
    link: "#"
  },
  {
    title: "Olwen Lifesciences Receives Industry Excellence Award",
    date: "October 10, 2024",
    category: "Awards",
    excerpt: "Recognized for outstanding innovation in digital pharmacy services and patient care.",
    link: "#"
  },
  {
    title: "Q3 2024 Growth Report: 150% Increase in Patient Enrollment",
    date: "September 22, 2024",
    category: "Financial",
    excerpt: "Strong quarterly performance driven by expanded services and improved patient satisfaction.",
    link: "#"
  }
]

const mediaKit = [
  {
    title: "Company Logo Package",
    description: "High-resolution logos in various formats (PNG, SVG, EPS)",
    size: "2.5 MB"
  },
  {
    title: "Executive Photos",
    description: "Professional headshots of leadership team",
    size: "8.1 MB"
  },
  {
    title: "Company Fact Sheet",
    description: "Key statistics, milestones, and company information",
    size: "1.2 MB"
  },
  {
    title: "Product Screenshots",
    description: "High-quality images of our digital platform",
    size: "15.3 MB"
  }
]

const awards = [
  {
    title: "Digital Health Innovation Award",
    organization: "Healthcare Technology Association",
    year: "2024"
  },
  {
    title: "Best Online Pharmacy Platform",
    organization: "Pharmacy Excellence Awards",
    year: "2024"
  },
  {
    title: "Customer Service Excellence",
    organization: "National Retail Federation",
    year: "2023"
  }
]

export default function PressPage() {
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
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Press & <span className="text-accent">Media</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Latest news, press releases, and media resources from Olwen Lifesciences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Latest News */}
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
              Latest Press Releases
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest announcements, partnerships, and company milestones.
            </p>
          </motion.div>

          <div className="space-y-6 mb-16">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{release.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {release.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-heading mb-3">{release.title}</CardTitle>
                        <p className="text-gray-600">{release.excerpt}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
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
              Media Kit
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Download high-quality assets and resources for media coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <p className="text-sm text-gray-500">File size: {item.size}</p>
                      </div>
                      <Button size="sm" className="ml-4 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Industry recognition for our commitment to excellence and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                      {award.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{award.organization}</p>
                    <Badge variant="outline">{award.year}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Company at a Glance
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Patients Served", value: "50,000+", color: "text-blue-600", bgColor: "bg-blue-100" },
              { icon: TrendingUp, label: "Growth Rate", value: "150%", color: "text-green-600", bgColor: "bg-green-100" },
              { icon: Award, label: "Industry Awards", value: "12", color: "text-purple-600", bgColor: "bg-purple-100" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Media Contact */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Media Inquiries
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading">
                Press Contact
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Sarah Johnson</strong></p>
                <p>Director of Communications</p>
                <p>press@olwenlifesciences.com</p>
                <p>+1-800-OLWEN-PR</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
