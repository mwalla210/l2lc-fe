import TableSelector from '../../store/tableSelector'
jest.mock('../../models/projectTaskTableModel')
jest.mock('react-toggle-switch/dist/css/switch.min.css', () => 'CSS')
jest.mock('react-table/react-table.css', () => 'CSS')
import ProjectTaskTableModel from '../../models/projectTaskTableModel'
jest.mock('../../models/customerTableModel')
import CustomerTableModel from '../../models/customerTableModel'
jest.mock('../../models/employeeTableModel')
import EmployeeTableModel from '../../models/employeeTableModel'
jest.mock('../../models/projectTableModel')
import ProjectTableModel from '../../models/projectTableModel'
jest.mock('../../models/accountTableModel')
import AccountTableModel from '../../models/accountTableModel'
jest.mock('../../models/customerProjectsTableModel')
import CustomerProjectsTableModel from '../../models/customerProjectsTableModel'
jest.mock('../../models/timeEntryTableModel')
import TimeEntryTableModel from '../../models/timeEntryTableModel'

describe('TableSelector', () => {
  it('Tests getSelectCreateCustomer', () => {
    let model = TableSelector.getSelectCreateCustomer()
    expect(model).toBeInstanceOf(CustomerTableModel)
    expect(model.selectCreateTable).toHaveBeenCalled()
  })
  it('Tests getSelectUpdateCustomer', () => {
    let model = TableSelector.getSelectUpdateCustomer()
    expect(model).toBeInstanceOf(CustomerTableModel)
    expect(model.selectUpdateTable).toHaveBeenCalled()
  })
  it('Tests getNonSelectCustomer', () => {
    let model = TableSelector.getNonSelectCustomer()
    expect(model).toBeInstanceOf(CustomerTableModel)
  })
  it('Tests getEmployee', () => {
    let model = TableSelector.getEmployee()
    expect(model).toBeInstanceOf(EmployeeTableModel)
  })
  it('Tests getProject', () => {
    let model = TableSelector.getProject()
    expect(model).toBeInstanceOf(ProjectTableModel)
  })
  it('Tests getAccount', () => {
    let model = TableSelector.getAccount()
    expect(model).toBeInstanceOf(AccountTableModel)
  })
  it('Tests getCustomerProjects', () => {
    let model = TableSelector.getCustomerProjects()
    expect(model).toBeInstanceOf(CustomerProjectsTableModel)
  })
  it('Tests getTimeEntries', () => {
    let model = TableSelector.getTimeEntries()
    expect(model).toBeInstanceOf(TimeEntryTableModel)
  })
  it('Tests getTasks', () => {
    let model = TableSelector.getTasks()
    expect(model).toBeInstanceOf(ProjectTaskTableModel)
  })
})
