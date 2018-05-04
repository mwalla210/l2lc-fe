import TimeEntryFormModel from '../../models/timeEntryFormModel'

jest.mock('../../store/website', () => {
  return {
    createTimeEntry: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentUser:{
      stationID: 'Receiving'
    }
  }
})

describe('TimeEntryFormModel', () => {
  it ('Tests constructor', () => {
    let entry = new TimeEntryFormModel()
    expect(entry).toHaveProperty('resetValuesAndValidation')
  })
  it ('Tests constructor onChange from FormModel', () => {
    let entryFormModel = new TimeEntryFormModel()
    entryFormModel.modifyFieldValue(0,'Q')
    entryFormModel.fieldValidatorWrapper(0)
    entryFormModel.modifyFieldValue(0,'P')
    entryFormModel.modifyFieldValue(0,'P1')
    entryFormModel.modifyFieldValue(0,'P1%')
    entryFormModel.modifyFieldValue(1,'E')
    entryFormModel.modifyFieldValue(1,'E1')
    entryFormModel.modifyFieldValue(1,'E1%')
  })
  it ('Tests primayButton time entry creation', async function() {
    let entryFormModel = new TimeEntryFormModel()
    await entryFormModel.primaryButton.onClick([
      {
        value: 'value'
      },
      {
        value: 'value'
      }
    ])
    expect(entryFormModel.errorResponse).toBe('response')
    expect(entryFormModel.modalOpen).toBe(true)
  })
  it ('Tests closeModal', () => {
    let entryFormModel = new TimeEntryFormModel()
    entryFormModel.closeModal()
    expect(entryFormModel.modalOpen).toBe(false)
  })
})
