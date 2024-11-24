import React from 'react'
import { motion } from 'framer-motion'
import { FaPaw, FaQrcode } from 'react-icons/fa'
import { Copy, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface OrderDetailsProps {
  orderText: string
  orderId: string
  onClose: () => void
  onOpenQRCode: () => void
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderText, orderId, onClose, onOpenQRCode }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderText)
    // Show success notification
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative flex flex-col max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
          <FaPaw className="mr-2 text-orange-500" />
          Order Details
        </h2>
        <div className="overflow-y-auto flex-grow">
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-md shadow-inner mb-4">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Generated Order Text:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              {orderText}
            </pre>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-md shadow-inner">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
              <FaQrcode className="mr-2 text-blue-500" />
              Payment Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Scan the QR code or use the UPI ID below for payment.</li>
              <li>Take a screenshot of your payment confirmation.</li>
              <li>Send the screenshot along with the generated order text to @kishoredxd on Instagram.</li>
              <li>Wait for your order to be processed (usually within 24-48 hours).</li>
            </ol>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="relative">
                <img
                  src="/qrcode.png"
                  width={100}
                  height={100}
                  alt="QR Code"
                  className="cursor-pointer"
                  onClick={onOpenQRCode}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </div>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">UPI ID: kishoredxd@ybl</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button onClick={copyToClipboard} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300">
              <Copy className="w-4 h-4 mr-2" />
              Copy Order Text
            </Button>
            <Button
              onClick={() => window.open('https://www.instagram.com/kishoredxd', '_blank')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Open @kishoredxd on Instagram
            </Button>
          </div>
        </div>
        <Button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transition-all duration-300"
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default OrderDetails
