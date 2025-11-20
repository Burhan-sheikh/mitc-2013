import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { useAnalytics } from '@hooks/useAnalytics';
import Chart from '@components/analytics/Chart';
import VisitorTable from '@components/analytics/VisitorTable';

export default function AdminAnalytics() {
  const { analytics, loading } = useAnalytics(30);
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Product Views</h2>
              {analytics.products?.topViewed ? <Chart type="bar" data={{ labels: analytics.products.topViewed?.map(p=>p.title), datasets:[{label:'Views',data:analytics.products.topViewed?.map(p=>p.views||0),backgroundColor:'#a855f7'}] }} options={{ responsive:true, maintainAspectRatio:false }} /> : <span className="text-gray-400">No data</span>}
            </div>
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Most Viewed Brands</h2>
              {analytics.products?.topViewed ? <Chart type="pie" data={{ labels: analytics.products.topViewed.map(p=>p.brand), datasets:[{data:analytics.products.topViewed.map(p=>p.views||0),backgroundColor:['#a855f7','#ec4899','#fbbf24','#14b8a6']}]}} /> : <span className="text-gray-400">No data</span>}
            </div>
          </div>
          <div className="mb-8 glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Visitor Analytics (last 30 days)</h2>
            <VisitorTable visitors={analytics.visitors?.dailyVisitors || []}/>
          </div>
        </main>
      </div>
    </div>
  );
}
