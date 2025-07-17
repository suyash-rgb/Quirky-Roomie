import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 text-center">
  <p>&copy; {new Date().getFullYear()} Quirky Roomie. All rights reserved.</p>
</footer>
  )
}

export default Footer