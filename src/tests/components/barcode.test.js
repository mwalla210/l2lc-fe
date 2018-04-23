import React from 'react'
import renderer from 'react-test-renderer'
import Barcode from '../../components/barcode'
jest.mock('jsbarcode',() => {
  return jest.fn()})
import JsBarcode from 'jsbarcode'

const defaultOptions = {
    imageDomID: 'imageDomID',
    barcodeID: 'barcodeID',
}
describe('Barcode', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Barcode {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders and calls function', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Barcode {...options}/>,
    )
    const inst = component.getInstance()
    inst.renderBarcode()
    expect(JsBarcode.mock.calls.length).toBe(1)
  })
})
