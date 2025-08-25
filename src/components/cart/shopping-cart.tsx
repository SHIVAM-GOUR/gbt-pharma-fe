"use client"

import { Fragment } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Trash2, Upload } from "lucide-react"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { 
  closeCart, 
  removeFromCart, 
  updateQuantity, 
  updatePrescription 
} from "@/store/slices/cartSlice"
import { formatPrice } from "@/lib/utils"

export function ShoppingCart() {
  const dispatch = useAppDispatch()
  const { isOpen, items, total, subtotal, tax, shipping, discount } = useAppSelector((state) => state.cart)

  const handleClose = () => {
    dispatch(closeCart())
  }

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(itemId))
    } else {
      dispatch(updateQuantity({ id: itemId, quantity }))
    }
  }

  const handlePrescriptionUpload = (itemId: string, file: File) => {
    // In a real app, you would upload the file to a server
    // For now, we'll just simulate it
    const fileUrl = URL.createObjectURL(file)
    dispatch(updatePrescription({ id: itemId, prescriptionFile: fileUrl }))
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Your cart is empty
                              </h3>
                              <p className="text-gray-500 mb-6">
                                Add some medicines to get started
                              </p>
                              <Button asChild onClick={handleClose}>
                                <Link href="/products">
                                  Continue Shopping
                                </Link>
                              </Button>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              <AnimatePresence>
                                {items.map((item) => (
                                  <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                        <span className="text-sm font-bold text-primary">Rx</span>
                                      </div>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <Link 
                                              href={`/products/${item.product.id}`}
                                              onClick={handleClose}
                                              className="hover:text-primary"
                                            >
                                              {item.product.name}
                                            </Link>
                                          </h3>
                                          <p className="ml-4">{formatPrice(item.product.price)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.product.manufacturer}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                          <Badge variant="outline" className="text-xs">
                                            {item.product.strength}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs capitalize">
                                            {item.product.form}
                                          </Badge>
                                        </div>
                                      </div>

                                      {/* Prescription Upload */}
                                      {item.product.prescriptionRequired && (
                                        <div className="mt-3">
                                          {item.prescriptionUploaded ? (
                                            <div className="flex items-center gap-2">
                                              <Badge variant="success" className="text-xs">
                                                Prescription Uploaded
                                              </Badge>
                                            </div>
                                          ) : (
                                            <div className="p-2 bg-warning/10 border border-warning/20 rounded-md">
                                              <p className="text-xs text-warning mb-2">
                                                Prescription required for this medicine
                                              </p>
                                              <label className="cursor-pointer">
                                                <input
                                                  type="file"
                                                  accept=".pdf,.jpg,.jpeg,.png"
                                                  className="hidden"
                                                  onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                      handlePrescriptionUpload(item.id, file)
                                                    }
                                                  }}
                                                />
                                                <div className="flex items-center gap-2 text-xs text-warning hover:text-warning/80">
                                                  <Upload className="w-3 h-3" />
                                                  Upload Prescription
                                                </div>
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-500">Qty:</span>
                                          <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                              className="p-1 hover:bg-gray-100"
                                            >
                                              <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="px-3 py-1 text-center min-w-[40px]">
                                              {item.quantity}
                                            </span>
                                            <button
                                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                              className="p-1 hover:bg-gray-100"
                                            >
                                              <Plus className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.li>
                                ))}
                              </AnimatePresence>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {/* Order Summary */}
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">{formatPrice(subtotal)}</span>
                          </div>
                          {discount > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Discount</span>
                              <span className="text-green-600">-{formatPrice(discount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax</span>
                            <span className="text-gray-900">{formatPrice(tax)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">
                              {shipping === 0 ? 'Free' : formatPrice(shipping)}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 pt-2">
                            <div className="flex justify-between text-base font-medium">
                              <span>Total</span>
                              <span>{formatPrice(total)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="space-y-3">
                          <Button asChild className="w-full" size="lg">
                            <Link href="/checkout" onClick={handleClose}>
                              Proceed to Checkout
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleClose}
                            asChild
                          >
                            <Link href="/products">
                              Continue Shopping
                            </Link>
                          </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-6 flex justify-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Badge variant="trust" className="text-xs">
                              Secure Checkout
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="safety" className="text-xs">
                              FDA Approved
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
