import React from 'react';
import { Bar } from 'react-chartjs-2';

const ThisWeek = () => {
  // Expected data format either created in axios call or formatted from the backend.
  const data = [
    ['Monday', '50'],
    ['Tuesday', '70'],
    ['Wednesday', '25'],
    ['Thursday', '100'],
    ['Friday', '200'],
    ['Saturday', '270'],
    ['Sunday', '230'],
    ['Total', '1005'],
  ];

  // Get the labels from the data.
  const getLabels = () => {
    const labels = [];
    data.map(tuple => {
      const label = tuple[0];

      if (label.toLowerCase() !== 'total') {
        labels.push(label);
      }
    });

    return labels;
  }

  // Get the totals from the data
  const getTotals = (filter) => {
    const totals = [];
    if (filter.toLowerCase() === 'week') {
      data.map(tuple => {
        const label = tuple[0];
        const total = tuple[1];

        if (label.toLowerCase() !== 'total') {
          totals.push(total);
        }
      });
    } else if (filter.toLowerCase() === 'total') {
      return data.find(tuple => {
        if (tuple[0].toLowerCase() === 'total') {
          return true
        }
      })[1];
      // To add commas use for loop in reverse.
    }

    return totals;
  }

  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        label: '# of Sales',
        data: getTotals('week'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(96, 255, 64, 0.2)',
          'rgba(64, 140, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          '#40ff59',
          '#40c9ff',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='col'>
      <h1 className='mb-3 text-center'>
        This Week's Sales
      </h1>
      <Bar data={chartData} options={options} />
      <h3 className='mb-3 text-center'>
        Total sales this week: {getTotals('total')}
      </h3>
    </div>
  )
}

export default ThisWeek;
