import PageStore from '../../store/page'
import {toJS} from 'mobx'
jest.mock('../../components/form')
jest.mock('../../components/table')
jest.mock('../../components/draggableTable')
jest.mock('react-table/react-table.css', () => 'CSS')
jest.mock('../../components/analytics')
jest.mock('../../components/timeEntry')
jest.mock('../../store/summarySelector', () => {
  return {
    getProject: (deleteFunc, completeFunc) => {
      return {
        component: 'project component',
        model: {
          name:'project model',
          deleteFunc,
          completeFunc
        },
      }
    },
    getCustomer: () => {
      return {
        component: 'customer component'
      }
    },
    getEmployee: () => {
      return {
        component: 'employee component',
        model: 'employee model'
      }
    }
  }
})
jest.mock('../../store/formSelector', () => {
  return {
    getProject: () => {return 'FS getProject'},
    getNewCustomer: (func) => {
      return {
        name: 'FS getNewCustomer',
        func
      }
    },
    getEditProject: () => {return 'FS getEditProject'},
    getTimeEntry: () => {return 'FS getTimeEntry'},
    getEditCustomer: () => {return 'FS getEditCustomer'},
    getEmployee: () => {return 'FS getEmployee'},
    getEditEmployee: () => {return 'FS getEditEmployee'},
    getTask: () => {return 'FS getTask'},
    getAccount: () => {return 'FS getAccount'},
    getEditAccount: () => {return 'FS getEditAccount'},
  }
})
jest.mock('../../store/tableSelector', () => {
  return {
    getSelectCreateCustomer: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getSelectUpdateCustomer: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getProject: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getNonSelectCustomer: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getEmployee: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getAccount: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getTasks: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getTimeEntries: () => {
      return {
        dataFetch: jest.fn()
      }
    },
    getCustomerProjects: () => {
      return {
        dataFetch: jest.fn()
      }
    },
  }
})
jest.mock('../../store/analyticsSelector', () => {
  return {
    getAll: () => {return [
      {model: {dataFetch: jest.fn()}}
    ]}
  }
})
jest.mock('../../store/website', () => {
  return {
    currentProject: {
      id: 'id',
      jobTypeTitle: 'jobTypeTitle',
      costCenterTitle: 'costCenterTitle',
      title: 'title',
      descr: 'descr',
      priority: 'priority',
      partCount: 'partCount',
      refNum: 'refNum',
      changeCustomer: jest.fn(),
      finish: jest.fn(),
      getTimeEntries: jest.fn(),
    },
    currentCustomer: {
      id: 'id'
    },
    currentEmployee: {
      id: 'id'
    },
    createProject: jest.fn().mockReturnValue(Promise.resolve('createProject')),
    updateProject: jest.fn().mockReturnValue(Promise.resolve('updateProject')),
    updateProjectStatus: jest.fn().mockReturnValue(Promise.resolve('updateProjectStatus')),
  }
})

