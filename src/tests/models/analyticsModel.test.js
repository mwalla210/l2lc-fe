import AnalyticsModel from '../../models/analyticsModel'

describe('AnalyticsModel', () => {
  it ('Tests constructor', () => {
    let analytics = new AnalyticsModel([{type: 'bar'}], 'bar')
    expect(analytics).toHaveProperty('data')
    expect(analytics).toHaveProperty('currentFilter')
    expect(analytics).toHaveProperty('component')
    expect(analytics).toHaveProperty('yLabel')
    expect(analytics).toHaveProperty('loading')
    expect(analytics).toHaveProperty('currentTimeFrame')
  })
  it ('Tests constructor (null filters)', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    expect(analytics).toHaveProperty('data')
    expect(analytics).toHaveProperty('currentFilter')
    expect(analytics).toHaveProperty('component')
    expect(analytics).toHaveProperty('yLabel')
    expect(analytics).toHaveProperty('loading')
    expect(analytics).toHaveProperty('currentTimeFrame')
  })
  it ('Tests setData', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    expect(analytics.loading).toBe(true)
    analytics.setData(jest.fn(), [], [])
    expect(analytics.loading).toBe(false)
  })
  it ('Tests timeFilterData (array)', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    analytics.processor = jest.fn()
    analytics.unProcessedData = {
      first: [
        {
          time: new Date('December 17, 1995 03:24:00')
        },
        {
          time: new Date('September 17, 1995 03:24:00')
        },
      ]
    }
    analytics.timeFilterData(new Date('December 15, 1995 03:24:00'), 'filter')
    expect(analytics.currentTimeFrame).toBe('filter')
  })
  it ('Tests timeFilterData (object)', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    analytics.processor = jest.fn()
    analytics.unProcessedData = {
      first: {
        time: new Date('December 17, 1995 03:24:00')
      },
      second: {
        time: new Date('September 17, 1995 03:24:00')
      },
    }
    analytics.timeFilterData(new Date('December 15, 1995 03:24:00'), 'filter')
    expect(analytics.currentTimeFrame).toBe('filter')
  })
  it ('Tests timeFilterData (null date) & has currentFilter', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    analytics.processor = jest.fn()
    analytics.filters = [{type: 'currentFilter'}]
    analytics.currentFilter = 'currentFilter'
    analytics.currentTimeFrame = 'something else'
    expect(analytics.currentTimeFrame).toBe('something else')
    analytics.timeFilterData(null, 'filter')
    expect(analytics.currentTimeFrame).toBe('Year')
  })
  it ('Tests setFilteredData (original data)', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    analytics.data = {}
    analytics.originalData = {}
    analytics.filters = [
      {
        type: 'bar',
        component: 'component',
        yLabel: 'yLabel'
      }
    ]
    analytics.setFilteredData('bar')
    expect(analytics.currentFilter).toBe('bar')
    expect(analytics.yLabel).toBe('yLabel')
    expect(analytics.component).toBe('component')
    expect(Object.keys(analytics.data)).toHaveLength(0)
  })
  it ('Tests setFilteredData (other data)', () => {
    let analytics = new AnalyticsModel(null, 'bar')
    analytics.data = {}
    analytics.originalData = {}
    analytics.filters = [
      {
        type: 'bar',
        component: 'component',
        yLabel: 'yLabel',
        data: jest.fn()
      }
    ]
    analytics.setFilteredData('bar')
    expect(analytics.currentFilter).toBe('bar')
    expect(analytics.yLabel).toBe('yLabel')
    expect(analytics.component).toBe('component')
    expect(Object.keys(analytics.data)).toHaveLength(1)
  })
})
