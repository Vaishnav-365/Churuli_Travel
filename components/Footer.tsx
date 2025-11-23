import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-950 via-cyan-900 to-sky-800 text-white py-16 overflow-hidden z-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Churuli Logo"
                  width={40}
                  height={40}
                  className="mr-3 ring-2 ring-cyan-400/50 rounded-full"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">Churuli</span>
            </div>
            <p className="text-white/70 max-w-xs">Your AI-powered travel companion that turns dreams into unforgettable journeys</p>
            
            {/* Social media icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-300">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/trips" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    My Trips
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Generate Itinerary
                  </Link>
                </li>
                <li>
                  <Link href="/globe" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Globe
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-300">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-300">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50">
            © {new Date().getFullYear()} Churuli. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-white/50 text-sm">Made with</span>
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-white/50 text-sm">for travelers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
