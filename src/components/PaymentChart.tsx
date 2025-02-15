import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useStore } from '../store/useStore';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export const PaymentChart: React.FC = () => {
  const groups = useStore((state) => state.groups);

  const totalPayments = groups.reduce((acc, group) => {
    const groupTotal = group.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return [...acc, { name: group.name, total: groupTotal }];
  }, [] as { name: string; total: number }[]);

  const data = {
    labels: totalPayments.map(p => p.name),
    datasets: [
      {
        data: totalPayments.map(p => p.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Payment Distribution Across Groups',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Payment Overview</h3>
      <div className="w-full h-64 sm:h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};