import React from 'react'
import renderer from 'react-test-renderer'
import TimeEntry from '../../components/timeEntry'
jest.mock('../../components/form')

describe('TimeEntry', () => {
  it ('Renders', () => {
    let options = {
      website: {
        currentUser: {
          stationID: 1
        }
      },
      page: {
        formModel: {
          submissionConfirmOpen: false
        }
      }
    }
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
