import React from 'react'
import { Cat, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Cat className="w-8 h-8 text-orange-500 dark:text-orange-300" />
          <h1 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">Cool Digital Services</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-orange-600 dark:text-orange-400"
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </nav>
    </header>
  )
}

export default Header
