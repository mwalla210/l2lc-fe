import React from 'react'
import renderer from 'react-test-renderer'
import Login from '../../components/login'
jest.mock('../../components/buttonPrimary')

const defaultOptions = {
  event: {
    target: {
      value: 'nameOrPassword'
    },
    preventDefault: jest.fn()
  },
  page: {
    createNewProjMenuItem: jest.fn()
  },
  website: {
    login: jest.fn(),
    updateUsername: jest.fn(),
    updatePassword: jest.fn(),
    loginerror: false,
    username:'testuser',
    password:'testpassword',
    loginButtonDisabled: false,
    },
  }

  const alternateOptions = {
    event: {
      target: {
        value: 'nameOrPassword'
      },
      preventDefault: jest.fn()
    },
    page: {
      createNewProjMenuItem: jest.fn()
    },
    website: {
      login: jest.fn(),
      updateUsername: jest.fn(),
      updatePassword: jest.fn(),
      loginerror: true,
      username:'testuser',
      password:'testpassword',
      loginButtonDisabled: false,
      },
    }

describe('Login', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Login {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguements', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <Login {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders and calls formSubmit', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Login {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.login.mock.calls.length).toBe(0)
    inst.formSubmit(inst.props.event)
    expect(inst.props.website.login.mock.calls.length).toBe(1)
  })

  it('Renders and calls onChangeUsername', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Login {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.updateUsername.mock.calls.length).toBe(0)
    inst.onChangeUsername(inst.props.event)
    expect(inst.props.website.updateUsername.mock.calls.length).toBe(1)
  })

  it('Renders and calls onChangePassword', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Login {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.updatePassword.mock.calls.length).toBe(0)
    inst.onChangePassword(inst.props.event)
    expect(inst.props.website.updatePassword.mock.calls.length).toBe(1)
  })
})
