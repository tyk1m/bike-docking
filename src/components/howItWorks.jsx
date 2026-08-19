function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📍",
      title: "Find a Bike",
      description:
        "Find the nearest available BikeDock station using our station finder.",
    },
    {
      number: "02",
      icon: "🔓",
      title: "Unlock",
      description:
        "Choose your bike and unlock it quickly using your BikeDock account.",
    },
    {
      number: "03",
      icon: "🚲",
      title: "Ride",
      description:
        "Enjoy your ride and return the bike to any available BikeDock station.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-purple-700 font-semibold uppercase tracking-wider">
            Simple & convenient
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            How BikeDock Works
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Getting around your city is easy. Find a bike, unlock it, and start
            riding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300"
            >
              
              <span className="absolute top-5 right-6 text-sm font-bold text-purple-200">
                {step.number}
              </span>

              
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl">
                {step.icon}
              </div>

              
              <h3 className="text-xl font-bold text-gray-900 mt-6">
                {step.title}
              </h3>

              
              <p className="text-gray-500 mt-3 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
