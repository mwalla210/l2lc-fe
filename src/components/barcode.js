import React, {Component} from 'react'
import PropTypes from 'prop-types'
import JsBarcode from 'jsbarcode'

/**
 * Barcode component; constructor binds functions
 * @namespace Barcode
 * @property {String} imageDomID DOM ID for rendered image component
 * @property {String} barcodeID ID to provide to JsBarcode
 * @extends React.Component
 */
export default class Barcode extends Component {
  static propTypes = {
    imageDomID: PropTypes.string.isRequired,
    barcodeID: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)
    this.renderBarcode = this.renderBarcode.bind(this)
  }

  /**
   * Calls JsBarcode to change content in img component
   * @method renderBarcode
   * @memberof Barcode.prototype
   * @see {@link http://lindell.me/JsBarcode/ JsBarcode}
   */
  renderBarcode(){
    JsBarcode(`#${this.props.imageDomID}`, `${this.props.barcodeID}`, {displayValue: false, height: 100, width: 4, format: 'CODE39'})
  }

  /**
   * Renders HTML img component
   * @method render
   * @memberof Barcode.prototype
   * @return {Component}
   */
  render() {
    return (
      <img
        onLoad={this.renderBarcode}
        id={`${this.props.imageDomID}`}
        src="../../style/open-iconic-master/svg/image.svg"
        alt="image"
      />
    )
  }
}
