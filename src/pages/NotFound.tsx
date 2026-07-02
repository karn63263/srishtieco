import { Link } from 'react-router'
import { Leaf, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#021C18] flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00E676]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#00BFA5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4">
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676] to-[#00BFA5] flex items-center justify-center">
            <Leaf className="w-6 h-6 text-[#021C18]" />
          </div>
          <span className="text-xl font-bold text-[#E0F2E9] font-['Poppins']">SRISHTI</span>
        </Link>

        <div className="text-8xl lg:text-9xl font-bold text-[#044036] font-['Poppins'] mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
          Page Not Found
        </h1>
        <p className="text-[#81C784] max-w-md mx-auto mb-8">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Please check the URL or navigate back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-8 hover:shadow-glow">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" className="border-[#044036] text-[#E0F2E9] hover:bg-[#044036]/50 rounded-full px-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  )
}
