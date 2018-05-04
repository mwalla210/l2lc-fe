import FormSelector from '../../store/formSelector'
jest.mock('../../models/customerFormModel')
import CustomerFormModel from '../../models/customerFormModel'
jest.mock('../../models/employeeFormModel')
import EmployeeFormModel from '../../models/employeeFormModel'
jest.mock('../../models/projectFormModel')
import ProjectFormModel from '../../models/projectFormModel'
jest.mock('../../models/timeEntryFormModel')
import TimeEntryFormModel from '../../models/timeEntryFormModel'

describe('FormSelector', () => {
  it('Tests getNewCustomer', () => {
    let model = FormSelector.getNewCustomer()
    expect(model).toBeInstanceOf(CustomerFormModel)
  })
  it('Tests getEditCustomer', () => {
    let model = FormSelector.getEditCustomer()
    expect(model).toBeInstanceOf(CustomerFormModel)
    expect(model.setEdit).toHaveBeenCalled()
  })
  it('Tests getEmployee', () => {
    let model = FormSelector.getEmployee()
    expect(model).toBeInstanceOf(EmployeeFormModel)
  })
  it('Tests getEditEmployee', () => {
    let model = FormSelector.getEditEmployee()
    expect(model).toBeInstanceOf(EmployeeFormModel)
    expect(model.setEdit).toHaveBeenCalled()
  })
  it('Tests getProject', () => {
    let model = FormSelector.getProject()
    expect(model).toBeInstanceOf(ProjectFormModel)
  })
  it('Tests getEditProject', () => {
    let model = FormSelector.getEditProject()
    expect(model).toBeInstanceOf(ProjectFormModel)
    expect(model.setEdit).toHaveBeenCalled()
  })
  it('Tests getTimeEntry', () => {
    let model = FormSelector.getTimeEntry()
    expect(model).toBeInstanceOf(TimeEntryFormModel)
  })
})
