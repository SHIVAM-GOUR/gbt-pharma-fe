"use client"

import { useState } from "react"
import { Download, ExternalLink, Shield, Award, CheckCircle, Calendar } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter,
  DialogCloseButton 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Certificate {
  id: string
  name: string
  type: string
  issuer: string
  issueDate: string
  expiryDate: string
  certificateNumber: string
  description: string
  pdfUrl: string
  verificationUrl?: string
  status: "active" | "expired" | "pending"
}

interface CertificateDialogProps {
  open: boolean
  onClose: () => void
  certificateType: string
}

// Mock certificate data - in real app this would come from API
const certificates: Record<string, Certificate> = {
  "FDA Approved": {
    id: "fda-001",
    name: "FDA Drug Establishment Registration",
    type: "FDA Approved",
    issuer: "U.S. Food and Drug Administration",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-14",
    certificateNumber: "FDA-2024-001",
    description: "This certificate confirms that Olwen Lifesciences is registered with the FDA as a drug establishment and is authorized to manufacture, process, pack, and distribute pharmaceutical products in compliance with FDA regulations.",
    pdfUrl: "/certificates/fda-registration.pdf",
    verificationUrl: "https://www.fda.gov/verify/FDA-2024-001",
    status: "active"
  },
  "ISO Certified": {
    id: "iso-001", 
    name: "ISO 9001:2015 Quality Management System",
    type: "ISO Certified",
    issuer: "International Organization for Standardization",
    issueDate: "2024-02-20",
    expiryDate: "2027-02-19",
    certificateNumber: "ISO-QMS-2024",
    description: "This certificate demonstrates that Olwen Lifesciences has implemented and maintains a quality management system that meets the requirements of ISO 9001:2015 standard.",
    pdfUrl: "/certificates/iso-9001-certificate.pdf",
    verificationUrl: "https://www.iso.org/verify/ISO-QMS-2024",
    status: "active"
  },
  "WHO-GMP": {
    id: "who-001",
    name: "WHO Good Manufacturing Practice",
    type: "WHO-GMP",
    issuer: "World Health Organization",
    issueDate: "2024-03-10",
    expiryDate: "2026-03-09",
    certificateNumber: "WHO-GMP-2024",
    description: "This certificate confirms that Olwen Lifesciences manufacturing facilities comply with WHO Good Manufacturing Practice guidelines for pharmaceutical products.",
    pdfUrl: "/certificates/who-gmp-certificate.pdf",
    verificationUrl: "https://www.who.int/verify/WHO-GMP-2024",
    status: "active"
  },
  "HIPAA Compliant": {
    id: "hipaa-001",
    name: "HIPAA Compliance Certification",
    type: "HIPAA Compliant", 
    issuer: "U.S. Department of Health and Human Services",
    issueDate: "2024-01-01",
    expiryDate: "2025-12-31",
    certificateNumber: "HIPAA-2024",
    description: "This certificate confirms that Olwen Lifesciences is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) privacy and security requirements.",
    pdfUrl: "/certificates/hipaa-compliance.pdf",
    status: "active"
  }
}

export function CertificateDialog({ open, onClose, certificateType }: CertificateDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const certificate = certificates[certificateType]

  if (!certificate) {
    return null
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // In a real app, this would download the actual PDF
      // For demo purposes, we'll simulate a download
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a mock download
      const link = document.createElement('a')
      link.href = certificate.pdfUrl
      link.download = `${certificate.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleVerify = () => {
    if (certificate.verificationUrl) {
      window.open(certificate.verificationUrl, '_blank')
    }
  }

  const getStatusIcon = () => {
    switch (certificate.status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'expired':
        return <Shield className="w-5 h-5 text-red-600" />
      case 'pending':
        return <Calendar className="w-5 h-5 text-yellow-600" />
      default:
        return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = () => {
    switch (certificate.status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>{certificate.name}</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Certificate Details</p>
            </div>
          </div>
          <DialogCloseButton onClose={onClose} />
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Certificate Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <p className="font-medium text-gray-900">Certificate Status</p>
                <p className="text-sm text-gray-600">Current verification status</p>
              </div>
            </div>
            {getStatusBadge()}
          </div>

          {/* Certificate Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Issuing Authority</label>
                <p className="text-gray-900">{certificate.issuer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Certificate Number</label>
                <p className="text-gray-900 font-mono">{certificate.certificateNumber}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Issue Date</label>
                <p className="text-gray-900">{new Date(certificate.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <p className="text-gray-900">{new Date(certificate.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
            <p className="text-gray-600 leading-relaxed">{certificate.description}</p>
          </div>

          {/* PDF Preview Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-red-600">PDF</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Document</h3>
            <p className="text-gray-600 mb-4">Click download to view the full certificate document</p>
            <Button onClick={handleDownload} disabled={isDownloading} className="mr-3">
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </DialogBody>

        <DialogFooter>
          {certificate.verificationUrl && (
            <Button variant="outline" onClick={handleVerify}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Verify Online
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
