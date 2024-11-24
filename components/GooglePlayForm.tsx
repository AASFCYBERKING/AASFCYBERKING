import React, { useState } from 'react'
import { FaGoogle, FaRupeeSign } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface GooglePlayFormProps {
  onOrderGenerate: (orderText: string) => void
}

const GooglePlayForm: React.FC<GooglePlayFormProps> = ({ onOrderGenerate }) => {
  const [googlePlayAmount, setGooglePlayAmount] = useState(100)

  const calculateGooglePlayPrice = (amount: number) => {
    return amount + Math.ceil(amount / 10) * 2
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (googlePlayAmount < 10 || googlePlayAmount > 1000) {
      // Show error notification
      return
    }
    const price = calculateGooglePlayPrice(googlePlayAmount)
    const orderText = `Google Play
Gift Card Order:
Amount: ₹${googlePlayAmount}
Total Price: ₹${price} (includes ₹${price - googlePlayAmount} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`
    onOrderGenerate(orderText)
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardTitle className="flex items-center">
          <FaGoogle className="w-6 h-6 mr-2" />
          Google Play Gift Cards
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="google-play-amount" className="block text-sm font-medium mb-1">Amount</label>
            <div className="relative">
              <FaRupeeSign className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xl" />
              <Input
                id="google-play-amount"
                type="number"
                min={10}
                max={1000}
                value={googlePlayAmount}
                onChange={(e) => setGooglePlayAmount(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
                className="pl-10"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Price: ₹{calculateGooglePlayPrice(googlePlayAmount)} (includes ₹{calculateGooglePlayPrice(googlePlayAmount) - googlePlayAmount} service fee)
          </p>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white">
            Generate Order
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Note: Due to limited availability of physical cards, we now offer UPI transactions. After payment, you'll receive the Google Play redeem code (including our commission).
        </p>
      </CardFooter>
    </Card>
  )
}

export default GooglePlayForm
