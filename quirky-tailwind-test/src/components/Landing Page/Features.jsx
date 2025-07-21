import React from 'react'

const Features = () => {
  return (
  <section className="grid md:grid-cols-3 gap-6 p-10 bg-white text-gray-800 text-center">
    {[
      { title: "Verified Owners", icon: "🛡️", desc: "Every listing is backed by vetted profiles for peace of mind." },
      { title: "Intuitive Filters", icon: "🎯", desc: "Search by amenities, price range, availability, and more." },
      { title: "Interactive Reviews", icon: "💬", desc: "See what real tenants say before making your decision." }
    ].map(({ title, icon, desc }) => (
      <div key={title} className="p-6 border rounded-lg shadow-sm transform transition duration-300 hover:scale-105">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
        <p className="font-body text-base">{desc}</p>
      </div>
    ))}
  </section>
  )
}

export default Features