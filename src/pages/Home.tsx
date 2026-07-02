import { Link } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import {
  Leaf, ShieldCheck, FileText, Users, BarChart3, ArrowRight,
  Battery, Recycle, CircleDot, Droplets, Truck,
  CreditCard, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicLayout from '@/components/layout/PublicLayout'

/* ─── Particle Canvas Effect ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const pixelScale = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width = rect.width * pixelScale
      canvas.height = rect.height * pixelScale
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(pixelScale, 0, 0, pixelScale, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const agentNum = 600
    const agentSpeed = 1.5
    const inertia = 0.08
    const agents: { x: number; y: number; vx: number; vy: number }[] = []
    const canvasWidth = () => canvas.parentElement?.getBoundingClientRect().width ?? window.innerWidth
    const canvasHeight = () => canvas.parentElement?.getBoundingClientRect().height ?? window.innerHeight

    for (let i = 0; i < agentNum; i++) {
      agents.push({
        x: Math.random() * canvasWidth(),
        y: Math.random() * canvasHeight(),
        vx: 0,
        vy: 0,
      })
    }

    // Simple noise-like flow field
    const noiseGrid: number[][] = []
    const gridSize = 64
    for (let x = 0; x < gridSize; x++) {
      noiseGrid[x] = []
      for (let y = 0; y < gridSize; y++) {
        noiseGrid[x][y] = Math.sin(x * 0.15) * Math.cos(y * 0.15) + Math.sin(x * 0.05 + y * 0.1) * 0.5
      }
    }

    const colors = ['0, 230, 118', '0, 191, 165', '129, 199, 132']

    const animate = () => {
      const w = canvasWidth()
      const h = canvasHeight()

      ctx.fillStyle = 'rgba(2, 28, 24, 0.08)'
      ctx.fillRect(0, 0, w, h)

      const time = Date.now() * 0.0005

      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i]
        const nx = Math.floor(((agent.x / w) * gridSize + time * 10) % gridSize)
        const ny = Math.floor(((agent.y / h) * gridSize) % gridSize)
        const angle = (noiseGrid[nx]?.[ny] ?? 0) * 6.28318

        const targetVx = Math.cos(angle) * agentSpeed
        const targetVy = Math.sin(angle) * agentSpeed
        agent.vx += (targetVx - agent.vx) * inertia
        agent.vy += (targetVy - agent.vy) * inertia
        agent.x += agent.vx
        agent.y += agent.vy

        if (agent.x < 0) agent.x += w
        if (agent.x > w) agent.x -= w
        if (agent.y < 0) agent.y += h
        if (agent.y > h) agent.y -= h

        const size = (1.5 + Math.sin(Date.now() * 0.001 + i) * 0.5) * 1.5
        const color = colors[i % 3]
        const grad = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, size * 3)
        grad.addColorStop(0, `rgba(${color}, 0.2)`)
        grad.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, size * 1.5, 0, 6.28318)
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ─── Service Card ─── */
function ServiceCard({ icon: Icon, title, description, image, delay }: {
  icon: React.ElementType
  title: string
  description: string
  image: string
  delay: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`group relative bg-[#044036]/40 rounded-2xl overflow-hidden border border-[#044036]/60 hover:border-[#00E676]/30 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021C18] via-[#021C18]/50 to-transparent" />
      </div>
      <div className="p-6 relative">
        <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-4 group-hover:bg-[#00E676]/20 transition-colors">
          <Icon className="w-6 h-6 text-[#00E676]" />
        </div>
        <h3 className="text-lg font-semibold text-[#E0F2E9] mb-2 font-['Poppins']">{title}</h3>
        <p className="text-[#81C784] text-sm leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center gap-1 text-[#00E676] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn More <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

/* ─── Stat Counter ─── */
function StatCounter({ value, label, icon: Icon, suffix = '' }: {
  value: number
  label: string
  icon: React.ElementType
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 2000
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#00E676]" />
      </div>
      <div className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#81C784] text-sm uppercase tracking-wider">{label}</div>
    </div>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  const services = [
    {
      icon: Battery,
      title: 'Battery EPR',
      description: 'Complete Extended Producer Responsibility compliance for battery waste management, recycling targets, and regulatory reporting.',
      image: '/service-battery.jpg',
    },
    {
      icon: Recycle,
      title: 'Plastic EPR',
      description: 'End-to-end plastic waste management solutions including collection, recycling, and compliance with PWM Rules.',
      image: '/service-plastic.jpg',
    },
    {
      icon: CircleDot,
      title: 'Tyre EPR',
      description: 'Comprehensive tyre waste management and EPR compliance ensuring responsible recycling and disposal.',
      image: '/service-tyre.jpg',
    },
    {
      icon: Droplets,
      title: 'Used Oil EPR',
      description: 'Expert management of used oil waste with proper collection, recycling, and regulatory compliance.',
      image: '/service-oil.jpg',
    },
    {
      icon: Truck,
      title: 'Waste Collection & Disposal',
      description: 'Professional waste collection, transportation, and environmentally safe disposal services.',
      image: '/service-waste.jpg',
    },
    {
      icon: CreditCard,
      title: 'EPR Credit Transfer',
      description: 'Facilitate EPR credit transfers between producers and recyclers in a transparent marketplace.',
      image: '/service-credit.jpg',
    },
  ]

  const features = [
    { icon: ShieldCheck, title: 'Regulatory Compliance', desc: 'Full compliance with CPCB, SPCB, and MoEFCC guidelines' },
    { icon: FileText, title: 'Documentation Support', desc: 'Complete paperwork, filing, and reporting assistance' },
    { icon: Users, title: 'Expert Team', desc: 'Dedicated environmental consultants and compliance officers' },
    { icon: BarChart3, title: 'Real-time Tracking', desc: 'Monitor your compliance status and EPR targets live' },
  ]

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021C18]/40 via-transparent to-[#021C18]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#044036]/50 border border-[#00E676]/20 text-[#00E676] text-sm font-medium mb-8">
            <Leaf className="w-4 h-4" />
            Compliance &bull; Circularity &bull; Trust
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E0F2E9] font-['Poppins'] leading-tight mb-6">
            Navigate the Future of{' '}
            <span className="text-gradient">Sustainability</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#81C784] max-w-3xl mx-auto mb-10 leading-relaxed">
            Comprehensive EPR compliance, waste management, and environmental consulting
            for forward-thinking enterprises across India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services">
              <Button size="lg" className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold px-8 py-6 text-base rounded-full hover:shadow-glow transition-all">
                Explore Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-[#044036] text-[#E0F2E9] hover:bg-[#044036]/50 px-8 py-6 text-base rounded-full">
                Client Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#81C784]/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00E676]/50 to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#021C18] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#021C18] via-[#044036]/10 to-[#021C18]" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <StatCounter value={500} label="Clients Served" icon={Users} suffix="+" />
            <StatCounter value={98} label="Compliance Rate" icon={CheckCircle2} suffix="%" />
            <StatCounter value={50} label="Tons Recycled" icon={Recycle} suffix="K+" />
            <StatCounter value={9} label="EPR Services" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-4">
              Comprehensive EPR Solutions
            </h2>
            <p className="text-[#81C784] max-w-2xl mx-auto">
              From battery recycling to environmental consulting, we provide end-to-end
              solutions for all your compliance needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} delay={i * 100} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="border-[#00E676]/30 text-[#00E676] hover:bg-[#00E676]/10 rounded-full px-8">
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#044036]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
                Trusted by Industry Leaders
              </h2>
              <p className="text-[#81C784] mb-8 leading-relaxed">
                With years of experience in environmental compliance, we have built a reputation
                for excellence, reliability, and results-driven solutions.
              </p>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#044036]/30 border border-[#044036]/50">
                    <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <h4 className="text-[#E0F2E9] font-semibold mb-1">{feature.title}</h4>
                      <p className="text-[#81C784] text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 rounded-3xl blur-xl" />
              <img
                src="/about-team.jpg"
                alt="Srishti Team"
                className="relative rounded-2xl border border-[#044036]/50 shadow-card"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#021C18]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#044036] to-[#021C18] border border-[#044036]/50 p-12 lg:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E676]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00BFA5]/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
                Ready to Achieve Compliance?
              </h2>
              <p className="text-[#81C784] max-w-2xl mx-auto mb-8">
                Let our experts guide you through the EPR compliance journey. Get started
                with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold px-8 py-6 text-base rounded-full">
                    Get Free Consultation
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-[#044036] text-[#E0F2E9] hover:bg-[#044036]/50 px-8 py-6 text-base rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
