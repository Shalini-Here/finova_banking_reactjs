/**
 * Footer.jsx — Site-wide footer (shown on public pages)
 * Contains: brand tagline, quick links, support links, services, newsletter.
 */
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#5B6CFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-white text-lg">Finova Banking</span>
            </div>
            <p className="text-sm leading-relaxed">Smart Banking for a Better Tomorrow.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['/', '/about', '/contact'].map((path, i) => (
                <li key={i}>
                  <Link to={path} className="hover:text-[#5B6CFF] transition-colors">
                    {['Home', 'About Us', 'Contact Us'][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              {['Help Center', 'Privacy Policy', 'Terms & Conditions'].map(item => (
                <li key={item}><span className="hover:text-[#5B6CFF] cursor-pointer transition-colors">{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
            <p className="text-xs mb-3">Get the latest updates and offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B6CFF]"
              />
              <button className="bg-[#5B6CFF] hover:bg-[#4A5CE8] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E293B] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© 2024 Finova Banking. All rights reserved.</p>
          <p>Made with ❤️ by Finova Team</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
