import React from 'react'

const Footer = () => {
  return (
    <footer
    style={{
    backgroundColor: '#1F2937', // same as bg-gray-800
    color: '#D1D5DB',           // same as text-gray-300
    padding: '1.5rem',
    textAlign: 'center',
  }}
>
  <p>&copy; {new Date().getFullYear()} Quirky Roomie. All rights reserved.</p>
</footer>
  )
}

export default Footer