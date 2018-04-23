import React from 'react'
import renderer from 'react-test-renderer'
import TimeEntry from '../../components/timeEntry'
jest.mock('../../components/form')

describe('TimeEntry', () => {
  it ('Does something', () => {
    let options = {
      website: {
        currentUser: {
          stationID: 1
        }
      },
      page: {}
    }
    const component = renderer.create(
      <TimeEntry {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
