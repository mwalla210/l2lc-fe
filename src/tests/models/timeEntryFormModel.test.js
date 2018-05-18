import TimeEntryFormModel from '../../models/timeEntryFormModel'
//import Consts from '../../consts'

jest.mock('../../store/website', () => {
  return {
    createTimeEntry: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentUser:{
      stationID: 'Receiving'
    }
  }
})
jest.mock('../../store/page', () => {
  return {

  }
})
jest.mock('../../consts', () => {
  return {
    stationName: jest.fn().mockReturnValueOnce(true)
  }
})

describe('TimeEntryFormModel', () => {
  it ('Tests constructor', () => {
    let entry = new TimeEntryFormModel()
    entry.station = null
    entry.projectID = []
    console.log(entry.projectID.length)
    entry.enployeeID= []
    expect(entry).toHaveProperty('resetValuesAndValidation')
  })

  it ('Tests buttonDisabled', () => {
    let entry = new TimeEntryFormModel()
    entry.station = null
    entry.projectID = []
    console.log(entry.projectID.length)
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

  it ('Tests setValue for project', () => {
    let entry = new TimeEntryFormModel()
    entry.station = 'null'
    entry.projectID = 'null'
    entry.employeeID = []
    entry.setValue('1121','split')
    expect(entry.value).toEqual('1121')
  })

  it ('Tests setValue for employee', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('E1121','split')
    expect(entry.value).toEqual('E1121')
  })

  it ('Tests setValue for either', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('E1121','P1232')
    expect(entry.value).toEqual('E1121')
  })

  it ('Tests setValue for neither', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('','')
    expect(entry.value).toEqual('')
  })

  it ('Tests setValue for null', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue(null,null)
    expect(entry.value).toEqual(null)
  })

  it ('Tests setValue for incorrect input', () => {
    let entry = new TimeEntryFormModel()
    entry.setValue('PEIgf13','dfrgd63')
    expect(entry.value).toEqual('PEIgf13')
  })

  it ('Tests submit for null', () => {
    let entry = new TimeEntryFormModel()
    entry.submit()
    expect(entry.errorModalOpen).toEqual(false)
  })

  it ('Tests setError', () => {
    let entry = new TimeEntryFormModel()
    entry.setError('ErrorTXT')
    expect(entry.errorResponse).toEqual('ErrorTXT')
  })
})
