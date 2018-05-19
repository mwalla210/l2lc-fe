import AnalyticsSelector from '../../store/analyticsSelector'
// jest.mock('../../models/analyticsModel')
import AnalyticsModel from '../../models/analyticsModel'
jest.mock('../../api', () => {
  return {
    fetchAnalytics: jest.fn().mockReturnValue(Promise.resolve([
      {
        time: 'September 17, 1995 03:24:00',
        costCenter: 'APC',
        station: 'station',
        projectId: 'projectId',
        employeeName: 'employeeName',
        jobType: 'jobType',
        partCount: 2
      },
      {
        time: 'September 17, 1995 03:27:00',
        costCenter: 'APC',
        station: 'station',
        projectId: 'projectId',
        employeeName: 'employeeName',
        jobType: 'jobType',
        partCount: 2
      },
      {
        time: 'August 17, 1995 03:27:00',
        costCenter: 'other',
        station: 'station',
        projectId: 'projectId',
        employeeName: 'employeeName2',
        jobType: 'jobType',
        partCount: 2
      },
      {
        time: 'August 17, 1995 03:37:00',
        costCenter: 'other',
        station: 'station',
        projectId: 'projectId',
        employeeName: 'employeeName2',
        jobType: 'jobType',
        partCount: 2
      },
      {
        time: 'August 17, 1995 03:27:00',
        costCenter: 'other',
        station: 'station',
        projectId: 'projectId',
        employeeName: 'employeeName3',
        jobType: 'jobType',
        partCount: 2
      },
      {
        time: 'June 18, 1995 03:24:00',
        costCenter: 'costCenter2',
        station: 'station2',
        projectId: 'projectId2',
        jobType: 'jobType2',
        partCount: 3
      },
      {
        time: 'June 18, 1995 03:24:00',
        costCenter: 'costCenter2',
        station: 'station2',
        projectId: 'projectId1',
        jobType: 'jobType2',
        partCount: 3
      },
    ]))
  }
})

describe('AnalyticsSelector', () => {
  it('Tests getAll', () => {
    let modelObjects = AnalyticsSelector.getAll()
    modelObjects.forEach(modelObject => {
      expect(modelObject.model).toBeInstanceOf(AnalyticsModel)
    })
    let newData = modelObjects[0].model.filters[1].data([{data: [1]},{data: [2]}])
    expect(newData).toHaveLength(1)
    expect(newData[0]).toHaveProperty('backgroundColor')
    expect(newData[0]).toHaveProperty('borderColor')
    expect(newData[0]).toHaveProperty('borderWidth')
    expect(newData[0]).toHaveProperty('hoverBackgroundColor')
    expect(newData[0]).toHaveProperty('label')
    expect(newData[0]).toHaveProperty('data')
    newData = modelObjects[0].model.filters[2].data([{data: [1]},{data: [2]}])
    expect(newData).toHaveLength(1)
    expect(newData[0]).toHaveProperty('backgroundColor')
    expect(newData[0]).toHaveProperty('hoverBackgroundColor')
    expect(newData[0]).toHaveProperty('data')
    newData = modelObjects[1].model.filters[1].data([{data: [1]},{data: [2]}])
    expect(newData).toHaveLength(1)
    expect(newData[0]).toHaveProperty('backgroundColor')
    expect(newData[0]).toHaveProperty('hoverBackgroundColor')
    expect(newData[0]).toHaveProperty('data')
  })
})
