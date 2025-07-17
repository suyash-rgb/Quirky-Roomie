import React from 'react'
import { motion } from 'framer-motion'
//import RoomieIllustration from '../assets/roomie-illustration.png'

const Hero = () => {
  return (
    <section className="bg-dark-slate text-off-white py-24 px-6 text-center relative overflow-hidden">
      {/* SVG Illustration
      <motion.img
        src={RoomieIllustration}
        alt="Quirky Roomie"
        className="absolute top-0 right-0 w-1/3 opacity-30 pointer-events-none"
        initial={{ x: 200, y: -50, rotate: 10 }}
        animate={{ x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      /> */}

      {/* Headline */}
      <motion.h1
        className="text-6xl font-extrabold mb-4 text-electric-purple"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Quirky Roomie
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-xl mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Turning flat drama into fun tasks—file complaints, vote on them, earn karma, and avoid those dreaded chores!
      </motion.p>

      {/* CTA */}
      <motion.button
        className="bg-electric-purple hover:bg-electric-purple-dark text-off-white font-semibold px-8 py-4 rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Explore Listings
      </motion.button>
    </section>
  )
}

export default Hero
