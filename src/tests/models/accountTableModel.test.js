import AccountTableModel from '../../models/accountTableModel'
import Switch from 'react-toggle-switch'
import renderer from 'react-test-renderer'

jest.mock('react-toggle-switch/dist/css/switch.min.css', () => 'CSS')

jest.mock('../../api', () => {
  return {
    fetchAccounts: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setAccount: jest.fn(),
    setUser: jest.fn(),
    currentUser: {
      admin: false
    },
  }
})


describe('AccountTableModel', () => {
  it('Tests constructor', () => {
    let account = new AccountTableModel(jest.fn(),jest.fn())
    expect(account).toHaveProperty('columns')
    expect(account.columns[2].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
  })

  it('Tests requiredClickHandler', () => {
    let account = new AccountTableModel(jest.fn(),jest.fn())
    expect(account).toHaveProperty('columns')
    account.data = [{item: 1}]
    account.requiredClickHandler()
  })

  it('Tests Admin column', () => {
    let account = new AccountTableModel(jest.fn(),jest.fn())
    expect(account.columns[2].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    const component = renderer.create(account.columns[2].Cell({original:{toggleAdmin: jest.fn(), admin: true}}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
    component.root.findByType(Switch).props.onClick()
  })
})
