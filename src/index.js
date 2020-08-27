/* eslint-disable no-undef */

import React from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';

export class NumberOfEmployees extends React.Component {
  render() {
    const { profile } = this.props;
    if (!profile || !profile.numbers) {
      return (
        <div className='font-12'>Not available at this time... </div>
      );
    }
    const number_of_employees_ts = profile.numbers.number_of_employees_ts || [];
    const number_of_employees = number_of_employees_ts.map(d => d.employees);
    const datasets = [{
      backgroundColor: '#A93226',
      borderColor: '#A93226',
      borderCapStyle: 'butt',
      pointBorderColor: '#A93226',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#A93226',
      pointHoverBorderColor: '#A93226',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: number_of_employees
    }];
    const data = {
      labels: number_of_employees_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
      datasets
    };
    const min = _.min(number_of_employees) || 0;
    const max = _.max(number_of_employees) || Number.MAX_SAFE_INTEGER;
    const options = {
      legend: {
        display: false,
        labels: {
          fontSize: 10,
          boxWidth: 10,
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 10
          },
          barPercentage: 0.4
        }],
        yAxes: [{
          ticks: {
            fontSize: 10,
            min: min === max ? Math.floot(max / 2) : Math.max(2 * min - max, 0)
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var label = 'Number of employees: ';
            label += tooltipItem.yLabel || 'n/a';
            return label;
          }
        }
      },
    };

    return (
      <Bar data={data} height={150} options={options} />
    );
  }
}

export default NumberOfEmployees;
