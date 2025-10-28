import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800 overflow-hidden">
      <header className="max-w-[1440px] w-full mx-auto flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          🎟️ <span>TicketApp</span>
        </h1>
        <nav className="space-x-4">
          <Link
            to="/auth/login"
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <section className="relative flex flex-col items-center text-center justify-center flex-1 px-6 py-12 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>

        <div className="max-w-[1440px] mx-auto z-10 animate-fadeInUp">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Manage Your Tickets Seamlessly
          </h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
            A modern web app for tracking, creating, and resolving tickets
            efficiently. Stay organized and in control of your workflow.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/auth/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#bfdbfe"
            fillOpacity="1"
            d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,261.3C672,288,768,288,864,245.3C960,203,1056,117,1152,101.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </section>

      <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} TicketApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
