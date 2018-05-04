import ProjectSummaryModel from '../../models/projectSummaryModel'


describe('ProjectSummaryModel', () => {
  it ('Tests constructor', () => {
    let modal = new ProjectSummaryModel(jest.fn(), jest.fn())
    expect(modal).toHaveProperty('deleteModal')
    expect(modal).toHaveProperty('fieldModal')
    expect(modal).toHaveProperty('completeModal')
  })
})
