import React from "react";
import _ from "lodash";
import { Bar } from 'react-chartjs-2';

const options = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [ {
      ticks: {
        autoSkip: false,
      },
      barPercentage: 0.4,
    } ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'earnings',
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'rgba(138,17,31,0.8)',
        },
      },
    ],
  },
};

class TagBarCharts extends React.Component {
  render() {
    const { data, name, color, tickercolor, height = 80, ticker } = this.props;
    if ( !data ) {
      return (
        <div className='font-12'>Not available at this time... </div>
      );
    }
    const dataSorted = _.sortBy(_.filter(data, d => d.value), d => d.value);
    const chartData = {
      labels: dataSorted.map( d => d.ticker ),
      datasets: [
        {
          borderWidth: 2,
          // borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          // pointBorderColor: 'red',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,100,0,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          yAxisID: 'earnings',
          data: dataSorted.map( d => d.value ),
          backgroundColor: dataSorted.map( d => (ticker && d.ticker !== ticker ? color : tickercolor) )
        },
      ],
    };

    return (
      <div className='row no-gutters font-10'>
        <div className='col-md-12' key={name}>
          <span className='font-12 darkred bold'>{name}</span>
          <Bar options={options} data={chartData} height={height} />
        </div>
      </div>
    );
  }
}

export default TagBarCharts;
