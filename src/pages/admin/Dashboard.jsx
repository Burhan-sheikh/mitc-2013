import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import StatsCard from '@components/analytics/StatsCard';
import Chart from '@components/analytics/Chart';
import { useAnalytics } from '@hooks/useAnalytics';

export default function AdminDashboard() {
  const { analytics, loading } = useAnalytics(7);

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard label="Total Products" value={analytics.products?.total} icon={undefined} color='primary'/>
            <StatsCard label="Total Users" value={analytics.users?.total} icon={undefined} color='accent'/>
            <StatsCard label="Pending Reviews" value={analytics.reviews?.pending} icon={undefined} color='warning'/>
            <StatsCard label="Leads" value={analytics.leads?.total} icon={undefined} color='info'/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Product Views (Last 7 Days)</h2>
              {analytics.products?.topViewed && <Chart type="bar" data={{ labels: analytics.products.topViewed?.map(p=>p.title), datasets:[{label:'Views',data:analytics.products.topViewed?.map(p=>p.views||0),backgroundColor:'#a855f7'}] }} options={{ responsive:true, maintainAspectRatio:false }} />}
            </div>
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">User Role Distribution</h2>
              {analytics.users && <Chart type="pie" data={{ labels:['Admins','Users','Guests'], datasets:[{data:[analytics.users.admins, analytics.users.users, analytics.users.guests], backgroundColor:['#a855f7','#ec4899','#fbbf24']}]}} />}
            </div>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity (Coming soon)</h2>
            <div className="text-gray-400">See all recent system changes, new leads, product views and chats here.</div>
          </div>
        </main>
      </div>
    </div>
  );
}
