/* eslint-disable no-undef */

import React from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

export class NumberOfEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { profile } = this.props;
    if (!profile) return true;
    if (nextState.copied) return true;
    if (profile.ticker !== nextProps.profile.ticker) return true;
    return false;
  }

  render() {
    const { profile } = this.props;
    const { copied } = this.state;
    if (!profile || !profile.numbers) {
      return (
        <div className='font-12'>Not available at this time... </div>
      );
    }
    if (profile.num_employees && profile.num_employees.url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} revenue and income margins`} src={profile.num_employees.url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile.num_employees.url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
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
            min: min === max ? Math.floor(max / 2) : Math.max(2 * min - max, 0)
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
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold' }}>{profile.ticker} - {profile.name}</div>
        <Bar data={data} height={150} options={options} />
      </div>
    );
  }
}

export default NumberOfEmployees;
