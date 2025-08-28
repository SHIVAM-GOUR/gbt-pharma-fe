import Link from "next/link"
import {
  Pill,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Award,
  Clock,
  CreditCard
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image
  from "next/image"
import logo from "../../../public/logo.png"

const footerLinks = {
  products: [
    { name: "Pain Relief", href: "/products?category=pain-relief" },
    { name: "Antibiotics", href: "/products?category=antibiotics" },
    { name: "Vitamins & Supplements", href: "/products?category=vitamins" },
    { name: "Prescription Medicines", href: "/products?prescription=true" },
  ],
  services: [
    { name: "Online Consultation", href: "/consultation" },
    { name: "Prescription Upload", href: "/prescription-upload" },
    { name: "Medicine Delivery", href: "/delivery" },
    { name: "Health Checkups", href: "/health-checkups" },
  ],
  support: [
    { name: "Customer Support", href: "/support" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Return Policy", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Licensing", href: "/licensing" },
    { name: "Compliance", href: "/compliance" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
]

const certifications = [
  { name: "FDA Approved", icon: Shield },
  { name: "ISO Certified", icon: Award },
  { name: "24/7 Support", icon: Clock },
  { name: "Secure Payments", icon: CreditCard },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Company Info */}
            <div className="lg:col-span-2">
              {/* <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading">Olwen</span>
                  <span className="block text-sm text-accent">Lifesciences</span>
                </div>
              </Link> */}
              <Link href="/" className="flex items-center">
                <div className="flex items-center justify-center w-40 md:w-50 h-40 md:h-50 rounded-lg overflow-hidden">
                  <Image
                    src={logo}
                    alt="Olwen Lifesciences Logo"
                    className="object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in healthcare. We provide quality medicines,
                expert guidance, and reliable service to ensure your health and well-being.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-300">
                    SS-9, Satyamev Arcade, Highway Road, Chandkheda, Ahmedabad, Pin:382424
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-300">+91 9414081152</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-300">prajapatrkp@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4 mt-0 md:mt-45 font-heading">Products</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4 font-heading">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-4 mt-0 md:mt-45 font-heading">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-4 mt-0 md:mt-45 font-heading">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          {/* <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 font-heading">Stay Updated</h3>
                <p className="text-gray-300">
                  Get the latest health tips, medicine updates, and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                />
                <Button variant="brand" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div> */}

          {/* Certifications */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-6 text-center font-heading">
              Trusted & Certified
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert) => {
                const Icon = cert.icon
                return (
                  <div key={cert.name} className="text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm text-gray-300">{cert.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Olwen Lifesciences. All rights reserved. | Licensed Pharmacy #PH-2024-001
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <Badge variant="trust">FDA Approved</Badge>
              <Badge variant="safety">Licensed Pharmacy</Badge>
              <Badge variant="approved">ISO 9001:2015</Badge>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
