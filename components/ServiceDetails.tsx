import React from 'react'
import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ServiceDetails: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Service Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Our services will be provided within 24-48 hours after the payment is confirmed. If for any reason we are unable to fulfill your order within this timeframe, we will promptly refund your payment.</p>
      </CardContent>
    </Card>
  )
}

export default ServiceDetails
