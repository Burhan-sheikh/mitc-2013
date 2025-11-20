export default function VisitorTable({ visitors = [] }) {
  if (!visitors.length) return <div className="py-6 text-gray-400">No visitor data.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full glass-card">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="py-2 px-4 text-left">Path</th>
            <th className="py-2 px-4 text-left">Referrer</th>
            <th className="py-2 px-4 text-left">Device</th>
            <th className="py-2 px-4 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 px-4">{v.path}</td>
              <td className="py-2 px-4">{v.referrer || '-'}</td>
              <td className="py-2 px-4">{v.deviceType || '-'}</td>
              <td className="py-2 px-4">{v.createdAt ? new Date(v.createdAt.seconds ? v.createdAt.seconds*1000 : v.createdAt).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
