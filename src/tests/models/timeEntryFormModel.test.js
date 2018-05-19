import TimeEntryFormModel from '../../models/timeEntryFormModel'

jest.mock('../../store/website', () => {
  return {
    createTimeEntry: jest.fn().mockReturnValue(Promise.resolve(null)),
    currentUser:{
      stationID: 'Receiving'
    },
    addToTaskHistory: jest.fn(),
  }
})
import Website from '../../store/website'
jest.mock('../../store/page', () => {
  return {
    projectTimeEntryMenuItem: jest.fn(),
    setNullContent: jest.fn()
  }
})

jest.useFakeTimers()

describe('TimeEntryFormModel', () => {
  it ('Tests constructor', () => {
    let entry = new TimeEntryFormModel()
    entry.station = null
    entry.projectID = []
    entry.enployeeID= []
    expect(entry).toHaveProperty('resetValuesAndValidation')
  })

  it ('Tests buttonDisabled', () => {
    let entry = new TimeEntryFormModel()
    entry.station = null
    entry.projectID = []
    entry.enployeeID= []
    expect(entry).toHaveProperty('resetValuesAndValidation')
  })

  it ('Tests openConfirmation', () => {
    let entry = new TimeEntryFormModel()
    entry.openConfirmation()
    expect(entry.submissionConfirmOpen).toEqual(true)
  })

  it ('Tests closeConfirmation', () => {
    let entry = new TimeEntryFormModel()
    entry.closeConfirmation()
    expect(entry.submissionConfirmOpen).toEqual(false)
  })

  it ('Tests openModal', () => {
    let entry = new TimeEntryFormModel()
    entry.openModal()
    expect(entry.errorModalOpen).toEqual(true)
  })

  it ('Tests closeModal', () => {
    let entry = new TimeEntryFormModel()
    entry.closeModal()
    expect(entry.errorModalOpen).toEqual(false)
  })

  it ('Tests resetValuesAndValidation', () => {
    let entry = new TimeEntryFormModel()
    entry.resetValuesAndValidation()
    expect(entry.value).toEqual('')
  })

  it ('Tests setValue for non-split', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('P1121',false)
    expect(entry.value).toEqual('P1121')
  })
  it ('Tests setValue for split (not shorthand), no submit', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('PACKAGING\n', true)
    expect(entry.value).toEqual('PACKAGING\n')
    expect(setTimeout).toHaveBeenCalledTimes(0)
  })
  it ('Tests setValue for split (shorthand), submit with errors', () => {
    let entry = new TimeEntryFormModel()
    Website.createTimeEntry = jest.fn().mockReturnValue(Promise.resolve('Not Null'))
    entry.setValue('SomethingElseWeirdWithNums1\nE1121\nE1121\nP1121\nP1121\nP111\ndeccoat\n', true)
    expect(entry.value).toEqual('SomethingElseWeirdWithNums1\nE1121\nE1121\nP1121\nP1121\nP111\ndeccoat\n')
  })
  it('Tests setValue station', (done) => {
    Website.createTimeEntry = jest.fn().mockReturnValue(Promise.resolve(null))
    let entry = new TimeEntryFormModel()
    entry.projectID.push('P3')
    entry.employeeID.push('E1')
    entry.station = 'receiving'
    entry.submit()
    expect.assertions(4)
    process.nextTick(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1)
      jest.runOnlyPendingTimers()
      expect(setTimeout).toHaveBeenCalledTimes(2)
      expect(Website.addToTaskHistory).toHaveBeenCalledTimes(0)
      jest.runOnlyPendingTimers()
      // Only expecting one call as we're only processing one tick forwards
      expect(Website.addToTaskHistory).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
