import {
  Factory, Cpu, Car, ShoppingBag, Ship, Recycle, Store, Package,
  CheckCircle2, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import PublicLayout from '@/components/layout/PublicLayout'

const industries = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Comprehensive EPR compliance for manufacturing units producing electronics, plastics, batteries, and industrial equipment.',
    services: ['Battery EPR', 'Plastic EPR', 'Waste Collection', 'Annual Filing'],
  },
  {
    icon: Cpu,
    title: 'Electronics',
    description: 'Specialized compliance solutions for electronics manufacturers and importers under E-Waste Management Rules.',
    services: ['Battery EPR', 'CPCB Registration', 'E-Waste Compliance', 'Consulting'],
  },
  {
    icon: Car,
    title: 'Automobile',
    description: 'End-to-end waste management for automotive sector including tyre recycling, used oil disposal, and battery compliance.',
    services: ['Tyre EPR', 'Used Oil EPR', 'Battery EPR', 'Waste Collection'],
  },
  {
    icon: Package,
    title: 'Plastic Industry',
    description: 'PIBO registration and PWM compliance for plastic producers, brand owners, and importers across India.',
    services: ['Plastic EPR', 'PIBO Registration', 'Recycler Network', 'Monthly Reports'],
  },
  {
    icon: Ship,
    title: 'Importers',
    description: 'Complete EPR compliance for importers of electronics, batteries, tyres, plastics, and other regulated products.',
    services: ['Import Compliance', 'CPCB Registration', 'EPR Authorization', 'Consulting'],
  },
  {
    icon: Recycle,
    title: 'Recyclers',
    description: 'Support for recycling businesses including registration, credit management, and coordination with producers.',
    services: ['Recycler Registration', 'EPR Credits', 'Producer Tie-ups', 'Compliance Support'],
  },
  {
    icon: Store,
    title: 'Retail Businesses',
    description: 'Tailored compliance solutions for retail chains and distributors dealing with regulated products.',
    services: ['Multi-location Compliance', 'Waste Collection', 'Reporting', 'Consulting'],
  },
  {
    icon: ShoppingBag,
    title: 'FMCG',
    description: 'Sector-specific EPR solutions for fast-moving consumer goods companies with complex supply chains.',
    services: ['Plastic EPR', 'Packaging Compliance', 'Supply Chain Audit', 'Sustainability Reporting'],
  },
]

export default function Industries() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#021C18] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/industries-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021C18]/60 via-[#021C18]/80 to-[#021C18]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Industries We Serve</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
            Partnering Across <span className="text-gradient">Industries</span>
          </h1>
          <p className="text-[#81C784] text-lg max-w-3xl mx-auto">
            We provide specialized EPR compliance and waste management solutions tailored to the 
            unique requirements of each industry sector.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="group p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-5 group-hover:bg-[#00E676]/20 transition-colors">
                  <industry.icon className="w-7 h-7 text-[#00E676]" />
                </div>
                <h3 className="text-lg font-semibold text-[#E0F2E9] font-['Poppins'] mb-3">{industry.title}</h3>
                <p className="text-[#81C784] text-sm leading-relaxed mb-5">{industry.description}</p>
                <div className="space-y-2">
                  {industry.services.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                      <span className="text-[#E0F2E9] text-xs">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#044036]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
            Don&apos;t See Your Industry?
          </h2>
          <p className="text-[#81C784] mb-8">
            We work with businesses across all sectors. Reach out to discuss how we can help with your compliance needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold px-8 rounded-full hover:shadow-glow">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
