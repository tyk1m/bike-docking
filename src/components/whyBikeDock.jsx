function WhyBikeDock() {
  const benefits = [
    { icon: 'Go', title: 'Fast & Convenient', description: 'Find available bikes by station and manage rentals online.' },
    { icon: 'KSh', title: 'Affordable', description: 'Review sample hourly rates as CycleEazy pricing is finalized.' },
    { icon: 'Eco', title: 'Eco-Friendly', description: 'Choose cycling to help reduce traffic and emissions.' },
    { icon: 'App', title: 'Easy to Use', description: 'Browse stations and view rental records in one place.' },
  ];

  return (
    <section data-reveal className="reveal-section bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-wider text-purple-400">Why CycleEazy?</p>
          <h2 className="mt-2 text-4xl font-bold text-white">A smarter way to move around</h2>
          <p className="mt-4 text-gray-300">CycleEazy brings bike availability and rental records together in one place.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => <article key={benefit.title} className="rounded-2xl border border-gray-800 bg-zinc-950 p-8 text-center transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            <div aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-800">{benefit.icon}</div>
            <h3 className="mt-6 text-xl font-bold text-white">{benefit.title}</h3>
            <p className="mt-3 leading-relaxed text-gray-400">{benefit.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export default WhyBikeDock;
