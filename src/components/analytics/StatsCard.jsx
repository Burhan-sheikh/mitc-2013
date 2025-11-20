import { TrendingUp } from 'lucide-react';

export default function StatsCard({ icon: Icon = TrendingUp, label, value, subtext, color = 'primary' }) {
  return (
    <div className="glass-card flex items-center gap-4 p-6 shadow-md">
      <div className={`rounded-xl p-4 bg-${color}-500/20 text-${color}-700 dark:text-${color}-300`}> 
        <Icon className={`h-8 w-8`} />
      </div>
      <div>
        <div className="font-semibold text-lg">{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
      </div>
    </div>
  );
}
