import { DashboardLayout } from '../components/DashboardLayout'

export default function AdminPanel() {
    return (
        <DashboardLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins']">Admin Panel</h1>
                <p className="text-[#81C784] mt-2">Administrative dashboard & management</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Manage Clients', 'Manage Employees', 'Manage Projects', 'View Analytics', 'Settings', 'Reports'].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all cursor-pointer">
                            <p className="text-[#E0F2E9] font-medium">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
