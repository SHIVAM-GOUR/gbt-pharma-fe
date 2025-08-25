"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Search,
  Heart,
  Phone,
  Shield,
  Pill
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart as ShoppingCartComponent } from "@/components/cart/shopping-cart"
import { useAppSelector, useAppDispatch } from "@/store"
import { toggleCart } from "@/store/slices/cartSlice"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>24/7 Support: +1-800-OLWEN-RX</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>FDA Approved • Licensed Pharmacy</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/track-order" className="hover:text-accent transition-colors">
                Track Order
              </Link>
              <Link href="/help" className="hover:text-accent transition-colors">
                Help
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border" 
            : "bg-white shadow-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-foreground font-heading">Olwen</span>
                <span className="block text-sm text-accent font-medium">Lifesciences</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              {isAuthenticated && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/wishlist">
                    <Heart className="w-5 h-5" />
                    {user?.wishlist && user.wishlist.length > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs">
                        {user.wishlist.length}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => dispatch(toggleCart())}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="icon" asChild>
                <Link href={isAuthenticated ? "/account" : "/login"}>
                  <User className="w-5 h-5" />
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </nav>
        </Container>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Container>
                <div className="py-4 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Mobile Navigation Items */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button asChild className="w-full" variant="medical">
                      <Link href="/products" onClick={() => setIsOpen(false)}>
                        Shop Medicines
                      </Link>
                    </Button>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartComponent />
    </>
  )
}
