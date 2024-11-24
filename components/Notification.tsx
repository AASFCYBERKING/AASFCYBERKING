import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'info'

interface NotificationProps {
  type: NotificationType
  message: string
  isVisible: boolean
  onClose: () => void
}

const notificationColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
}

const notificationIcons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
}

export const Notification: React.FC<NotificationProps> = ({ type, message, isVisible, onClose }) => {
  const Icon = notificationIcons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notificationColors[type]} text-white flex items-center space-x-3 max-w-md`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          <p className="flex-grow">{message}</p>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

  
