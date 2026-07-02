import { useState } from 'react'
import { FolderOpen, Plus, ArrowRight, MapPin, Users, BarChart3, Calendar, Search, Filter } from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const projects = [
        {
            id: 1,
            name: 'Battery Recycling Initiative',
            status: 'active',
            location: 'Gurugram, Haryana',
            progress: 75,
            budget: 500000,
            spent: 375000,
            deadline: '2026-12-31',
            team: 5,
            complianceScore: 96,
        },
        {
            id: 2,
            name: 'Plastic Waste Management',
            status: 'active',
            location: 'Mumbai, Maharashtra',
            progress: 60,
            budget: 750000,
            spent: 450000,
            deadline: '2026-11-15',
            team: 8,
            complianceScore: 92,
        },
        {
            id: 3,
            name: 'E-Waste Compliance',
            status: 'planning',
            location: 'Bangalore, Karnataka',
            progress: 30,
            budget: 600000,
            spent: 180000,
            deadline: '2026-10-30',
            team: 3,
            complianceScore: 88,
        },
        {
            id: 4,
            name: 'Tyre Recycling Program',
            status: 'completed',
            location: 'Pune, Maharashtra',
            progress: 100,
            budget: 400000,
            spent: 399000,
            deadline: '2026-06-30',
            team: 4,
            complianceScore: 98,
        },
    ]

    const statusColors: Record<string, string> = {
        active: 'bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20',
        planning: 'bg-[#00BFA5]/10 text-[#00BFA5] border-[#00BFA5]/20',
        completed: 'bg-[#81C784]/10 text-[#81C784] border-[#81C784]/20',
        'on-hold': 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20',
    }

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins']">My Projects</h1>
                        <p className="text-[#81C784]">Manage and track all your compliance projects</p>
                    </div>
                    <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-6 hover:shadow-glow w-fit">
                        <Plus className="w-5 h-5 mr-2" />
                        New Project
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#81C784]" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#044036]/30 border border-[#044036]/50 rounded-lg text-[#E0F2E9] placeholder:text-[#81C784]/50 focus:outline-none focus:border-[#00E676] focus:ring-2 focus:ring-[#00E676]/50"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#044036]/30 border border-[#044036]/50 rounded-lg text-[#81C784] hover:text-[#00E676] hover:border-[#00E676]/30 transition-all">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow cursor-pointer hover:-translate-y-1"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FolderOpen className="w-5 h-5 text-[#00E676]" />
                                        <h3 className="text-lg font-semibold text-[#E0F2E9]">{project.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#81C784]">
                                        <MapPin className="w-4 h-4" />
                                        {project.location}
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-[#81C784]">Progress</span>
                                    <span className="text-sm font-medium text-[#E0F2E9]">{project.progress}%</span>
                                </div>
                                <div className="h-2.5 bg-[#021C18] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#00E676] to-[#00BFA5]"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-[#044036]/30">
                                <div className="text-center">
                                    <p className="text-xs text-[#81C784] mb-1">Compliance</p>
                                    <p className="text-lg font-bold text-[#00E676]">{project.complianceScore}%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-[#81C784] mb-1">Budget</p>
                                    <p className="text-sm font-bold text-[#E0F2E9]">₹{(project.spent / 100000).toFixed(1)}L</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-[#81C784] mb-1">Team</p>
                                    <p className="text-lg font-bold text-[#00BFA5]">{project.team}</p>
                                </div>
                            </div>

                            {/* Deadline & Action */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-[#81C784]">
                                    <Calendar className="w-4 h-4" />
                                    Due: {new Date(project.deadline).toLocaleDateString()}
                                </div>
                                <button className="flex items-center gap-1 text-[#00E676] hover:text-[#00BFA5] transition-colors text-sm font-medium">
                                    View <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
