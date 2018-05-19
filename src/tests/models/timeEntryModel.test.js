import TimeEntryModel from '../../models/timeEntryModel'

describe('TimeEntryModel', () => {
  it ('Tests constructor', () => {
    let timeEntryModel = new TimeEntryModel(1, 1, 1, 'Recieving', 1234567890)
    expect(timeEntryModel).toHaveProperty('id')
    })
})
