import FormSelector from '../../store/formSelector'
jest.mock('react-table/react-table.css', () => 'CSS')
jest.mock('react-toggle-switch/dist/css/switch.min.css', () => 'CSS')
jest.mock('../../models/customerFormModel')
import CustomerFormModel from '../../models/customerFormModel'
jest.mock('../../models/employeeFormModel')
import EmployeeFormModel from '../../models/employeeFormModel'
jest.mock('../../models/projectFormModel')
import ProjectFormModel from '../../models/projectFormModel'
jest.mock('../../models/timeEntryFormModel')
import TimeEntryFormModel from '../../models/timeEntryFormModel'
jest.mock('../../models/accountFormModel')
import AccountFormModel from '../../models/accountFormModel'
jest.mock('../../models/projectTaskFormModel')
import ProjectTaskFormModel from '../../models/projectTaskFormModel'

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
  it('Tests getTask', () => {
    let model = FormSelector.getTask()
    expect(model).toBeInstanceOf(ProjectTaskFormModel)
  })
  it('Tests getAccount', () => {
    let model = FormSelector.getAccount()
    expect(model).toBeInstanceOf(AccountFormModel)
  })
  it('Tests getEditAccount', () => {
    let model = FormSelector.getEditAccount()
    expect(model).toBeInstanceOf(AccountFormModel)
    expect(model.setEdit).toHaveBeenCalled()
  })
})
