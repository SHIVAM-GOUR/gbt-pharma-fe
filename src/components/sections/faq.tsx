"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, MessageCircle } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I place an order for prescription medicines?",
    answer: "To order prescription medicines, simply browse our catalog, add items to your cart, and upload a valid prescription during checkout. Our licensed pharmacists will verify your prescription before processing your order.",
    category: "Orders"
  },
  {
    id: "2", 
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers. All transactions are secured with 256-bit SSL encryption for your safety.",
    category: "Payment"
  },
  {
    id: "3",
    question: "How fast is your delivery service?",
    answer: "We offer same-day delivery in metro areas and next-day delivery nationwide. Express delivery is available for urgent medications. Delivery times may vary based on your location and product availability.",
    category: "Delivery"
  },
  {
    id: "4",
    question: "Are your medicines genuine and FDA approved?",
    answer: "Yes, all our medicines are 100% genuine and FDA approved. We source directly from licensed manufacturers and maintain strict quality control standards. Each product comes with proper certification and batch tracking.",
    category: "Quality"
  },
  {
    id: "5",
    question: "Can I return or exchange medicines?",
    answer: "Due to safety regulations, we cannot accept returns of medicines once delivered. However, if you receive damaged or incorrect items, please contact us within 24 hours for a replacement or refund.",
    category: "Returns"
  },
  {
    id: "6",
    question: "Do you offer consultation with pharmacists?",
    answer: "Yes, we provide free consultation with licensed pharmacists. You can chat with our experts online, call our helpline, or schedule a video consultation to discuss your medications and health concerns.",
    category: "Support"
  },
  {
    id: "7",
    question: "How do I upload my prescription?",
    answer: "You can upload your prescription in several ways: during checkout, through your account dashboard, or by emailing it to prescriptions@olwenlifesciences.com. We accept PDF, JPG, and PNG formats.",
    category: "Prescriptions"
  },
  {
    id: "8",
    question: "Is my personal and medical information secure?",
    answer: "Absolutely. We are HIPAA compliant and use bank-level security to protect your personal and medical information. Your data is encrypted and never shared with third parties without your consent.",
    category: "Privacy"
  },
  {
    id: "9",
    question: "What if my medicine is out of stock?",
    answer: "If a medicine is out of stock, we'll notify you immediately and provide an estimated restock date. We can also suggest alternative medicines with your doctor's approval or help you find the medicine at partner pharmacies.",
    category: "Stock"
  },
  {
    id: "10",
    question: "Do you offer discounts or loyalty programs?",
    answer: "Yes, we offer various discounts including first-time buyer discounts, bulk order discounts, and a loyalty program where you earn points on every purchase. Senior citizens and students also get special discounts.",
    category: "Discounts"
  }
]

const categories = ["All", "Orders", "Payment", "Delivery", "Quality", "Returns", "Support", "Prescriptions", "Privacy", "Stock", "Discounts"]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory)

  return (
    <Section padding="xl" background="muted">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our services, ordering process, 
            and policies. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {faq.question}
                      </h3>
                      <span className="text-sm text-primary font-medium">
                        {faq.category}
                      </span>
                    </div>
                    <div className="ml-4">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 font-heading">
              Still have questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our support team is here to help you 24/7. Get in touch with us through any of these channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Call: +1-800-OLWEN-RX
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  )
}