describe('PageStore', () => {
  it('Tests constructor', () => {
    expect(PageStore.title).toBe('Default Title')
    expect(PageStore.content).toBeNull()
    expect(PageStore.tableModel).toBeNull()
    expect(PageStore.formModel).toBeNull()
    expect(PageStore.summaryModel).toBeNull()
    expect(PageStore.analyticsModel).toBeNull()
  })
  it('Tests createNewProjMenuItem', () => {
    PageStore.createNewProjMenuItem()
    expect(PageStore.title).toBe('New Project')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getProject')
  })
  it('Tests selectCustomerPage', () => {
    PageStore.selectCustomerPage()
    expect(PageStore.title).toBe('Select New Project Customer')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests newProjectNewCustomerPage', () => {
    PageStore.newProjectNewCustomerPage()
    expect(PageStore.title).toBe('New Customer for New Project')
    expect(typeof PageStore.content).toBe('function')
    expect(PageStore.formModel).toHaveProperty('name')
    expect(PageStore.formModel.name).toBe('FS getNewCustomer')
    PageStore.formModel.func()
  })
  it('Tests changeCustomerPage', () => {
    PageStore.changeCustomerPage()
    expect(PageStore.title).toBe('Change Project Customer')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests currentProjectNewCustomerPage', () => {
    PageStore.currentProjectNewCustomerPage()
    expect(PageStore.title).toBe('New Customer for Project')
    expect(typeof PageStore.content).toBe('function')
    expect(PageStore.formModel).toHaveProperty('name')
    expect(PageStore.formModel.name).toBe('FS getNewCustomer')
    PageStore.formModel.func()
  })
  it('Tests projectSummaryPage', () => {
    PageStore.projectSummaryPage()
    expect(PageStore.title).toBe('Project Summary ID: id')
    expect(PageStore.content).toBe('project component')
    expect(PageStore.summaryModel).toHaveProperty('name')
    expect(PageStore.summaryModel.name).toBe('project model')
    PageStore.summaryModel.deleteFunc()
    PageStore.summaryModel.completeFunc()
  })
  it('Tests projectTaskList', () => {
    PageStore.projectTaskList()
    expect(PageStore.title).toBe('Project Task List for ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests projectTimeEntryPage', () => {
    PageStore.projectTimeEntryPage()
    expect(PageStore.title).toBe('Project Time Entries for ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests newProjectTaskPage', () => {
    PageStore.newProjectTaskPage()
    expect(PageStore.title).toBe('New Task for ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getTask')
  })
  it('Tests projectEditPage', () => {
    PageStore.projectEditPage()
    expect(PageStore.title).toBe('Edit Project ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getEditProject')
  })
  it('Tests projectsMenuItem', () => {
    PageStore.projectsMenuItem()
    expect(PageStore.title).toBe('Projects')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests projectTimeEntryMenuItem', () => {
    PageStore.projectTimeEntryMenuItem()
    expect(PageStore.title).toBe('Time Entry')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getTimeEntry')
  })
  it('Tests customerInfoMenuItem', () => {
    PageStore.customerInfoMenuItem()
    expect(PageStore.title).toBe('Customers')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests newCustomerPage', () => {
    PageStore.newCustomerPage()
    expect(PageStore.title).toBe('New Customer')
    expect(typeof PageStore.content).toBe('function')
    expect(PageStore.formModel).toHaveProperty('name')
    expect(PageStore.formModel.name).toBe('FS getNewCustomer')
  })
  it('Tests customerSummaryPage', () => {
    PageStore.customerSummaryPage()
    expect(PageStore.title).toBe('Customer Summary ID: id')
    expect(PageStore.content).toBe('customer component')
  })
  it('Tests customerProjectsPage', () => {
    PageStore.customerProjectsPage()
    expect(PageStore.title).toBe('Customer Projects ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests customerEditPage', () => {
    PageStore.customerEditPage()
    expect(PageStore.title).toBe('Edit Customer ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getEditCustomer')
  })
  it('Tests analyticsMenuItem', () => {
    PageStore.analyticsMenuItem()
    expect(PageStore.title).toBe('Analytics Dashboard')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.analyticsModel)).toHaveLength(1)
  })
  it('Tests employeeInformationMenuItem', () => {
    PageStore.employeeInformationMenuItem()
    expect(PageStore.title).toBe('Employee Information')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests newEmployeePage', () => {
    PageStore.newEmployeePage()
    expect(PageStore.title).toBe('New Employee')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getEmployee')
  })
  it('Tests employeeEditPage', () => {
    PageStore.employeeEditPage()
    expect(PageStore.title).toBe('Edit Employee ID: id')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getEditEmployee')
  })
  it('Tests employeeSummaryPage', () => {
    PageStore.employeeSummaryPage()
    expect(PageStore.title).toBe('Employee Summary ID: id')
    expect(PageStore.content).toBe('employee component')
    expect(toJS(PageStore.summaryModel)).toBe('employee model')
  })
  it('Tests accountManagementMenuItem', () => {
    PageStore.accountManagementMenuItem()
    expect(PageStore.title).toBe('Account Management')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.tableModel)).toHaveProperty('dataFetch')
  })
  it('Tests newAccountPage', () => {
    PageStore.newAccountPage()
    expect(PageStore.title).toBe('New Account')
    expect(typeof PageStore.content).toBe('function')
    expect(toJS(PageStore.formModel)).toBe('FS getAccount')
  })
})
