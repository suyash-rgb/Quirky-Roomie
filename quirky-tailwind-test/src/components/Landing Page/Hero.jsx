import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

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

      {/* SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-full -z-10"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#A855F7"
          d="M0,32L60,53.3C120,75,240,117,360,122.7C480,128,600,96,720,101.3C840,107,960,149,1080,176C1200,203,1320,213,1380,218.7L1440,224V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
        />
      </svg>

      {/* Headline */}
      <motion.h1
        className="font-heading text-6xl font-extrabold mb-4 text-electric-purple"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Quirky Roomie
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="font-body text-xl mb-8 max-w-2xl mx-auto"
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
        onClick={() => navigate('/dashboard')}
      >
        Explore Listings
      </motion.button>
    </section>
  )
}

export default Hero
