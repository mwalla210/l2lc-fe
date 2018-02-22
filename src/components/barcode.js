import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import JsBarcode from 'jsbarcode'

@inject ('website') @observer
export default class Barcode extends Component {
  static propTypes = {
    imageDomID: PropTypes.string.isRequired,
    barcodeID: PropTypes.string.isRequired
  }

  render() {
    return (
      <img
        onLoad={() => JsBarcode(`#${this.props.imageDomID}`, `${this.props.barcodeID}`)}
        id={`${this.props.imageDomID}`}
        src='../../style/open-iconic-master/svg/image.svg'
        alt='image'
      />
    )
  }
}
