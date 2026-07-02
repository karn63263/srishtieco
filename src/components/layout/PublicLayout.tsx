import { Link, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import {
  Leaf, Menu, X, ChevronRight, Phone, Mail, MapPin,
  Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-[#021C18]">
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#021C18]/90 backdrop-blur-xl border-b border-[#044036]/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00BFA5] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#021C18]" />
              </div>
              <span className="text-lg font-bold text-[#E0F2E9] font-['Poppins'] tracking-tight">
                SRISHTI
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.href
                      ? 'text-[#00E676] bg-[#044036]/50'
                      : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact">
                <Button
                  size="sm"
                  className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white rounded-full px-5"
                >
                  Get Consultation
                </Button>
              </Link>
            </div>

            <button
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-[#E0F2E9]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-[#021C18]/95 backdrop-blur-xl border-t border-[#044036]/50">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? 'text-[#00E676] bg-[#044036]/50'
                      : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#044036]/50">
                <Link to="/contact" className="block">
                  <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
                    Get Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main role="main">{children}</main>

      <footer aria-label="Site footer" className="bg-[#021C18] border-t border-[#044036]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00BFA5] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#021C18]" />
                </div>
                <span className="text-lg font-bold text-[#E0F2E9] font-['Poppins']">SRISHTI</span>
              </div>
              <p className="text-[#81C784] text-sm leading-relaxed">
                Your trusted partner for EPR compliance and sustainable waste management solutions across India.
              </p>
              <div className="flex gap-3 pt-2">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social media" className="w-9 h-9 rounded-lg bg-[#044036]/50 flex items-center justify-center text-[#81C784] hover:text-[#00E676] hover:bg-[#044036] transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#E0F2E9] font-semibold mb-4 font-['Poppins']">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-[#81C784] hover:text-[#00E676] transition-colors text-sm flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {link.label === '/' ? 'Home' : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#E0F2E9] font-semibold mb-4 font-['Poppins']">Services</h4>
              <ul className="space-y-3">
                {['Battery EPR', 'Plastic EPR', 'Tyre EPR', 'Used Oil EPR', 'Environmental Consulting', 'CPCB Registration'].map((service) => (
                  <li key={service}>
                    <Link to="/services" className="text-[#81C784] hover:text-[#00E676] transition-colors text-sm flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#E0F2E9] font-semibold mb-4 font-['Poppins']">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00E676] mt-1 shrink-0" />
                  <span className="text-[#81C784] text-sm">Gurugram, Haryana, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="text-[#81C784] text-sm">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="text-[#81C784] text-sm">info@srishtieco.tech</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#044036]/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#81C784]/60 text-sm">
              &copy; {new Date().getFullYear()} Srishti Eco Tech Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#81C784]/60 hover:text-[#00E676] text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#81C784]/60 hover:text-[#00E676] text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
