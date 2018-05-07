import TimeEntryTableModel from '../../models/timeEntryTableModel'

jest.mock('react-toggle-switch/dist/css/switch.min.css', () => 'CSS')

jest.mock('../../api', () => {
  return {
    fetchAccounts: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setAccount: jest.fn(),
    setUser: jest.fn(),
    currentProject: {
      timeEntries: []
    },
  }
})


describe('TimeEntryTableModel', () => {
  it('Tests constructor', () => {
    let timeEntryTable = new TimeEntryTableModel(jest.fn(),jest.fn())
    expect(timeEntryTable).toHaveProperty('columns')
    timeEntryTable.fetchFn()
  })
})
