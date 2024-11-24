import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cat, Moon, Sun, Instagram, Gift, Clock, AlertTriangle, Copy, Check, X, ChevronUp, ChevronDown } from 'lucide-react'
import { FaRupeeSign, FaPaw, FaGoogle, FaQrcode } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Notification, NotificationType } from './components/Notification'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import ProfileCard from './components/ProfileCard'
import InstagramForm from './components/InstagramForm'
import GooglePlayForm from './components/GooglePlayForm'
import ServiceDetails from './components/ServiceDetails'
import Disclaimer from './components/Disclaimer'
import OrderDetails from './components/OrderDetails'
import QRCodeOverlay from './components/QRCodeOverlay'
import { generateOrderId, sendOrderToTelegram } from './utils/orderUtils'

export default function CoolDigitalServices() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null)
  const [isQRCodeOverlayOpen, setIsQRCodeOverlayOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{ text: string; id: string } | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAgreeTerms = () => {
    setShowDisclaimer(false)
    setShowContent(true)
    showNotification('info', 'Welcome to Cool Digital Services!')
  }

  const handleOrderGeneration = async (orderText: string) => {
    const orderId = generateOrderId()
    const fullOrderText = `#${orderId}\n\n${orderText}`
    setOrderDetails({ text: fullOrderText, id: orderId })
    await sendOrderToTelegram(fullOrderText)
    showNotification('success', 'Order generated successfully!')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500 relative">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <AnimatePresence>
          {showDisclaimer && (
            <Disclaimer onAgree={handleAgreeTerms} />
          )}
        </AnimatePresence>

        {!showDisclaimer && (
          <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
            <ProfileCard />
            <InstagramForm onOrderGenerate={handleOrderGeneration} />
            <GooglePlayForm onOrderGenerate={handleOrderGeneration} />
            <ServiceDetails />
          </main>
        )}

        <Footer />

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            isVisible={!!notification}
            onClose={() => setNotification(null)}
          />
        )}

        {orderDetails && (
          <OrderDetails
            orderText={orderDetails.text}
            orderId={orderDetails.id}
            onClose={() => setOrderDetails(null)}
            onOpenQRCode={() => setIsQRCodeOverlayOpen(true)}
          />
        )}

        <QRCodeOverlay
          isOpen={isQRCodeOverlayOpen}
          onClose={() => setIsQRCodeOverlayOpen(false)}
        />
      </div>
    </div>
  )
}
