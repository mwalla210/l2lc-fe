import React, {Component} from 'react'
import PropTypes from 'prop-types'
import JsBarcode from 'jsbarcode'

export default class Barcode extends Component {
  static propTypes = {
    imageDomID: PropTypes.string.isRequired,
    barcodeID: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)
    this.renderBarcode = this.renderBarcode.bind(this)
  }

  renderBarcode(){
    JsBarcode(`#${this.props.imageDomID}`, `${this.props.barcodeID}`, {displayValue: false, height: 40})
  }

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
