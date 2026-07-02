import { Target, Eye, Heart, Award, TrendingUp, Globe } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'

export default function About() {
  const values = [
    { icon: Heart, title: 'Integrity', desc: 'We operate with complete transparency and ethical standards in all our engagements.' },
    { icon: Target, title: 'Excellence', desc: 'We strive for the highest quality in every compliance solution we deliver.' },
    { icon: Globe, title: 'Sustainability', desc: 'Environmental stewardship is at the core of everything we do.' },
    { icon: Award, title: 'Innovation', desc: 'We continuously evolve our approaches to meet changing regulations.' },
  ]

  const milestones = [
    { year: '2018', title: 'Company Founded', desc: 'Srishti Eco Tech was established in Gurugram with a vision for sustainable compliance.' },
    { year: '2019', title: 'First 50 Clients', desc: 'Achieved our first milestone of 50 active client partnerships across India.' },
    { year: '2020', title: 'CPCB Recognition', desc: 'Recognized by CPCB as an authorized EPR compliance partner.' },
    { year: '2021', title: 'Pan-India Expansion', desc: 'Expanded operations to cover all major states across India.' },
    { year: '2022', title: 'Digital Platform Launch', desc: 'Launched our proprietary compliance management platform.' },
    { year: '2023', title: '500+ Clients', desc: 'Crossed 500+ client milestone with 98% compliance success rate.' },
  ]

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#021C18]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">About Us</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
                Pioneering Environmental{' '}
                <span className="text-gradient">Compliance</span>
              </h1>
              <p className="text-[#81C784] text-lg leading-relaxed mb-6">
                Srishti Eco Tech Solutions is a leading environmental compliance and sustainability consulting firm 
                based in Gurugram, Haryana. We specialize in helping businesses navigate the complex landscape of 
                Extended Producer Responsibility (EPR) regulations in India.
              </p>
              <p className="text-[#81C784] leading-relaxed mb-8">
                Founded with a vision to create a sustainable future, we have grown to become a trusted partner 
                for over 500 businesses across manufacturing, electronics, automotive, and FMCG sectors. Our 
                team of certified environmental consultants brings deep expertise in CPCB regulations, waste 
                management frameworks, and circular economy principles.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#00E676]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#E0F2E9] font-['Poppins']">98%</div>
                  <div className="text-[#81C784] text-sm">Compliance Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 rounded-3xl blur-xl" />
              <img src="/about-team.jpg" alt="Our Team" className="relative rounded-2xl border border-[#044036]/50 shadow-card" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#044036]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#044036]/30 border border-[#044036]/50">
              <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#00E676]" />
              </div>
              <h3 className="text-2xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">Our Mission</h3>
              <p className="text-[#81C784] leading-relaxed">
                To empower businesses with comprehensive, technology-driven environmental compliance solutions 
                that transform regulatory obligations into opportunities for sustainable growth and positive 
                environmental impact.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#044036]/30 border border-[#044036]/50">
              <div className="w-14 h-14 rounded-xl bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#00BFA5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">Our Vision</h3>
              <p className="text-[#81C784] leading-relaxed">
                To be India&apos;s most trusted partner in building a circular economy where every business 
                seamlessly integrates environmental responsibility into their core operations, contributing 
                to a cleaner, greener planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div key={val.title} className="p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/20 transition-all hover:shadow-glow text-center group">
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-4 group-hover:bg-[#00E676]/20 transition-colors">
                  <val.icon className="w-7 h-7 text-[#00E676]" />
                </div>
                <h4 className="text-lg font-semibold text-[#E0F2E9] mb-2">{val.title}</h4>
                <p className="text-[#81C784] text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#044036]/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3">Timeline of Growth</h2>
          </div>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex items-start gap-6 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block flex-1" />
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#00E676] shadow-glow" />
                  {i < milestones.length - 1 && <div className="w-px h-full bg-[#044036] mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="p-6 rounded-xl bg-[#044036]/30 border border-[#044036]/50">
                    <span className="text-[#00E676] font-bold text-lg">{m.year}</span>
                    <h4 className="text-[#E0F2E9] font-semibold mt-1 mb-2">{m.title}</h4>
                    <p className="text-[#81C784] text-sm">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
