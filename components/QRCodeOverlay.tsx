import React from 'react'
import { X } from 'lucide-react'

interface QRCodeOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const QRCodeOverlay: React.FC<QRCodeOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-full max-h-full">
        <img
          src="/qrcode2.png"
          width={621}
          height={1280}
          alt="Large QR Code"
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default QRCodeOverlay
