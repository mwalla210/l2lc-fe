import Website from '../../store/website'
jest.mock('../../api', () => {
  return {
    createProject: jest.fn()
      .mockReturnValueOnce(Promise.resolve('createProject'))
      .mockReturnValueOnce(Promise.resolve({customer: {}}))
      .mockReturnValueOnce(Promise.resolve({customer: {id: 'id'}})),
    updateProject: jest.fn()
      .mockReturnValueOnce(Promise.resolve('updateProject'))
      .mockReturnValueOnce(Promise.resolve({})),
    updateProjectStatus: jest.fn().mockReturnValueOnce(Promise.resolve('updateProjectStatus')),
    createCustomer: jest.fn()
      .mockReturnValueOnce(Promise.resolve('createCustomer'))
      .mockReturnValueOnce(Promise.resolve({})),
    updateCustomer: jest.fn()
      .mockReturnValueOnce(Promise.resolve('updateCustomer'))
      .mockReturnValueOnce(Promise.resolve({})),
    createEmployee: jest.fn()
      .mockReturnValueOnce(Promise.resolve('createEmployee'))
      .mockReturnValueOnce(Promise.resolve({})),
    updateEmployee: jest.fn()
      .mockReturnValueOnce(Promise.resolve('updateEmployee'))
      .mockReturnValueOnce(Promise.resolve({})),
    create: jest.fn()
      .mockReturnValueOnce(Promise.resolve(406))
      .mockReturnValueOnce(Promise.resolve('success'))
      .mockReturnValueOnce(Promise.resolve(500)),
    login: jest.fn()
      .mockReturnValueOnce(Promise.resolve('login'))
      .mockReturnValueOnce(Promise.resolve(null)),
  }
})

