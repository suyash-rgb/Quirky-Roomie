import React from "react";
import { motion } from "framer-motion";

const howItWorks = [
  {
    title: "File a Complaint",
    emoji: "📝",
    description: "Let your voice be heard by filing a complaint about your roommate’s behavior.",
  },
  {
    title: "Vote",
    emoji: "👍👎",
    description: "Roommates vote to support or reject the complaint.",
  },
  {
    title: "Earn Badges",
    emoji: "🏅",
    description: "Gain badges for active participation and fair decision making.",
  },
  {
    title: "Funny Punishments",
    emoji: "🤣🔨",
    description: "The guilty roommate gets a light-hearted, funny punishment!",
  },
];

const bounceTransition = {
  repeat: Infinity,
  repeatType: 'loop',
  duration: 0.6,
  ease: 'easeOut'
};


const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50">
      <h2 className="font-heading text-3xl font-bold mb-10 text-center">How Quirky Roomie Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center"
          >
            <motion.div
              className="text-4xl mb-3"
              transition={bounceTransition}
              animate={{ y: [0, -10, 0] }}
            >
              {step.emoji}
            </motion.div>
            <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
            <p className="font-body text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
