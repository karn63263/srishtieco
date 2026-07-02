import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { Mail, Lock, Eye, EyeOff, Loader2, Leaf, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '../hooks/useAuth'

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

        const agentNum = 400
        const agents: { x: number; y: number; vx: number; vy: number }[] = []
        const canvasWidth = () => canvas.parentElement?.getBoundingClientRect().width ?? window.innerWidth
        const canvasHeight = () => canvas.parentElement?.getBoundingClientRect().height ?? window.innerHeight

        for (let i = 0; i < agentNum; i++) {
            agents.push({
                x: Math.random() * canvasWidth(),
                y: Math.random() * canvasHeight(),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
            })
        }

        const colors = ['0, 230, 118', '0, 191, 165', '129, 199, 132']

        const animate = () => {
            const w = canvasWidth()
            const h = canvasHeight()

            ctx.fillStyle = 'rgba(2, 28, 24, 0.1)'
            ctx.fillRect(0, 0, w, h)

            for (let i = 0; i < agents.length; i++) {
                const agent = agents[i]
                agent.x += agent.vx
                agent.y += agent.vy

                if (agent.x < 0) agent.x = w
                if (agent.x > w) agent.x = 0
                if (agent.y < 0) agent.y = h
                if (agent.y > h) agent.y = 0

                const size = 1.5
                const color = colors[i % 3]
                const grad = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, size * 3)
                grad.addColorStop(0, `rgba(${color}, 0.3)`)
                grad.addColorStop(1, `rgba(${color}, 0)`)
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(agent.x, agent.y, size, 0, 6.28318)
                ctx.fill()
            }

            animId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animId)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0" />
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { login, loginWithGoogle } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            if (!email || !password) {
                throw new Error('Please enter email and password')
            }

            await login(email, password)

            if (rememberMe) {
                localStorage.setItem('remember_email', email)
            }

            navigate('/portal/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true)
            // In production, trigger Google OAuth flow
            await loginWithGoogle('mock-id-token')
            navigate('/portal/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#021C18] overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/10 via-transparent to-[#00BFA5]/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            aria-label="Back to home"
                            className="absolute left-4 top-6 text-[#81C784] hover:text-[#00E676] flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm">Back</span>
                        </button>

                        <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00BFA5] flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-[#021C18]" />
                            </div>
                            <span className="text-2xl font-bold text-[#E0F2E9] font-['Poppins']">SRISHTI</span>
                        </div>

                        <h1 className="text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-[#81C784] text-lg mb-2">Client Portal</p>
                        <p className="text-[#81C784]/70 text-sm">
                            Access your compliance projects, reports, and documents from one secure platform
                        </p>
                    </div>

                    {/* Glass Card */}
                    <div className="backdrop-blur-xl bg-[#044036]/30 border border-[#044036]/50 rounded-2xl p-8 mb-6 shadow-card">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-[#FF6B6B]/10 border border-[#FF6B6B]/20">
                                <p className="text-[#FF6B6B] text-sm">{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[#E0F2E9] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#81C784]" />
                                    <Input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-[#021C18]/50 border-[#0F3D38] text-[#E0F2E9] placeholder:text-[#81C784]/50"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#E0F2E9] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#81C784]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-10 py-2 bg-[#021C18]/50 border border-[#0F3D38] rounded-md text-[#E0F2E9] placeholder:text-[#81C784]/50 focus:outline-none focus:border-[#00E676] focus:ring-2 focus:ring-[#00E676]/50"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#81C784] hover:text-[#00E676] transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-[#0F3D38] bg-[#021C18]/50 checked:bg-[#00E676] cursor-pointer"
                                    />
                                    <span className="text-sm text-[#81C784]">Remember me</span>
                                </label>
                                <Link
                                    to="/portal/forgot-password"
                                    className="text-sm text-[#00E676] hover:text-[#00BFA5] transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold py-3 rounded-lg hover:shadow-glow disabled:opacity-50 mt-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-[#044036]/30" />
                            <span className="text-xs text-[#81C784]">OR</span>
                            <div className="flex-1 h-px bg-[#044036]/30" />
                        </div>

                        {/* Google Login */}
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full border-[#044036]/50 text-[#E0F2E9] hover:bg-[#044036]/30 py-2.5 rounded-lg transition-all"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* Signup Link */}
                        <p className="text-center text-sm text-[#81C784] mt-6">
                            Don't have an account?{' '}
                            <Link
                                to="/portal/signup"
                                className="text-[#00E676] hover:text-[#00BFA5] font-medium transition-colors"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#81C784]">Secure end-to-end encrypted dashboard</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#81C784]">Real-time project tracking & compliance reports</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#81C784]">GIS maps & environmental monitoring</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
