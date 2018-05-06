import AnalyticsModel from '../models/analyticsModel'
import autoBind from 'auto-bind'
import API from '../api'
import Consts from '../consts'

/**
 * @name AnalyticsSelector
 * @class AnalyticsSelector
 * @description Autobinds functions
 */
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
    let analytics = [
      this.employeeHoursInStation(),
      this.employeeHoursInCostCenter(),
      this.projectCountForCostCenterRatio(),
      this.partCountForAPCRatio(),
      this.projectCountForMonthsRatio()
    ]
    API.fetchTimeEntries()
    .then(res => {
      let {employeeEntries, projects, stations, costCenters, costCenterJobTypes, apcJobTypes, months} = this.processEntries(res)

      // TODO: instead of pre-processing all analytic datasets, give models original datasets & function to process, so they can filter original datasets by time-frame and then reapply processing function?
      // Week, month, three month, year

      // Time spent, by employee, by station
      analytics[0].model.setData(
        (stations, employeeEntries) => this.mapTimeByCategory(employeeEntries, stations, 'station'),
        stations,
        employeeEntries
      )

      // Time spent, by employee, by cost center
      analytics[1].model.setData(
        (costCenters, employeeEntries) => this.mapTimeByCategory(employeeEntries, costCenters, 'costCenter'),
        costCenters,
        employeeEntries
      )

      // Projects, by cost center and job type (if cost center and job type match and only one job type for cost center, abbreviate)
      analytics[2].model.setData(
        (costCenterJobTypes, projects) => this.projectsByCCJT(costCenterJobTypes, projects),
        costCenterJobTypes,
        projects
      )
      // APC project parts, by job type

      analytics[3].model.setData(
        (apcJobTypes, projects) => this.partsByAPCJT(apcJobTypes, projects),
        apcJobTypes,
        projects
      )
      // Projects, by month
      analytics[4].model.setData(
        (months, projects) => this.projectsByMonth(months, projects),
        months,
        projects
      )
    })
    return analytics
  }

  projectsByMonth(months, projects){
    let datasets = []
    let data = []
    months.forEach(month => {
      let count = 0
      Object.keys(projects).forEach(key => {
        if (projects[key].time.toLocaleString('en-us', {month: 'long'}) == month)
          count++
      })
      data.push(count)
    })
    datasets.push({
      data,
      backgroundColor: Consts.pieColors,
      hoverBackgroundColor: Consts.pieColors
    })
    return datasets
  }

  projectsByCCJT(costCenterJobTypes, projects){
    let datasets = []
    let data = []
    costCenterJobTypes.forEach(combination => {
      let count = 0
      Object.keys(projects).forEach(key => {
        if (projects[key].costCenterJobType == combination)
          count++
      })
      data.push(count)
    })
    datasets.push({
      data,
      backgroundColor: Consts.pieColors,
      hoverBackgroundColor: Consts.pieColors
    })
    return datasets
  }

  partsByAPCJT(apcJobTypes,projects){
    let datasets = []
    let data = []
    apcJobTypes.forEach(type => {
      let count = 0
      Object.keys(projects).forEach(key => {
        if (projects[key].costCenter == 'APC' && projects[key].jobType == type)
          count+=projects[key].partCount
      })
      data.push(count)
    })
    datasets.push({
      data,
      backgroundColor: Consts.pieColors,
      hoverBackgroundColor: Consts.pieColors
    })
    return datasets
  }

  /**
   * @name processEntries
   * @description Maps category names to empty arrays in an object
   * @method processEntries
   * @param  {Object[]}       entries Time entries from API
   * @return {Object}
   * @memberof AnalyticsSelector.prototype
   */
  processEntries(entries){
    // Following has structure:
    // Keys are employee names, values are list of objects with costCenter, station, time
    let employeeEntries = {}
    // Following has structure:
    // Keys are project IDs, value is object with costCenter, jobType, partCount, date (time)
    let projects = {}
    // List of string station names
    let stations = []
    // List of string cost center names
    let costCenters = []
    // List of string cost center and job type names
    let costCenterJobTypes = []
    // List of string APC job type names
    let apcJobTypes = []
    let months = []
    // Fill structures
    entries.forEach(timeEntry => {
      let dateTime = new Date(timeEntry.time)
      if (timeEntry.employeeName){
        let obj = {
          costCenter: timeEntry.costCenter,
          station: timeEntry.station,
          time: dateTime,
          projectId: timeEntry.projectId
        }
        // If employee has pre-started list, push
        if (employeeEntries.hasOwnProperty(timeEntry.employeeName)){
          employeeEntries[timeEntry.employeeName].push(obj)
        }
        // Else start list for employee
        else{
          employeeEntries[timeEntry.employeeName] = [obj]
        }
      }
      let cCJT = `${timeEntry.costCenter} - ${timeEntry.jobType}`
      // Use first occurrence for projects
      if (!projects.hasOwnProperty(timeEntry.projectId)){
        projects[timeEntry.projectId] = {
          costCenter: timeEntry.costCenter,
          jobType: timeEntry.jobType,
          partCount: timeEntry.partCount,
          time: dateTime,
          costCenterJobType: cCJT
        }
        let month = dateTime.toLocaleString('en-us', {month: 'long'})
        if (!months.includes(month))
          months.push(month)
      }
      if (!stations.includes(timeEntry.station))
        stations.push(timeEntry.station)
      if (!costCenters.includes(timeEntry.costCenter))
        costCenters.push(timeEntry.costCenter)
      if (!costCenterJobTypes.includes(cCJT))
        costCenterJobTypes.push(cCJT)
      if (timeEntry.costCenter == 'APC' && !apcJobTypes.includes(timeEntry.jobType))
        apcJobTypes.push(timeEntry.jobType)
    })
    return {employeeEntries, projects, stations, costCenters, costCenterJobTypes, apcJobTypes, months}
  }

  /**
   * @name categoryStructure
   * @description Maps category names to empty arrays in an object
   * @method categoryStructure
   * @param  {String[]}          categories Category names
   * @return {Object}
   * @memberof AnalyticsSelector.prototype
   */
  categoryStructure(categories){
    let data = {}
    // Map category names
    categories.forEach(category => {
      data[category] = []
    })
    return data
  }

  /**
   * @name mapTimeByCategory
   * @description Maps time entries by a category in a set of categories
   * @method mapTimeByCategory
   * @param  {Object[]}          employeeEntries Time entries
   * @param  {String[]}          categories      List of categories
   * @param  {String}          categoryName      Property accessor name corresponding to one of categories
   * @return {Object[]}
   * @memberof AnalyticsSelector.prototype
   */
  mapTimeByCategory(employeeEntries, categories, categoryName){
    let datasets = []
    Object.keys(employeeEntries).forEach((key,index) => {
      let data = []
      let entriesByCategory = this.categoryStructure(categories)
      // Map entries to categories
      employeeEntries[key].forEach(entry => {
        entriesByCategory[entry[categoryName]].push(entry)
      })
      // Process entries per category
      Object.keys(entriesByCategory).forEach(key => {
        if (entriesByCategory[key].length % 2 != 0)
          entriesByCategory[key].pop()
        // Split entries by project (time entries only sequential and differable in single project context)
        let entriesByProject = {}
        entriesByCategory[key].forEach(entry => {
          if (entriesByProject.hasOwnProperty(entry.projectId))
            entriesByProject[entry.projectId].push(entry)
          else
            entriesByProject[entry.projectId] = [entry]
        })
        let count = 0
        // Calculate time spent for projects in this station, then accumulate for total station hour count
        Object.keys(entriesByProject).forEach(projectKey => {
          // Calculate time totals here
          let {hour, min} = Consts.calculateTime(entriesByProject[projectKey].map(item => item.time))
          count += hour+parseFloat((min / 60.0).toFixed(2))
        })
        data.push(count)
      })
      datasets.push({
        label: key,
        backgroundColor: Consts.barBGColorByIndex(index),
        borderColor: Consts.barBorColorByIndex(index),
        borderWidth: 1,
        hoverBackgroundColor: Consts.barHovColorByIndex(index),
        data
      })
    })
    return datasets
  }

  /**
   * @name employeeHoursInStation
   * @description Returns the defined object specific to this analytic
   * @method employeeHoursInStation
   * @memberof AnalyticsSelector.prototype
   */
  employeeHoursInStation() {
    return {
      title: 'Employee Hours by Station',
      model: new AnalyticsModel(
        [
          {
            type: 'Split Bar',
            component: 'bar',
            yLabel: 'Hours',
            data: null
          },
          {
            type: 'Grouped Bar',
            yLabel: 'Hours',
            component: 'bar',
            data: (datasets) => {
              let newdataset = [{
                backgroundColor: Consts.barBGColorByIndex(0),
                borderColor: Consts.barBorColorByIndex(0),
                borderWidth: 1,
                hoverBackgroundColor: Consts.barHovColorByIndex(0),
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
                backgroundColor: Consts.pieColors,
                hoverBackgroundColor: Consts.pieColors,
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
      title: 'Employee Hours by Cost Center',
      model: new AnalyticsModel(
        [
          {
            type: 'Split Bar',
            component: 'bar',
            yLabel: 'Hours',
            data: null
          },
          {
            type: 'Pie',
            component: 'pie',
            data: (datasets) => {
              let newdataset = [{
                backgroundColor: Consts.pieColors,
                hoverBackgroundColor: Consts.pieColors,
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
      title: 'Projects by Cost Center',
      model: new AnalyticsModel(
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
      title: 'Parts by APC Project Type',
      model: new AnalyticsModel(
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
      title: 'Projects by Month',
      model: new AnalyticsModel(
        null,
        'pie'
      )
    }
  }
}

const analyticsSelector = new AnalyticsSelector()
export default analyticsSelector
