import React from 'react';
import { Line } from 'react-chartjs-2';

const ThisMonth = ({ data }) => {
  // Expected data format either created in axios call or formatted from the backend.
  // const data = [
  //   ['2020', null],
  //   ['Jan', '7000'],
  //   ['Feb', '6000'],
  //   ['Mar', '1000'],
  //   ['Apr', '0'],
  //   ['May', '0'],
  //   ['Jun', '0'],
  //   ['Jul', '0'],
  //   ['Aug', '0'],
  //   ['Sep', '0'],
  //   ['Oct', '0'],
  //   ['Nov', '0'],
  //   ['Dev', '0'],
  //   ['Total', '14000'],
  // ];

  // Get the labels from the data.
  const getLabels = (filter) => {
    if (filter.toLowerCase() === 'page header') {
      return data.find((tuple) => {
        if (tuple[1] === null) {
          return true;
        }
      })[0];
    } else if (filter.toLowerCase() === 'chart') {
      const labels = [];
      data.map((tuple) => {
        const label = tuple[0];
        const val = tuple[1];

        if (label.toLowerCase() !== 'total' && val !== null) {
          labels.push(label);
        }
      });

      return labels;
    }
  };

  // Get the totals from the data
  const getTotals = (filter) => {
    const totals = [];
    if (filter.toLowerCase() === 'year') {
      data.map((tuple) => {
        const label = tuple[0];
        const total = tuple[1];

        if (label.toLowerCase() !== 'total' && total !== null) {
          totals.push(total);
        }
      });
    } else if (filter.toLowerCase() === 'total') {
      return data.find((tuple) => {
        if (tuple[0].toLowerCase() === 'total') {
          return true;
        }
      })[1];
      // To add commas use for loop in reverse.
    }

    return totals;
  };

  const chartData = {
    labels: getLabels('chart'),
    datasets: [
      {
        label: 'Units Sold ',
        data: getTotals('year'),
        fill: false,
        backgroundColor: '#40c9ff',
        borderColor: 'rgba(64, 140, 255, 0.2)',
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
    <div className="col">
      <h1 className="mb-3 text-center">{getLabels('page header')}'s Sales</h1>
      <Line data={chartData} options={options} />
      <h3 className="mb-3 text-center">
        Total Sales in {getLabels('page header')}: {getTotals('total')}
      </h3>
    </div>
  );
};

export default ThisMonth;
