import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { auth } = useAuth()

    if (auth.isLoading) {
        return (
            <div className="min-h-screen bg-[#021C18] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/portal/login" replace />
    }

    return children
}
