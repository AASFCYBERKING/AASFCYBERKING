import React from 'react'
import { Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfileCard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="text-xl sm:text-2xl flex items-center">
          <Instagram className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
          Kishore's Digital Services
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-orange-500 mb-4 sm:mb-0">
            <AvatarImage src="/lmao.jpg" alt=".𝐊𝐈𝐒𝐇𝐎𝐑𝐄.👀" />
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">.𝐊𝐈𝐒𝐇𝐎𝐑𝐄.👀</h2>
            <p className="text-gray-600 dark:text-gray-400">@kishoredxd</p>
            <p className="mt-2 whitespace-pre-line">- 𝚜𝚞𝚙, 𝙸'𝚖 𝚊𝚠𝚔𝚠𝚊𝚛𝚍...🥂
Contact for custom solutions!</p>
            <Button 
              className="bg-[#E1306C] hover:bg-[#C13584] text-white mt-4"
              onClick={() => window.open('https://www.instagram.com/kishoredxd', '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Follow on Instagram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
