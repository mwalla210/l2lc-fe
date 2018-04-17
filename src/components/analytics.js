import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Bar, Pie } from 'react-chartjs-2'

/**
 * Analytics component; constructor binds functions
 * @namespace Analytics
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 */
@inject ('page') @observer
export default class Analytics extends Component {
  /**
   * Renders HTML div component, containing analytics
   * @method render
   * @memberof Analytics.prototype
   * @return {Component}
   * @see {@link https://www.npmjs.com/package/react-chartjs-2 React-ChartJS-2}
   */
  render() {
    return (
      <div className="row justify-content-center">
        {this.props.page.analyticsModel.map((analytic, index) => {
          let content = null
          let title = null
          switch (analytic.component){
            case 'bar':
              title = analytic.title
              content = <Bar data={analytic.model.jsData} width={100} height={60} options={{responsive:true, scales:{yAxes:[{display:true,ticks:{beginAtZero:true}}],xAxes:[{display:true,ticks:{autoSkip: false}}]}}}/>
              break
            case 'pie':
              title = analytic.title
              content = <Pie data={analytic.model.jsData}/>
              break
          }
          return (
            <div key={index} className="col-6" style={{display: 'inline-block', paddingTop: 10}}>
              <h4 style={{textAlign: 'center'}}>{title}</h4>
              {content}
            </div>
          )
        })}
      </div>
    )
  }
}
