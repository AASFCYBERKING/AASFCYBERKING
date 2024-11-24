import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 text-center relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <p>© 2024 Cool Digital Services. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This website is for entertainment purposes only. We do not guarantee any specific results from using our services.
        </p>
      </div>
    </footer>
  )
}

export default Footer
