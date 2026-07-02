import { useState, ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { DashboardHeader } from './DashboardHeader'

interface DashboardLayoutProps {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[#021C18]">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <Sidebar onClose={() => setMobileMenuOpen(false)} />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <DashboardHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

                    {/* Content */}
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
