import SummarySelector from '../../store/summarySelector'
jest.mock('../../components/customerSummary')
jest.mock('../../components/employeeSummary')
jest.mock('../../components/projectSummary')
jest.mock('../../models/projectSummaryModel')
import ProjectSummaryModel from '../../models/projectSummaryModel'

describe('SummarySelector', () => {
  it('Tests getCustomer', () => {
    let model = SummarySelector.getCustomer()
    expect(model).toHaveProperty('model')
    expect(model.model).toBeNull()
    expect(model).toHaveProperty('component')
    expect(typeof model.component).toBe('function')
  })
  it('Tests getEmployee', () => {
    let model = SummarySelector.getEmployee()
    expect(model).toHaveProperty('model')
    expect(model.model).toBeNull()
    expect(model).toHaveProperty('component')
    expect(typeof model.component).toBe('function')
  })
  it('Tests getProject', () => {
    let model = SummarySelector.getProject()
    expect(model).toHaveProperty('model')
    expect(model.model).toBeInstanceOf(ProjectSummaryModel)
    expect(model).toHaveProperty('component')
    expect(typeof model.component).toBe('function')
  })
})
