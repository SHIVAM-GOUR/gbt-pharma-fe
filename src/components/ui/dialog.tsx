"use client"

import * as React from "react"
import { Fragment } from "react"
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface DialogBodyProps {
  children: React.ReactNode
  className?: string
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, children, className, size = "md" }, ref) => {
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg", 
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-7xl"
    }

    return (
      <Transition.Root show={open} as={Fragment}>
        <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <HeadlessDialog.Panel
                  ref={ref}
                  className={cn(
                    "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full",
                    sizeClasses[size],
                    className
                  )}
                >
                  {children}
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition.Root>
    )
  }
)
Dialog.displayName = "Dialog"

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("bg-white", className)}>
        {children}
      </div>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between p-6 border-b border-gray-200",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className }, ref) => {
    return (
      <HeadlessDialog.Title
        ref={ref}
        as="h3"
        className={cn(
          "text-lg font-semibold leading-6 text-gray-900",
          className
        )}
      >
        {children}
      </HeadlessDialog.Title>
    )
  }
)
DialogTitle.displayName = "DialogTitle"

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("p-6", className)}>
        {children}
      </div>
    )
  }
)
DialogBody.displayName = "DialogBody"

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
DialogFooter.displayName = "DialogFooter"

interface DialogCloseButtonProps {
  onClose: () => void
  className?: string
}

const DialogCloseButton = React.forwardRef<HTMLButtonElement, DialogCloseButtonProps>(
  ({ onClose, className }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={onClose}
        className={cn("text-gray-400 hover:text-gray-500", className)}
      >
        <X className="w-5 h-5" />
        <span className="sr-only">Close</span>
      </Button>
    )
  }
)
DialogCloseButton.displayName = "DialogCloseButton"

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
}
