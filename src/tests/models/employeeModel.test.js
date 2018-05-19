import EmployeeModel from '../../models/employeeModel'


describe('EmployeeModel', () => {
  it ('Tests constructor', () => {
    let employee = new EmployeeModel(1,'firstName','lastName')
    expect(employee).toHaveProperty('id')
    expect(employee).toHaveProperty('firstName')
    expect(employee).toHaveProperty('lastName')
  })
  it ('Tests activate', () => {
    let employee = new EmployeeModel(1,'firstName','lastName')
    employee.activate()
    expect(employee.active).toBe(true)
  })
  it ('Tests deactivate', () => {
    let employee = new EmployeeModel(1,'firstName','lastName')
    employee.deactivate()
    expect(employee.active).toBe(false)
  })
  it ('Tests get barcodeDomID', () => {
    let employee = new EmployeeModel()
    employee.firstName = 'firstName'
    employee.id = 1
    expect(employee.barcodeDomID).toEqual('firstName1')
  })
  it ('Tests get barcodeScanID', () => {
    let employee = new EmployeeModel()
    employee.id = '1'
    expect(employee.barcodeScanID).toEqual('e1%')
  })
  it ('Tests get fullName', () => {
    let employee = new EmployeeModel()
    employee.firstName = 'firstName'
    employee.lastName = 'lastName'
    expect(employee.fullName).toEqual('firstName lastName')
  })
})
