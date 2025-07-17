import React from 'react'

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-14 text-center">
  <h2 className="text-3xl font-bold mb-10">How Quirky Roomie Works</h2>
  <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
    {[
      { step: "Create a profile", icon: "👤" },
      { step: "List or browse properties", icon: "🏘️" },
      { step: "Chat and lease securely", icon: "🔐" }
    ].map(({ step, icon }, i) => (
      <div key={i} className="w-64 p-6 border rounded-lg">
        <div className="text-3xl mb-2">{icon}</div>
        <p className="font-medium">{step}</p>
      </div>
    ))}
  </div>
</section>
  )
}

export default HowItWorks