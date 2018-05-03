import AnalyticsModel from '../models/analyticsModel'
import autoBind from 'auto-bind'
import API from '../api'

/**
 * @name AnalyticsSelector
 * @class AnalyticsSelector
 * @description Autobinds functions
 */
//'#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58'
class AnalyticsSelector {
  constructor(){
    autoBind(this)
  }
  /**
   * @name getAll
   * @description Returns a list of objects with all the analytic types
   * @method getAll
   * @memberof AnalyticsSelector.prototype
   */
  getAll(){
    API.fetchTimeEntries()
    .then(res => console.log(res))
    return [this.employeeHoursInStation(), this.employeeHoursInCostCenter(), this.projectCountForMonthsRatio(), this.projectCountForMonthsInCostCenter(), this.projectCountForCostCenterRatio(), this.projectCountForAPCRatio(), this.partCountForAPCRatio()]
  }
  /**
   * @name employeeHoursInStation
   * @description Returns the defined object specific to this analytic
   * @method employeeHoursInStation
   * @memberof AnalyticsSelector.prototype
   */
  employeeHoursInStation() {
    return {
      title: 'Employee Hours in a Station',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['Receiving','Ticketing','Preparation','Coating and Curing','Quality Control and Packaging'],
            datasets: [
              {
                label: 'Employee 1',
                backgroundColor: 'rgba(150,186,232,0.6)',
                borderColor: 'rgba(150,186,232,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,186,232,0.4)',
                data: [4,6,8,9,5]
              },
              {
                label: 'Employee 2',
                backgroundColor: 'rgba(161,160,160,0.6)',
                borderColor: 'rgba(161,160,160,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(161,160,160,0.4)',
                data: [5,5,8,1,6]
              },
              {
                label: 'Employee 3',
                backgroundColor: 'rgba(150,232,186,0.6)',
                borderColor: 'rgba(150,232,186,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,232,186,0.4)',
                data: [1,0,0,3,1]
              }
            ]
          }
        },
        [
          {
            type: 'Split Bar',
            component: 'bar',
            data: null
          },
          {
            type: 'Grouped Bar',
            component: 'bar',
            data: (datasets) => {
              let newdataset = [{
                backgroundColor: 'rgba(150,186,232,0.6)',
                borderColor: 'rgba(150,186,232,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,186,232,0.4)',
                label: 'Hours',
                data: []
              }]
              datasets.forEach(item => {
                if (newdataset[0].data.length == 0)
                  newdataset[0].data = item.data.slice()
                else
                  item.data.forEach((datapt,index) => {
                    newdataset[0].data[index]+=datapt
                  })
              })
              return newdataset
            }
          },
          {
            type: 'Pie',
            component: 'pie',
            data: (datasets) => {
              let newdataset = [{
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58'],
                data: []
              }]
              datasets.forEach(item => {
                if (newdataset[0].data.length == 0)
                  newdataset[0].data = item.data.slice()
                else
                  item.data.forEach((datapt,index) => {
                    newdataset[0].data[index]+=datapt
                  })
              })
              return newdataset
            }
          }
        ]
      )
    }
  }
  /**
   * @name employeeHoursInCostCenter
   * @description Returns the defined object specific to this analytic
   * @method employeeHoursInCostCenter
   * @memberof AnalyticsSelector.prototype
   */
  employeeHoursInCostCenter() {
    return {
      title: 'Employee Hours in a Cost Center',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['APC','Decorative','Maintenance','Administration','Production','Military','Research and Development'],
            datasets: [
              {
                label: 'Employee 1',
                backgroundColor: 'rgba(150,186,232,0.6)',
                borderColor: 'rgba(150,186,232,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,186,232,0.4)',
                data: [4,6,8,9,5,2,1]
              },
              {
                label: 'Employee 2',
                backgroundColor: 'rgba(161,160,160,0.6)',
                borderColor: 'rgba(161,160,160,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(161,160,160,0.4)',
                data: [5,5,8,1,6,7,7]
              },
              {
                label: 'Employee 3',
                backgroundColor: 'rgba(150,232,186,0.6)',
                borderColor: 'rgba(150,232,186,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,232,186,0.4)',
                data: [1,0,0,3,1,4,5]
              }
            ]
          }
        },
        [
          {
            type: 'Split Bar',
            component: 'bar',
            data: null
          },
          {
            type: 'Pie',
            component: 'pie',
            data: (datasets) => {
              let newdataset = [{
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58'],
                data: []
              }]
              datasets.forEach(item => {
                if (newdataset[0].data.length == 0)
                  newdataset[0].data = item.data.slice()
                else
                  item.data.forEach((datapt,index) => {
                    newdataset[0].data[index]+=datapt
                  })
              })
              return newdataset
            }
          }
        ]
      )
    }
  }
  /**
   * @name projectCountForCostCenterRatio
   * @description Returns the defined object specific to this analytic
   * @method projectCountForCostCenterRatio
   * @memberof AnalyticsSelector.prototype
   */
  projectCountForCostCenterRatio() {
    return {
      title: 'Total Project Count for a Cost Center Ratio',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['APC','Decorative','Maintenance','Administration','Production','Military','Research and Development'],
            datasets: [
              {
                data: [50,20,15,10,5,10,10],
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83','#E3BDB0'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83','#E3BDB0']
              }
            ]
          }
        },
        null,
        'pie'
      )
    }
  }
  /**
   * @name projectCountForAPCRatio
   * @description Returns the defined object specific to this analytic
   * @method projectCountForAPCRatio
   * @memberof AnalyticsSelector.prototype
   */
  projectCountForAPCRatio() {
    return {
      title: 'Total Project Type Count for APC Projects',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['Piston','Turbo','Rotor','Pump','Avaslick','Specialty'],
            datasets: [
              {
                data: [50,20,15,10,5,10],
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83']
              }
            ]
          }
        },
        null,
        'pie'
      )
    }
  }
  /**
   * @name partCountForAPCRatio
   * @description Returns the defined object specific to this analytic
   * @method partCountForAPCRatio
   * @memberof AnalyticsSelector.prototype
   */
  partCountForAPCRatio() {
    return {
      title: 'Total Part Count for APC Projects',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['Piston','Turbo','Rotor','Pump','Avaslick','Specialty'],
            datasets: [
              {
                data: [500,200,150,100,50,100],
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#695A83']
              }
            ]
          }
        },
        null,
        'pie'
      )
    }
  }
  /**
   * @name projectCountForMonthsRatio
   * @description Returns the defined object specific to this analytic
   * @method projectCountForMonthsRatio
   * @memberof AnalyticsSelector.prototype
   */
  projectCountForMonthsRatio() {
    return {
      title: 'Monthly Total Project Count for a Cost Center Ratio',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: [
              {
                data: [50,20,15,10,5,10,10,20,10,10,10,10],
                backgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#C5C3D1','#E3BDB0','#BAC9BC','#F7E9A0','#157E8A','#695A83','#CA776E'],
                hoverBackgroundColor: ['#96BAE8','#A1A0A0','#96E8BA','#E896BB','#FF9E58','#C5C3D1','#E3BDB0','#BAC9BC','#F7E9A0','#157E8A','#695A83','#CA776E']
              }
            ]
          }
        },
        null,
        'pie'
      )
    }
  }
  /**
   * @name projectCountForMonthsInCostCenter
   * @description Returns the defined object specific to this analytic
   * @method projectCountForMonthsInCostCenter
   * @memberof AnalyticsSelector.prototype
   */
  projectCountForMonthsInCostCenter() {
    return {
      title: 'Monthly Employee Hours in a Cost Center',
      model: new AnalyticsModel(
        () => {
          return {
            labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: [
              {
                label: 'APC',
                backgroundColor: 'rgba(150,186,232,0.6)',
                borderColor: 'rgba(150,186,232,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,186,232,0.4)',
                data: [4,6,8,9,5,2,1,8,4,3,2,1]
              },
              {
                label: 'Decorative',
                backgroundColor: 'rgba(161,160,160,0.6)',
                borderColor: 'rgba(161,160,160,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(161,160,160,0.4)',
                data: [5,5,8,1,6,7,7,7,2,1,5,6]
              },
              {
                label: 'Military',
                backgroundColor: 'rgba(150,232,186,0.6)',
                borderColor: 'rgba(150,232,186,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(150,232,186,0.4)',
                data: [1,0,0,3,1,4,5,1,0,0,1,1]
              }
            ]
          }
        },
        null,
        'bar'
      )
    }
  }
}

const analyticsSelector = new AnalyticsSelector()
export default analyticsSelector
