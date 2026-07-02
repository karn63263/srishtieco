import { Link } from 'react-router'
import {
  Battery, Recycle, CircleDot, Droplets, Truck, CreditCard,
  Building2, CalendarCheck, MessageSquare, ArrowRight, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicLayout from '@/components/layout/PublicLayout'

const services = [
  {
    icon: Battery,
    title: 'Battery EPR',
    description: 'Complete Extended Producer Responsibility compliance for battery manufacturers and importers. We handle registration, collection targets, recycling coordination, and regulatory reporting.',
    image: '/service-battery.jpg',
    features: ['CPCB Registration', 'Collection Target Planning', 'Recycler Tie-ups', 'Quarterly Reporting', 'Compliance Audits'],
  },
  {
    icon: Recycle,
    title: 'Plastic EPR',
    description: 'End-to-end plastic waste management solutions ensuring compliance with Plastic Waste Management Rules. From PIBO registration to fulfillment verification.',
    image: '/service-plastic.jpg',
    features: ['PIBO Registration', 'PWM Compliance', 'Recycler Network', 'Monthly Reports', 'Brand Audit Support'],
  },
  {
    icon: CircleDot,
    title: 'Tyre EPR',
    description: 'Comprehensive tyre waste management and EPR compliance for tyre manufacturers, importers, and recyclers under the Hazardous and Other Wastes Rules.',
    image: '/service-tyre.jpg',
    features: ['CPCB Portal Registration', 'Waste Collection', 'Recycling Coordination', 'Annual Returns', 'Compliance Tracking'],
  },
  {
    icon: Droplets,
    title: 'Used Oil EPR',
    description: 'Expert management of used oil waste with proper collection, storage, transportation, and recycling coordination as per environmental regulations.',
    image: '/service-oil.jpg',
    features: ['Generator Registration', 'Collection System', 'Re-refinery Coordination', 'Manifest Management', 'Disposal Certificates'],
  },
  {
    icon: Truck,
    title: 'Waste Collection & Disposal',
    description: 'Professional waste collection, transportation, and environmentally safe disposal services for all categories of industrial and commercial waste.',
    image: '/service-waste.jpg',
    features: ['Scheduled Pickups', 'Authorized Transport', 'Safe Disposal', 'Digital Tracking', 'Certificates of Destruction'],
  },
  {
    icon: CreditCard,
    title: 'EPR Credit Transfer',
    description: 'Facilitate EPR credit transfers between obligated producers and registered recyclers in a transparent, compliant marketplace.',
    image: '/service-credit.jpg',
    features: ['Credit Verification', 'Marketplace Access', 'Transfer Documentation', 'Regulatory Filing', 'Balance Tracking'],
  },
  {
    icon: Building2,
    title: 'CPCB Registration Assistance',
    description: 'Complete assistance with Central Pollution Control Board registrations including EPR Authorization, CTO, and Consent to Establish.',
    image: '/service-cpcb.jpg',
    features: ['EPR Authorization', 'CTE/CTO Applications', 'SPCB Coordination', 'Document Preparation', 'Status Tracking'],
  },
  {
    icon: CalendarCheck,
    title: 'Annual Compliance Filing',
    description: 'End-to-end annual compliance filing services ensuring timely submission of all regulatory returns and maintaining compliance records.',
    image: '/service-filing.jpg',
    features: ['Return Preparation', 'Online Filing', 'Document Compilation', 'Compliance Calendar', 'Reminder System'],
  },
  {
    icon: MessageSquare,
    title: 'Environmental Consulting',
    description: 'Strategic environmental consulting for businesses looking to improve sustainability practices, reduce environmental impact, and achieve green certifications.',
    image: '/service-consulting.jpg',
    features: ['ESG Advisory', 'Carbon Footprint', 'Green Certification', 'Sustainability Reports', 'Training Programs'],
  },
]

export default function Services() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#021C18]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
            Comprehensive <span className="text-gradient">EPR Solutions</span>
          </h1>
          <p className="text-[#81C784] text-lg max-w-3xl mx-auto">
            From battery recycling to environmental consulting, we provide end-to-end solutions 
            for all your Extended Producer Responsibility compliance needs.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden border border-[#044036]/50">
                  <img src={service.image} alt={service.title} className="w-full h-72 object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021C18]/60 to-transparent" />
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-[#00E676]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">{service.title}</h2>
                <p className="text-[#81C784] leading-relaxed mb-6">{service.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                      <span className="text-[#E0F2E9] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-6 hover:shadow-glow">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#044036]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-[#81C784] mb-8">
            Every business is unique. Contact us to discuss your specific EPR compliance requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold px-8 rounded-full">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
