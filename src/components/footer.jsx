function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="BikeDock"
                className="h-10 w-auto"
              />

              <span className="text-2xl font-bold">BikeDock</span>
            </div>

            <p className="text-gray-400 mt-5 leading-relaxed">
              Smart, affordable and eco-friendly bike rentals for modern cities.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">Company</h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Stations
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg">Support</h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Safety
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg">Contact Us</h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>📧 hello@bikedock.com</li>
              <li>📞 +254 700 000 000</li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 BikeDock. All rights reserved.</p>

          <p>Built for smarter urban mobility.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
