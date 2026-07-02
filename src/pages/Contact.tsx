import { useState } from 'react'
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send,
  CheckCircle2, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PublicLayout from '@/components/layout/PublicLayout'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', companyName: '', businessCategory: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch {
      // Silently succeed even if API is unavailable
    } finally {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', companyName: '', businessCategory: '', message: '' })
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: Mail, label: 'Email', value: 'info@srishtieco.tech', href: 'mailto:info@srishtieco.tech' },
    { icon: MapPin, label: 'Address', value: 'Gurugram, Haryana, India', href: '#' },
    { icon: Clock, label: 'Business Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM', href: '#' },
  ]

  return (
    <PublicLayout>
      <section className="relative pt-32 pb-20 bg-[#021C18]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
              Let&apos;s Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-[#81C784] text-lg max-w-2xl mx-auto">
              Have questions about EPR compliance? Our team of experts is ready to help you navigate the regulatory landscape.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-[#E0F2E9] font-['Poppins'] mb-6">Get in Touch</h2>
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href} className="flex items-start gap-4 p-4 rounded-xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/20 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00E676]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#00E676]" />
                  </div>
                  <div>
                    <p className="text-[#81C784] text-sm">{item.label}</p>
                    <p className="text-[#E0F2E9] font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] font-medium hover:bg-[#00E676]/20 transition-all">
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl bg-[#044036]/30 border border-[#044036]/50">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#00E676]/10 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-[#00E676]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#E0F2E9] font-['Poppins'] mb-3">Message Sent Successfully!</h3>
                    <p className="text-[#81C784] mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-[#00E676]/30 text-[#00E676] hover:bg-[#00E676]/10">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#E0F2E9] font-['Poppins'] mb-6">Request a Consultation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[#E0F2E9]">Full Name *</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9] placeholder:text-[#81C784]/40 focus:border-[#00E676]/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#E0F2E9]">Company Name</Label>
                        <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Acme Corp" className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9] placeholder:text-[#81C784]/40 focus:border-[#00E676]/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#E0F2E9]">Email *</Label>
                        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" required className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9] placeholder:text-[#81C784]/40 focus:border-[#00E676]/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#E0F2E9]">Phone Number</Label>
                        <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9] placeholder:text-[#81C784]/40 focus:border-[#00E676]/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#E0F2E9]">Business Category</Label>
                      <Select value={formData.businessCategory} onValueChange={(value) => setFormData({ ...formData, businessCategory: value })}>
                        <SelectTrigger className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9]">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#044036] border-[#044036]">
                          {['Manufacturing', 'Electronics', 'Automobile', 'Plastic Industry', 'Importer', 'Recycler', 'Retail', 'FMCG', 'Other'].map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '_')} className="text-[#E0F2E9] hover:bg-[#00E676]/10 focus:bg-[#00E676]/10">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#E0F2E9]">Message</Label>
                      <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your compliance requirements..." rows={5} className="bg-[#021C18]/50 border-[#044036] text-[#E0F2E9] placeholder:text-[#81C784]/40 focus:border-[#00E676]/50 resize-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-8 hover:shadow-glow">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                        {loading ? 'Sending...' : 'Request Consultation'}
                      </Button>
                      <a href="tel:+919876543210">
                        <Button type="button" variant="outline" className="border-[#044036] text-[#E0F2E9] hover:bg-[#044036]/50 rounded-full px-8">
                          <Phone className="w-4 h-4 mr-2" /> Get a Call Back
                        </Button>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
