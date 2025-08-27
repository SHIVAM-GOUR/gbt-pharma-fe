"use client"

import { useState } from "react"
import { Trash2, AlertTriangle, X } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  category: string
  manufacturer: string
  price: number
  stock: number
  sku: string
  status: string
}

interface DeleteConfirmationDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
  onConfirm: (productId: number) => void
  isDeleting?: boolean
}

export function DeleteConfirmationDialog({ 
  open, 
  onClose, 
  product, 
  onConfirm, 
  isDeleting = false 
}: DeleteConfirmationDialogProps) {
  const [confirmationText, setConfirmationText] = useState("")
  const [showAdvancedConfirmation, setShowAdvancedConfirmation] = useState(false)

  if (!product) return null

  const isConfirmationValid = confirmationText.toLowerCase() === "delete"
  const hasStock = product.stock > 0

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm(product.id)
      setConfirmationText("")
      setShowAdvancedConfirmation(false)
    }
  }

  const handleClose = () => {
    setConfirmationText("")
    setShowAdvancedConfirmation(false)
    onClose()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'inactive':
        return <Badge variant="warning">Inactive</Badge>
      case 'discontinued':
        return <Badge variant="destructive">Discontinued</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} size="md">
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-red-900">Delete Product</DialogTitle>
              <p className="text-sm text-red-600 mt-1">This action cannot be undone</p>
            </div>
          </div>
          <DialogCloseButton onClose={handleClose} />
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Warning: Permanent Deletion</h4>
                <p className="text-sm text-red-800">
                  You are about to permanently delete this product from your inventory. 
                  This action will remove all associated data and cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Product to be deleted:</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SKU:</span>
                <span className="font-mono text-gray-900">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-gray-900">{product.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Stock:</span>
                <span className={`font-medium ${hasStock ? 'text-orange-600' : 'text-gray-900'}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Stock Warning */}
          {hasStock && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Stock Alert</h4>
                  <p className="text-sm text-orange-800">
                    This product currently has <strong>{product.stock} units</strong> in stock. 
                    Deleting this product will also remove all inventory records.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Impact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What will be deleted:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Product information and details</li>
              <li>• All inventory records</li>
              <li>• Product images and attachments</li>
              <li>• Sales history and analytics</li>
              <li>• Customer reviews and ratings</li>
              <li>• Any pending orders for this product</li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Confirmation Required</h4>
              {!showAdvancedConfirmation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedConfirmation(true)}
                >
                  I understand the risks
                </Button>
              )}
            </div>

            {showAdvancedConfirmation && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  To confirm deletion, please type <strong>&quot;delete&quot;</strong> in the field below:
                </p>
                <Input
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Type 'delete' to confirm"
                  className={`${
                    confirmationText && !isConfirmationValid 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isConfirmationValid 
                      ? 'border-green-500 focus:ring-green-500' 
                      : ''
                  }`}
                />
                {confirmationText && !isConfirmationValid && (
                  <p className="text-sm text-red-600">
                    Please type &quot;delete&quot; exactly as shown to confirm.
                  </p>
                )}
                {isConfirmationValid && (
                  <p className="text-sm text-green-600">
                    ✓ Confirmation text is correct.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Alternative Actions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Consider these alternatives:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Deactivate</strong> the product instead of deleting it</p>
              <p>• <strong>Mark as discontinued</strong> to stop new sales while keeping records</p>
              <p>• <strong>Transfer stock</strong> to another product before deletion</p>
              <p>• <strong>Archive</strong> the product for future reference</p>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="flex-col space-y-3">
          <div className="flex space-x-3 w-full">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={!showAdvancedConfirmation || !isConfirmationValid || isDeleting}
              className="flex-1"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </>
              )}
            </Button>
          </div>
          
          {!showAdvancedConfirmation && (
            <p className="text-xs text-gray-500 text-center">
              Click &quot;I understand the risks&quot; to proceed with deletion
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