describe('Website', () => {
  it('Tests constructor', () => {
    expect(Website.currentProject).toBeNull()
    expect(Website.currentCustomer).toBeNull()
    expect(Website.currentEmployee).toBeNull()
    expect(Website.currentUser).toBeNull()
    expect(Website.username).toBe('')
    expect(Website.password).toBe('')
    expect(Website.loginerror).toBe(false)
    expect(Website.logOutModalOpen).toBe(false)
    expect(Website.summaryMoreDropdownOpen).toBe(false)
    expect(Website.summaryActionsDropdownOpen).toBe(false)
  })
  it('Tests toggleSummaryMoreDD', () => {
    Website.toggleSummaryMoreDD()
    expect(Website.summaryMoreDropdownOpen).toBe(true)
  })
  it('Tests toggleSummaryActionsDD', () => {
    Website.toggleSummaryActionsDD()
    expect(Website.summaryActionsDropdownOpen).toBe(true)
  })
  it('Tests createProject (with string response)', () => {
    expect.assertions(2)
    Website.createProject({}).then(response => {
      expect(response).toBe('createProject')
      expect(Website.currentProject).toBeNull()
    })
  })
  it('Tests createProject (with object response, no customer)', () => {
    expect.assertions(3)
    Website.createProject({}).then(response => {
      expect(response).toBeNull()
      expect(Website.currentProject).toHaveProperty('customer')
      expect(Object.keys(Website.currentProject.customer)).toHaveLength(0)
    })
  })
  it('Tests createProject (with object response, with customer)', () => {
    expect.assertions(3)
    Website.createProject({}).then(response => {
      expect(response).toBeNull()
      expect(Website.currentProject).toHaveProperty('customer')
      expect(Website.currentProject.customer).toBeNull()
    })
  })
  it('Tests createCustomer (with string response)', () => {
    expect.assertions(2)
    Website.createCustomer({}).then(response => {
      expect(response).toBe('createCustomer')
      expect(Website.currentCustomer).toBeNull()
    })
  })
  it('Tests createCustomer (with object response)', () => {
    expect.assertions(2)
    Website.createCustomer({}).then(response => {
      expect(response).toBeNull()
      expect(Object.keys(Website.currentCustomer)).toHaveLength(0)
    })
  })
  it('Tests createEmployee (with string response)', () => {
    expect.assertions(2)
    Website.createEmployee({}).then(response => {
      expect(response).toBe('createEmployee')
      expect(Website.currentEmployee).toBeNull()
    })
  })
  it('Tests createEmployee (with object response)', () => {
    expect.assertions(2)
    Website.createEmployee({}).then(response => {
      expect(response).toBeNull()
      expect(Object.keys(Website.currentEmployee)).toHaveLength(0)
    })
  })
  it('Tests createTimeEntry (with 406 response)', () => {
    expect.assertions(1)
    Website.createTimeEntry({}, 1).then(response => {
      expect(response).toBe('Project or Employee does not exist')
    })
  })
  it('Tests createTimeEntry (with string response)', () => {
    expect.assertions(1)
    Website.createTimeEntry({}, 1).then(response => {
      expect(response).toBeNull()
    })
  })
  it('Tests createTimeEntry (with number response [!406])', () => {
    expect.assertions(1)
    Website.createTimeEntry({}, 1).then(response => {
      expect(response).toBe('Unexpected error')
    })
  })
  it('Tests updateProject (with string response)', () => {
    expect.assertions(1)
    Website.updateProject(1, {}).then(response => {
      expect(response).toBe('updateProject')
    })
  })
  it('Tests updateProject (with object response)', () => {
    expect.assertions(2)
    Website.updateProject(1, {}).then(response => {
      expect(response).toBeNull()
      expect(Object.keys(Website.currentProject)).toHaveLength(0)
    })
  })
  it('Tests updateProjectStatus (with object response)', () => {
    expect.assertions(1)
    Website.updateProjectStatus(1, 'completed').then(response => {
      expect(response).toBe(true)
    })
  })
  it('Tests updateEmployee (with string response)', () => {
    expect.assertions(1)
    Website.updateEmployee(1, {}).then(response => {
      expect(response).toBe('updateEmployee')
    })
  })
  it('Tests updateEmployee (with object response)', () => {
    expect.assertions(2)
    Website.updateEmployee(1, {}).then(response => {
      expect(response).toBeNull()
      expect(Object.keys(Website.currentEmployee)).toHaveLength(0)
    })
  })
  it('Tests updateCustomer (with string response)', () => {
    expect.assertions(1)
    Website.updateCustomer(1, {}).then(response => {
      expect(response).toBe('updateCustomer')
    })
  })
  it('Tests updateCustomer (with object response)', () => {
    expect.assertions(2)
    Website.updateCustomer(1, {}).then(response => {
      expect(response).toBeNull()
      expect(Object.keys(Website.currentCustomer)).toHaveLength(0)
    })
  })
  it('Tests logOutAlert', () => {
    Website.logOutAlert()
    expect(Website.logOutModalOpen).toBe(true)
  })
  it('Tests logOutDismiss', () => {
    Website.logOutDismiss()
    expect(Website.logOutModalOpen).toBe(false)
  })
  it('Tests updateUsername', () => {
    expect(Website.username).toBe('')
    expect(Website.loginerror).toBe(false)
    Website.updateUsername('username')
    expect(Website.username).toBe('username')
    expect(Website.loginerror).toBe(false)
  })
  it('Tests updatePassword, loginButtonDisabled', () => {
    expect(Website.password).toBe('')
    expect(Website.loginerror).toBe(false)
    expect(Website.loginButtonDisabled).toBe(true)
    Website.updatePassword('password')
    expect(Website.password).toBe('password')
    expect(Website.loginerror).toBe(false)
  })
  it('Tests login success', async function() {
    await Website.login(() => {})
    expect(Website.currentUser).toBe('login')
    expect(Website.username).toBe('')
    expect(Website.password).toBe('')
    expect(Website.loginerror).toBe(false)
  })
  it('Tests login failure', async function() {
    await Website.login(() => {})
    expect(Website.loginerror).toBe(true)
  })
})
