export type UserRole = 'admin' | 'manager' | 'employee' | 'client'

export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    role: UserRole
    company?: string
    phone?: string
    address?: string
    createdAt: string
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}

export interface Project {
    id: string
    name: string
    status: 'active' | 'completed' | 'on-hold' | 'planning'
    location: string
    progress: number
    budget: number
    spent: number
    deadline: string
    team: TeamMember[]
    complianceScore: number
    description: string
    createdAt: string
    updatedAt: string
}

export interface TeamMember {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
    joinedAt: string
}

export interface ComplianceReport {
    id: string
    projectId: string
    title: string
    status: 'compliant' | 'non-compliant' | 'pending' | 'warning'
    issueDate: string
    inspector: string
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    recommendations: string[]
    downloadUrl: string
    createdAt: string
}

export interface Document {
    id: string
    projectId: string
    name: string
    type: 'pdf' | 'image' | 'excel' | 'word' | 'other'
    size: number
    uploadedAt: string
    uploadedBy: string
    url: string
    version: number
    folder?: string
}

export interface Task {
    id: string
    projectId: string
    title: string
    description: string
    status: 'todo' | 'in-progress' | 'completed'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    assignee: TeamMember
    dueDate: string
    comments: Comment[]
    attachments: string[]
    createdAt: string
}

export interface Comment {
    id: string
    author: string
    text: string
    createdAt: string
}

export interface Invoice {
    id: string
    invoiceNumber: string
    projectId: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    issueDate: string
    dueDate: string
    downloadUrl: string
    createdAt: string
}

export interface Notification {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    read: boolean
    createdAt: string
    link?: string
}

export interface Message {
    id: string
    senderId: string
    senderName: string
    receiverId: string
    text: string
    attachments?: string[]
    readAt?: string
    createdAt: string
}
