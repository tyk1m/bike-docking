function HowItWorks() {
  const steps = [
    { number: '01', title: 'Create an Account', description: 'Register with an email address and password.', accent: 'border-l-purple-700' },
    { number: '02', title: 'Browse Stations', description: 'See bike counts and current availability from the CycleEazy API.', accent: 'border-l-amber-500' },
    { number: '03', title: 'Start a Demo Rental', description: 'Create a rental record and reserve an available bike in the database.', accent: 'border-l-fuchsia-700' },
    { number: '04', title: 'Manage Your Rental', description: 'View active rentals and return a bike from your account.', accent: 'border-l-emerald-600' },
    { number: '!', title: 'Services Still Planned', description: 'QR scanning, staff verification, payments, final billing and physical unlocking are not integrated.', accent: 'border-l-orange-500' },
  ];

  const stepCards = steps.map((step) => (
    <li key={step.number} className={`relative flex min-h-52 w-60 shrink-0 flex-col rounded-xl border border-purple-100 border-l-4 ${step.accent} bg-white p-5 text-left shadow-md shadow-purple-950/10`}>
      <span className="absolute right-4 top-3 text-sm font-bold text-purple-300">{step.number}</span>
      <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-lg font-bold text-purple-800">{step.number}</div>
      <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
    </li>
  ));

  return (
    <section data-reveal className="reveal-section overflow-hidden bg-purple-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-wider text-purple-700">The current app flow</p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">How CycleEazy Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">Create an account and manage bike and rental records. Physical ride services are still being connected.</p>
        </div>
        <div className="how-steps-viewport" aria-label="CycleEazy app steps">
          <div className="how-steps-track">
            <ol className="how-steps-group">{stepCards}</ol>
            <ol className="how-steps-group" aria-hidden="true">{stepCards}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
