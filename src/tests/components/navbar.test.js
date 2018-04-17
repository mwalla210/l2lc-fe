import React from 'react'
import Navbar from '../../components/navbar'
import renderer from 'react-test-renderer'

jest.mock('../../components/promptModal')

describe('Navbar', () => {
  it ('Renders', () => {
    const options = {
      page: {
        employeeInformationMenuItem: () => console.log('employeeInformationMenuItem'),
        accountManagementMenuItem: () => console.log('accountManagementMenuItem'),
        createNewProjMenuItem: () => console.log('createNewProjMenuItem'),
        projectsMenuItem: () => console.log('projectsMenuItem'),
        projectTimeEntryMenuItem: () => console.log('projectTimeEntryMenuItem'),
        customerInfoMenuItem: () => console.log('customerInfoMenuItem'),
        analyticsMenuItem: () => console.log('analyticsMenuItem'),
      },
      website: {
        logOutModalOpen: false,
        currentUser: {
          username: 'Name'
        }
      }
    }
    const component = renderer.create(
      <Navbar {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
