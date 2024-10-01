import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TooltipItem, TooltipModel } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface BarChartProps {
  data: {
    category: string;
    globalAverage: number;
    userValue: number;
  }[];
  width: number;
  height: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'User Value',
        data: data.map((item) => item.userValue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Global Average',
        data: data.map((item) => item.globalAverage),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            const datasetLabel = tooltipItem.dataset.label ?? 'Unknown';
            return `${datasetLabel}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  return <Bar data={chartData} options={options} width={width} height={height} />;
};

export default BarChart;
