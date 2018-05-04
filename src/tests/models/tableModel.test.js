import TableModel from '../../models/tableModel'

jest.mock('../../components/tableActionCell')
jest.mock('../../components/projectStatusCell')
jest.mock('../../components/projectStatusFilter')

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setProject: jest.fn(),
  }
})

describe('TableModel', () => {
  it('Tests constructor', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    expect(project).toHaveProperty('styling')
  })


  it('Tests closeModal', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.closeModal()
    expect(project.modalOpen).toBe(false)
  })

  it('Tests openModal', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.openModal()
    expect(project.modalOpen).toBe(true)
  })

  it('Tests confirmAndClose', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.confirmAndClose()
    expect(project.modalOpen).toBe(false)
  })

  it('Tests loadingOn', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.loadingOn()
    expect(project.loading).toBe(true)
  })

  it('Tests loadingOff', () => {
    let project = new TableModel({},jest.fn(),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.loadingOff()
    expect(project.loading).toBe(false)
  })

  it('Tests dataFetch', () => {
    let project = new TableModel({},jest.fn().mockReturnValue(Promise.resolve()),[{}],{
      title: 'Delete Project?',
      confirmOnClick: jest.fn(),
      content: 'This action cannot be undone.'
    },jest.fn())
    project.dataFetch()
    expect(project.loading).toBe(true)
  })

})
