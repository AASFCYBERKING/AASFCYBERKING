import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface DisclaimerProps {
  onAgree: () => void
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAgree }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Legal Disclaimer</h2>
        <div className="overflow-y-auto flex-grow pr-2">
          <div className="space-y-4 text-sm">
            <p>This service is provided for entertainment purposes only. We are not affiliated with or endorsed by Instagram, Google, or any other mentioned platforms.</p>
            <p>Use of our services may violate the terms of service of these platforms. By using our services, you agree to take full responsibility for any consequences that may arise.</p>
            <p>We do not condone or support any illegal activities, including the unauthorized use of accounts or payment methods. Users are responsible for ensuring they have the right to make purchases and use the services provided.</p>
            <p>We reserve the right to refuse service to anyone for any reason.</p>
            <p>By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.</p>
            <p>The information provided through our services is for general informational purposes only and should not be considered as professional advice. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our website or provided through our services.</p>
            <p>Any reliance you place on such information is strictly at your own risk. We will not be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of our services.</p>
            <p>Through our website, you may be able to link to other websites which are not under our control. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
            <p>Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>
          </div>
        </div>
        <Button
          onClick={onAgree}
          className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
        >
          I Agree and Understand
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default Disclaimer
