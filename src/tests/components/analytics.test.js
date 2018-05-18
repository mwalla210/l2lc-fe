import React from 'react'
import renderer from 'react-test-renderer'
import Analytics from '../../components/analytics'
jest.mock('react-chartjs-2', () => ({
  Bar: 'Bar',
  Pie: 'Pie',
}))
jest.mock('reactstrap', () => ({
  ButtonGroup: 'ButtonGroup',
  Button: 'Button',
}))
jest.mock('react-spinners', () => ({
  BarLoader: 'BarLoader',
}))

describe('Analytics', () => {
  it ('Renders (non-loading bar with filters)', () => {
    let options = {
      page: {
        analyticsModelList: [
          {
            model: {
              filters: [
                {
                  type: 'type'
                },
                {
                  type: 'type'
                },
              ],
              setFilteredData: jest.fn(),
              timeFilterData: jest.fn(),
              component: 'bar',
              loading: false,
              currentTimeFrame: 'Year',
              jsData: [],
              yLabel: 'yLabel'
            }
          }
        ]
      }
    }
    const component = renderer.create(
      <Analytics {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    let filterSet = component.root.children[0].children[0].children[1].children[0].children[0].children
    filterSet.forEach(buttonInstance => {
      buttonInstance.props.onClick()
    })
    let timeFrameSet = component.root.children[0].children[0].children[1].children[1].children[0].children
    timeFrameSet.forEach(buttonInstance => {
      buttonInstance.props.onClick()
    })
  })
  it ('Renders (non-loading pie)', () => {
    let options = {
      page: {
        analyticsModelList: [
          {
            model: {
              timeFilterData: jest.fn(),
              component: 'pie',
              loading: false,
              currentTimeFrame: 'Year',
              jsData: [],
              yLabel: 'yLabel'
            }
          }
        ]
      }
    }
    const component = renderer.create(
      <Analytics {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders (loading)', () => {
    let options = {
      page: {
        analyticsModelList: [
          {
            model: {
              timeFilterData: jest.fn(),
              component: 'bar',
              loading: true,
              currentTimeFrame: 'Year',
              jsData: [],
              yLabel: 'yLabel'
            }
          }
        ]
      }
    }
    const component = renderer.create(
      <Analytics {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
