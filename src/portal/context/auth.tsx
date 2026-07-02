import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthState } from '../types'

interface AuthContextType {
    auth: AuthState
    login: (email: string, password: string) => Promise<void>
    loginWithGoogle: (idToken: string) => Promise<void>
    logout: () => void
    signup: (email: string, password: string, name: string) => Promise<void>
    refreshToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    })

    // Initialize auth from localStorage on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const savedUser = localStorage.getItem('user')
                const token = localStorage.getItem('token')

                if (savedUser && token) {
                    const user = JSON.parse(savedUser)
                    setAuth({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                } else {
                    setAuth((prev) => ({ ...prev, isLoading: false }))
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error)
                setAuth((prev) => ({ ...prev, isLoading: false }))
            }
        }

        initializeAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setAuth((prev) => ({ ...prev, isLoading: true }))

            // Mock implementation - replace with real API call
            const mockUser: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                role: 'client',
                company: 'Srishti Eco Client',
                createdAt: new Date().toISOString(),
            }

            localStorage.setItem('user', JSON.stringify(mockUser))
            localStorage.setItem('token', 'mock-jwt-token-' + Date.now())

            setAuth({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            setAuth((prev) => ({ ...prev, isLoading: false }))
            throw error
        }
    }

    const loginWithGoogle = async (idToken: string) => {
        try {
            setAuth((prev) => ({ ...prev, isLoading: true }))

            // Mock implementation - replace with real Google OAuth
            const mockUser: User = {
                id: '1',
                email: 'client@srishtieco.tech',
                name: 'Client User',
                role: 'client',
                company: 'Srishti Eco Client',
                avatar: `https://ui-avatars.com/api/?name=Client+User&background=00E676&color=021C18`,
                createdAt: new Date().toISOString(),
            }

            localStorage.setItem('user', JSON.stringify(mockUser))
            localStorage.setItem('token', 'mock-jwt-token-' + Date.now())

            setAuth({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            setAuth((prev) => ({ ...prev, isLoading: false }))
            throw error
        }
    }

    const signup = async (email: string, password: string, name: string) => {
        try {
            setAuth((prev) => ({ ...prev, isLoading: true }))

            // Mock implementation - replace with real API call
            const mockUser: User = {
                id: '1',
                email,
                name,
                role: 'client',
                avatar: `https://ui-avatars.com/api/?name=${name}&background=00E676&color=021C18`,
                createdAt: new Date().toISOString(),
            }

            localStorage.setItem('user', JSON.stringify(mockUser))
            localStorage.setItem('token', 'mock-jwt-token-' + Date.now())

            setAuth({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            setAuth((prev) => ({ ...prev, isLoading: false }))
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setAuth({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        })
    }

    const refreshToken = async () => {
        try {
            // Mock implementation - replace with real API call
            const token = 'mock-jwt-token-' + Date.now()
            localStorage.setItem('token', token)
        } catch (error) {
            logout()
            throw error
        }
    }

    return (
        <AuthContext.Provider
            value={{ auth, login, loginWithGoogle, logout, signup, refreshToken }}
        >
            {children}
        </AuthContext.Provider>
    )
}
