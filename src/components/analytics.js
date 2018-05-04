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
   */
  render() {
    return (
      <div className="row justify-content-center">
        {this.props.page.analyticsModel.map((analytic, index) => {
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
          return (
            <div key={index} className="col-6" style={{display: 'inline-block', paddingTop: 10}}>
              <h4 style={{textAlign: 'center'}}>{analytic.title}</h4>
              {(analytic.model.loading) ?
                <div className="row justify-content-center" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                  <BarLoader
                    color={'#123abc'}
                    loading={analytic.model.loading}
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
                  {(analytic.model.component == 'bar') ?
                    <Bar
                      data={analytic.model.jsData}
                      width={100} height={60}
                      options={{
                        responsive:true,
                        scales:{
                          yAxes:[{display:true,ticks:{beginAtZero:true}}],
                          xAxes:[{display:true,ticks:{autoSkip: false}}]
                        },
                        legend: {
                          display: false
                        }
                      }}
                    /> :
                    <Pie data={analytic.model.jsData} options={{
                      legend: {
                        display: false
                      }
                    }}/>
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
