import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Bar, Pie } from 'react-chartjs-2'

/**
 * Analytics component; constructor binds functions
 * @namespace Analytics
 * @extends React.Component
 */
@inject ('page') @observer
export default class Analytics extends Component {
  constructor(props){
    super(props)
  }

  /**
   * Renders HTML div component, containing analytics
   * @method render
   * @memberof Analytics.prototype
   * @return {Component}
   * @see {@link https://www.npmjs.com/package/react-chartjs-2 React-ChartJS-2}
   */
  render() {
    return (
      <div>
        <analytics className="col-sm-6 col-sm-offset-3">
          {this.props.page.analyticsModel.map((analytic, index) => {
            let content = null
            let title = null
            switch (analytic.component){
              case 'bar':
                title = analytic.title
                content = <Bar data={toJS(analytic.model.data)} width={100} height={50} options={{responsive:true, scales:{yAxes:[{display:true,ticks:{beginAtZero:true}}],xAxes:[{display:true,ticks:{autoSkip: false}}]}}}/>
                break
              case 'pie':
                title = analytic.title
                content = <Pie data={toJS(analytic.model.data)}/>
                break
            }
            return (
              <div key={index}>
              <br/>
              <h2>{title}</h2>
              {content}
              <br/>
              <br/>
              </div>
            )
          })}
        </analytics>
      </div>
    )
  }
}

/*
      <div>
        <br/>
        <br/>
        <Bar
          data={this.props.page.analyticsModel.barData}
          width={100}
          height={50}
          options={{
            responsive: true,
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
        <br/>
        <br/>
        <Pie
          data={this.props.page.analyticsModel.pieData}
        />
        <br/>
        <br/>
        <Bar
          data={this.props.page.analyticsModel.barData}
          width={100}
          height={50}
          options={{
            responsive: true,
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
        <br/>
        <br/>
        <Pie
          data={this.props.page.analyticsModel.pieData}
        />
      </div>
    )
  }
}
*/
