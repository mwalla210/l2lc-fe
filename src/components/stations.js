import React, {Component} from 'react'
import Barcode from './barcode'
import {ButtonGroup} from 'reactstrap'
import ButtonDefault from './buttonDefault'

/**
 * Stations component; constructor binds functions
 * @namespace Stations
 * @extends React.Component
 */
export default class Stations extends Component {
  constructor(props){
    super(props)
    this.printClick = this.printClick.bind(this)
  }

  /**
   * On click handler for print button
   * @method printClick
   * @memberof Stations.prototype
   */
  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  /**
   * Renders HTML div component containing DeleteModal, PromptModal, project info, project barcode, and project buttons
   * @method render
   * @memberof Stations.prototype
   * @return {Component}
   * @see {@link Barcode}
   * @see {@link DeleteModal}
   * @see {@link PromptModal}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   */
  render() {
    /*
     {title: 'Receiving'},{title: 'Ticketing'},{title: 'Preparation'},{title: 'Coating'},{title: 'Big Blaster'},{title: 'Decorative Coating'},{title: 'Packaging'},{title: 'Other'}
     */
    return (
      <div>
        <div className="row justify-content-center" style={{textAlign: 'center'}}>
          <div className="row justify-content-center">
            <ButtonGroup>
              <ButtonDefault className="btn-outline-secondary" onClick={this.printClick} text="Print"/>
            </ButtonGroup>
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Receiving</p>
            <Barcode
             imageDomID="receiving"
             barcodeID="receiving%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Ticketing</p>
            <Barcode
             imageDomID="ticketing"
             barcodeID="ticketing%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Preparation</p>
            <Barcode
             imageDomID="preparation"
             barcodeID="preparation%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Coating</p>
            <Barcode
             imageDomID="coating"
             barcodeID="coating%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Big Blaster</p>
            <Barcode
             imageDomID="bigBlaster"
             barcodeID="big blaster%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Decorative Coating</p>
            <Barcode
             imageDomID="decCoating"
             barcodeID="decorative coating%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Packaging</p>
            <Barcode
             imageDomID="packaging"
             barcodeID="packaging%"
            />
          </div>
          <div className="col-12">
            <p style={{marginBottom: '3px', marginTop: '60px'}}>Other</p>
            <Barcode
             imageDomID="other"
             barcodeID="other%"
            />
          </div>
        </div>
      </div>
    )
  }
}
