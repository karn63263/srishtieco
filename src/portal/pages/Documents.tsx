import { DashboardLayout } from '../components/DashboardLayout'

export default function Documents() {
    return (
        <DashboardLayout>
            <div className="p-4 md:p-8">
                <h1 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins']">Documents</h1>
                <p className="text-[#81C784] mt-2">Manage project documents and files</p>
                <div className="mt-8 p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 text-center">
                    <p className="text-[#81C784]">Documents module coming soon...</p>
                </div>
            </div>
        </DashboardLayout>
    )
}
