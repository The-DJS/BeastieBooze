import React from 'react';
import { Line } from 'react-chartjs-2';


const Last30Days = ({ data }) => {
  // Expected data format either created in axios call or formatted from the backend.
  // const data = [
  //   ['May', null],
  //   ['Week 1 (Sat - Sun)', '995'],
  //   ['Week 2', '1005'],
  //   ['Week 3', '1125'],
  //   ['Week 4', '1252'],
  //   ['Week 5 (Mon - Wed)', '500'],
  //   ['Total', '4877'],
  // ];

  // Get the labels from the data.
  const getLabels = (filter) => {
    if (filter.toLowerCase() === 'page header') {
      return data.find(tuple => {
        if (tuple[1] === null) {
          return true
        }
      })[0];
    } else if (filter.toLowerCase() === 'chart') {
      const labels = [];
      data.map(tuple => {
        const label = tuple[0];
        const val = tuple[1];

        if (label.toLowerCase() !== 'total' && val !== null) {
          labels.push(label);
        }
      });

      return labels;
    }
  }

  // Get the totals from the data
  const getTotals = (filter) => {
    const totals = [];
    if (filter.toLowerCase() === 'month') {
      data.map(tuple => {
        const label = tuple[0];
        const total = tuple[1];

        if (label.toLowerCase() !== 'total' && total !== null) {
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
    labels: getLabels('chart'),
    datasets: [
      {
        label: '# of Sales',
        data: getTotals('month'),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
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
        {getLabels('page header')}'s Sales
      </h1>
      <Line data={chartData} options={options} />
      <h3 className='mb-3 text-center'>
        Total Sales on the {getLabels('page header')}: {getTotals('total')}
      </h3>
    </div>
  );
}

export default Last30Days;