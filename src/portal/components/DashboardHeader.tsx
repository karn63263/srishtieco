import { useState } from 'react'
import { Bell, Search, Settings, LogOut, User, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface DashboardHeaderProps {
    onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { auth, logout } = useAuth()
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [notificationCount] = useState(3)

    return (
        <header className="h-20 bg-[#021C18] border-b border-[#044036]/50 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-[#81C784] hover:text-[#00E676]"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-[#044036]/30 border border-[#044036]/50 rounded-lg px-4 py-2 flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#81C784]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-[#E0F2E9] placeholder:text-[#81C784]/50 outline-none text-sm flex-1"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-[#81C784] hover:text-[#00E676] transition-colors">
                    <Bell className="w-6 h-6" />
                    {notificationCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse" />
                    )}
                </button>

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#044036]/30 transition-colors"
                    >
                        <img
                            src={auth.user?.avatar || `https://ui-avatars.com/api/?name=${auth.user?.name}&background=00E676&color=021C18`}
                            alt={auth.user?.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-[#E0F2E9]">{auth.user?.name}</p>
                            <p className="text-xs text-[#81C784]">{auth.user?.role}</p>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-[#81C784] transition-transform ${showProfileMenu ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-[#044036]/50 border border-[#044036]/50 rounded-lg shadow-card backdrop-blur-xl">
                            <div className="p-4 border-b border-[#044036]/30">
                                <p className="text-sm text-[#E0F2E9] font-medium">{auth.user?.name}</p>
                                <p className="text-xs text-[#81C784]">{auth.user?.email}</p>
                            </div>

                            <div className="p-2 space-y-2">
                                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#E0F2E9] hover:bg-[#044036]/50 transition-colors text-sm">
                                    <User className="w-4 h-4" />
                                    My Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#E0F2E9] hover:bg-[#044036]/50 transition-colors text-sm">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                            </div>

                            <div className="p-2 border-t border-[#044036]/30">
                                <button
                                    onClick={() => {
                                        logout()
                                        setShowProfileMenu(false)
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors text-sm"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
