import { BarChart3, TrendingUp, CheckCircle2, AlertCircle, Clock, Users, FileText, MapPin, FolderOpen } from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'
import { useAuth } from '../hooks/useAuth'

export default function DashboardHome() {
    const { auth } = useAuth()

    const stats = [
        {
            icon: FolderOpen,
            label: 'Active Projects',
            value: '8',
            change: '+2 this month',
            color: '#00E676',
        },
        {
            icon: CheckCircle2,
            label: 'Compliance Score',
            value: '94%',
            change: 'Excellent',
            color: '#00BFA5',
        },
        {
            icon: Clock,
            label: 'Pending Tasks',
            value: '12',
            change: 'Due this week',
            color: '#00E676',
        },
        {
            icon: FileText,
            label: 'On Hold Reports',
            value: '2',
            change: 'Need attention',
            color: '#FF6B6B',
        },
    ]

    const recentProjects = [
        {
            id: 1,
            name: 'Battery Recycling Initiative',
            status: 'active',
            progress: 75,
            deadline: '2026-12-31',
            team: 3,
        },
        {
            id: 2,
            name: 'Plastic Waste Management',
            status: 'active',
            progress: 60,
            deadline: '2026-11-15',
            team: 5,
        },
        {
            id: 3,
            name: 'E-Waste Compliance',
            status: 'planning',
            progress: 30,
            deadline: '2026-10-30',
            team: 2,
        },
    ]

    const recentNotifications = [
        {
            id: 1,
            title: 'Project Update',
            message: 'Battery Recycling Initiative milestone #2 completed',
            time: '2 hours ago',
            type: 'success',
        },
        {
            id: 2,
            title: 'Report Ready',
            message: 'Q2 Compliance Report is ready for download',
            time: '1 day ago',
            type: 'info',
        },
        {
            id: 3,
            title: 'Action Required',
            message: 'Invoice INV-2026-0042 is pending approval',
            time: '3 days ago',
            type: 'warning',
        },
    ]

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 space-y-8">
                {/* Welcome Card */}
                <div className="rounded-2xl bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 border border-[#044036]/50 p-8 shadow-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mb-2">
                                Hello, {auth.user?.name} 👋
                            </h1>
                            <p className="text-[#81C784]">
                                Welcome back to your compliance dashboard. Here's your project overview.
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-3 bg-[#044036]/30 backdrop-blur-xl border border-[#044036]/50 rounded-xl p-4">
                            <div className="text-center">
                                <p className="text-[#81C784] text-sm">Compliance Score</p>
                                <p className="text-3xl font-bold text-[#00E676] font-['Poppins']">94%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                </div>
                            </div>
                            <p className="text-[#81C784] text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-2">
                                {stat.value}
                            </p>
                            <p className="text-xs text-[#81C784]/70">{stat.change}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Projects */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl bg-[#044036]/30 border border-[#044036]/50 p-6">
                            <h2 className="text-xl font-bold text-[#E0F2E9] font-['Poppins'] mb-6">
                                Active Projects
                            </h2>

                            <div className="space-y-4">
                                {recentProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="p-4 rounded-xl bg-[#021C18]/50 border border-[#044036]/30 hover:border-[#00E676]/30 transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-[#E0F2E9] font-medium mb-1">{project.name}</h3>
                                                <p className="text-xs text-[#81C784]">
                                                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${project.status === 'active'
                                                        ? 'bg-[#00E676]/10 text-[#00E676]'
                                                        : 'bg-[#81C784]/10 text-[#81C784]'
                                                    }`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-2 bg-[#044036] rounded-full overflow-hidden mb-3">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#00E676] to-[#00BFA5]"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#81C784]">{project.progress}% Complete</span>
                                            <div className="flex items-center gap-1 text-xs text-[#81C784]">
                                                <Users className="w-3 h-3" />
                                                {project.team} team members
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="rounded-2xl bg-[#044036]/30 border border-[#044036]/50 p-6">
                        <h2 className="text-xl font-bold text-[#E0F2E9] font-['Poppins'] mb-6">
                            Recent Updates
                        </h2>

                        <div className="space-y-3">
                            {recentNotifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-4 rounded-lg border ${notif.type === 'success'
                                            ? 'bg-[#00E676]/10 border-[#00E676]/20'
                                            : notif.type === 'warning'
                                                ? 'bg-[#FF6B6B]/10 border-[#FF6B6B]/20'
                                                : 'bg-[#044036]/50 border-[#044036]/30'
                                        }`}
                                >
                                    <p className="text-sm font-medium text-[#E0F2E9] mb-1">{notif.title}</p>
                                    <p className="text-xs text-[#81C784] mb-2">{notif.message}</p>
                                    <p className="text-xs text-[#81C784]/50">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="rounded-2xl bg-[#044036]/30 border border-[#044036]/50 p-6">
                    <h2 className="text-xl font-bold text-[#E0F2E9] font-['Poppins'] mb-6">
                        Environmental Health Index
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Waste Reduction', value: '68%', icon: TrendingUp },
                            { label: 'Carbon Offset', value: '1,240 tons', icon: BarChart3 },
                            { label: 'Recycling Rate', value: '92%', icon: CheckCircle2 },
                            { label: 'Compliance Status', value: 'On Track', icon: AlertCircle },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-4 rounded-lg bg-[#021C18]/50 border border-[#044036]/30">
                                <item.icon className="w-8 h-8 text-[#00E676] mx-auto mb-3" />
                                <p className="text-sm text-[#81C784] mb-1">{item.label}</p>
                                <p className="text-2xl font-bold text-[#E0F2E9] font-['Poppins']">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
