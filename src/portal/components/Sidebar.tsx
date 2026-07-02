import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import {
    LayoutDashboard, FolderOpen, FileText, CheckSquare, Map, Receipt,
    MessageSquare, Calendar, Ticket, Settings, LogOut, Menu, X, Bell,
    ChevronDown, Leaf, Home
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/portal/dashboard' },
    { icon: Home, label: 'Overview', href: '/portal/overview' },
    { icon: FolderOpen, label: 'My Projects', href: '/portal/projects' },
    { icon: FileText, label: 'Compliance Reports', href: '/portal/reports' },
    { icon: FileText, label: 'Documents', href: '/portal/documents' },
    { icon: CheckSquare, label: 'Tasks', href: '/portal/tasks' },
    { icon: Map, label: 'GIS Maps', href: '/portal/maps' },
    { icon: Receipt, label: 'Invoices', href: '/portal/invoices' },
    { icon: MessageSquare, label: 'Messages', href: '/portal/messages' },
    { icon: Calendar, label: 'Calendar', href: '/portal/calendar' },
    { icon: Ticket, label: 'Support', href: '/portal/support' },
]

const bottomItems = [
    { icon: Settings, label: 'Settings', href: '/portal/settings' },
    { icon: Bell, label: 'Notifications', href: '/portal/notifications' },
]

interface SidebarProps {
    onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
    const location = useLocation()
    const { logout } = useAuth()
    const [isOpen, setIsOpen] = useState(true)

    const isActive = (href: string) => location.pathname === href

    const handleLogout = () => {
        logout()
    }

    return (
        <div
            className={`fixed lg:relative left-0 top-0 h-screen z-40 bg-[#021C18] border-r border-[#044036]/50 transition-all duration-300 ${isOpen
                    ? 'w-64'
                    : 'w-24 lg:w-64'
                }`}
        >
            {/* Logo */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-[#044036]/50">
                <Link to="/portal/dashboard" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00BFA5] flex items-center justify-center shrink-0">
                        <Leaf className="w-6 h-6 text-[#021C18]" />
                    </div>
                    <span className="font-bold text-[#E0F2E9] font-['Poppins'] hidden lg:block">
                        SRISHTI
                    </span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-1 text-[#81C784] hover:text-[#00E676]"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive(item.href)
                                ? 'bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676]'
                                : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
                            }`}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-[#044036]/30 mx-4" />

            {/* Bottom Items */}
            <nav className="px-4 py-4 space-y-2">
                {bottomItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive(item.href)
                                ? 'bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676]'
                                : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
                            }`}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                    </Link>
                ))}

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#FF6B6B] hover:bg-[#FF6B6B]/10 hover:border hover:border-[#FF6B6B]/20 transition-all duration-300"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium hidden lg:block">Logout</span>
                </button>
            </nav>
        </div>
    )
}
