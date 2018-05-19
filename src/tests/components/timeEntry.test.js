import React from 'react'
import renderer from 'react-test-renderer'
import TimeEntry from '../../components/timeEntry'
jest.mock('../../components/form')

const defaultOptions = {
  website: {
    currentUser: {
      stationID: 1
    }
  },
  page: {
    formModel: {
      submissionConfirmOpen: false,
      closeModal: jest.fn(),
      errorModalOpen: false,
      errorResponse: 'errorResponse',
      setValue: jest.fn(),
      submit: jest.fn(),
    },
    setNullContent: jest.fn(),
    projectTimeEntryMenuItem: jest.fn()
  }
}

jest.useFakeTimers()

describe('TimeEntry', () => {
  it ('Renders', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Calls onChange', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    const inst = component.getInstance()
    inst.onChange({target: {value: '%'}})
    expect(inst.props.page.formModel.setValue).toHaveBeenCalled()
  })
  it ('Calls onClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    const inst = component.getInstance()
    inst.onClick({preventDefault: jest.fn()})
    expect(inst.props.page.formModel.submit).toHaveBeenCalled()
  })
  it ('Calls onCancel', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    const inst = component.getInstance()
    inst.onCancel({preventDefault: jest.fn()})
    expect(inst.props.page.setNullContent).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
    jest.runAllTimers()
    expect(inst.props.page.projectTimeEntryMenuItem).toHaveBeenCalled()
  })
})
