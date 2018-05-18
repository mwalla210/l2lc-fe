import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Bar, Pie } from 'react-chartjs-2'
import {ButtonGroup, Button} from 'reactstrap'
import {BarLoader} from 'react-spinners'

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
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   * @see {@link https://github.com/davidhu2000/react-spinners BarLoader}
   */
  render() {
    return (
      <div className="row justify-content-center">
        {this.props.page.analyticsModelList.map((analytic, index) => {
          let buttons = []
          if (analytic.model.filters && analytic.model.filters.length > 1){
            analytic.model.filters.map((filter,filterIndex) => {
              let click = () => analytic.model.setFilteredData(filter.type)
              buttons.push(
                <Button size="sm" key={filterIndex} color="primary"
                  onClick={click} active={analytic.model.currentFilter === filter.type}
                >
                  {filter.type}
                </Button>
              )
            })
          }
          let yearSwitch = () => {
            analytic.model.timeFilterData()
          }
          let threeMonthSwitch = () => {
            let d = new Date()
            d.setMonth(d.getMonth() - 3)
            analytic.model.timeFilterData(d, '3 Months')
          }
          let monthSwitch = () => {
            let d = new Date()
            d.setMonth(d.getMonth() - 1)
            analytic.model.timeFilterData(d, '1 Month')
          }
          let weekSwitch = () => {
            let d = new Date()
            d.setDate(d.getDate() - 7)
            analytic.model.timeFilterData(d, '1 Week')
          }
          return (
            <div key={index} className={`col-${analytic.model.component == 'bar' ? '12' : '6'}`} style={{display: 'inline-block', paddingTop: 10}}>
              <h4 style={{textAlign: 'center'}}>{analytic.title}</h4>
              {(analytic.model.loading) ?
                <div className="row justify-content-center" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                  <BarLoader
                    color={'#2baae2'}
                    loading={analytic.model.loading}
                    height={8}
                    width={200}
                  />
                </div> :
                <div>
                  {analytic.model.filters && analytic.model.filters.length > 1 &&
                    <div className="row justify-content-center">
                      <ButtonGroup>
                        {buttons}
                      </ButtonGroup>
                    </div>
                  }
                  <div className="row justify-content-center">
                    <ButtonGroup>
                      <Button size="sm" color="secondary" onClick={yearSwitch} active={analytic.model.currentTimeFrame === 'Year'}>Year</Button>
                      <Button size="sm" color="secondary" onClick={threeMonthSwitch} active={analytic.model.currentTimeFrame === '3 Months'}>3 Months</Button>
                      <Button size="sm" color="secondary" onClick={monthSwitch} active={analytic.model.currentTimeFrame === '1 Month'}>1 Month</Button>
                      <Button size="sm" color="secondary" onClick={weekSwitch} active={analytic.model.currentTimeFrame === '1 Week'}>1 Week</Button>
                    </ButtonGroup>
                  </div>
                  {(analytic.model.component == 'bar') ?
                    <Bar
                      data={analytic.model.jsData}
                      width={100} height={60}
                      options={{
                        responsive:true,
                        scales:{
                          yAxes:[{display:true,ticks:{beginAtZero:true},scaleLabel: {display: true,labelString:analytic.model.yLabel}}],
                          xAxes:[{display:true,ticks:{autoSkip: false}}]
                        },
                      }}
                    /> :
                    <Pie data={analytic.model.jsData}/>
                  }
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}
