import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PieController, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, ArcElement, LineElement, PointElement, Tooltip, Legend);

export default function Chart({ type = 'bar', data, options }) {
  if (type === 'bar') return <Bar data={data} options={options} />;
  if (type === 'pie') return <Pie data={data} options={options} />;
  if (type === 'line') return <Line data={data} options={options} />;
  return null;
}
