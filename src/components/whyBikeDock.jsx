function WhyBikeDock() {
  const benefits = [
    {
      icon: "⚡",
      title: "Fast & Convenient",
      description:
        "Find and unlock a bike quickly without waiting for public transport.",
    },
    {
      icon: "💰",
      title: "Affordable",
      description:
        "Enjoy flexible bike rentals designed to keep your daily travel affordable.",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description:
        "Choose cycling and help reduce traffic, emissions, and pollution in our cities.",
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description:
        "Manage your rides, find stations, and track your rentals from one simple platform.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-purple-700 font-semibold uppercase tracking-wider">
            Why BikeDock?
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            A smarter way to move around
          </h2>

          <p className="text-gray-500 mt-4">
            BikeDock combines convenience, affordability and sustainability
            to make everyday transportation easier.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                {benefit.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyBikeDock;