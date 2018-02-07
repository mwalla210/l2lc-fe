import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name CustomerModel
 * @class CustomerModel
 * @classdesc Customer storage object
 * @property {Number} id  ID of Customer
 * @property {String} companyName Name of Customer [observable]
 * @property {String} [email=''] Email of Customer [observable]
 * @property {String} [website=''] Website of Customer [observable]
 * @property {String} [phone=''] Phone of Customer [observable]
 * @property {Boolean} [pastDue = false] Indicator of overdue bills for Customer [observable]
 * @property {Object} shipAddr Shipping address object for Customer [observable]
 * @property {String} shipAddr.shipAddr1 Line one of shipping address for Customer [observable]
 * @property {String} [shipAddr.shipAddr2=''] Line two of shipping address for Customer [observable]
 * @property {String} shipAddr.shipCity City of shipping address of Customer [observable]
 * @property {String} shipAddr.shipState State of shipping address of Customer [observable]
 * @property {String} shipAddr.shipCountry Country of shipping address of Customer [observable]
 * @property {Number} shipAddr.shipZip Zipcode of shipping address of Customer [observable]
 * @property {Object} [billAddr={}] Line one of billing address for Customer [observable]
 * @property {String} billAddr.billAddr1 Line one of billing address for Customer [observable]
 * @property {String} [billAddr.billAddr2=''] Line two of billing address for Customer [observable]
 * @property {String} billAddr.billCity City of billing address of Customer [observable]
 * @property {String} billAddr.billState State of billing address of Customer [observable]
 * @property {String} billAddr.billCountry Country of billing address of Customer [observable]
 * @property {Number} billAddr.billZip Zipcode of billing address of Customer [observable]
 * @property {Boolean} [billIsSame=false] Indicator that billing address is same as shipping address for Customer [observable]
 */
export default class CustomerModel {
  constructor(id, companyName, shipAddr1, shipAddr2, shipCity, shipState, shipCountry, shipZip, email, phone, website, billIsSame, billAddr1, billAddr2, billCity, billState, billCountry, billZip) {
    let addtlProps = {
      companyName,
      billIsSame,
      shipAddr: {
        // Required
        shipAddr1,
        shipCity,
        shipState,
        shipCountry,
        shipZip,
        //Optional
        shipAddr2
      },
      // Optional
      email,
      phone,
      website,
      billAddr: {
        // Required
        billAddr1,
        billCity,
        billState,
        billCountry,
        billZip,
        // Optional
        billAddr2,
      }
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.id = id
  }

  @action setBillIsSame(){this.billIsSame = true}

  /**
  * @name edit
  * @description Updates Customer object in database
  * @memberof CustomerModel.prototype
  * @method
  * @mobx action
  */
  @action edit(){
    // TODO: Description: updates Customer object in database
  }

  /**
  * @name getProjects
  * @description Fetches Projects from database that are associated with Customer ID
  * @memberof CustomerModel.prototype
  * @method
  * @mobx action
  */
  @action getProjects(){
    // TODO: Fetches Projects from database that are associated with Customer ID
  }

  /**
  * @name getformattedShipAddress
  * @description Provides formatted concatenated string of shipping address
  * @memberof CustomerModel.prototype
  * @method
  * @mobx computed
  */
  @computed get formattedShipAddress(){
    // Allow for missing addr2, state
    return `${this.shipAddr.shipAddr1}\n${(this.shipAddr.shipAddr2) ? `${this.shipAddr.shipAddr2}\n` : ''}${this.shipAddr.shipCity}, ${(this.shipAddr.shipState) ? `${this.shipAddr.shipState}\n` : ''}${this.shipAddr.shipCountry}\n${this.shipAddr.shipZip}`
  }

  /**
  * @name getformattedBillAddress
  * @description Provides formatted concatenated string of billing address (if billIsSame, calls formattedShipAddress)
  * @memberof CustomerModel.prototype
  * @method
  * @mobx computed
  */
  @computed get formattedBillAddress(){
    if (this.billIsSame == true){
      return this.formattedShipAddress
    }
    else{
      // Allow for missing addr2, state
      return `${this.billAddr.billAddr1}\n${(this.billAddr.billAddr2) ? `${this.billAddr.billAddr2}\n` : ''}${this.billAddr.billCity}, ${(this.billAddr.billState) ? `${this.billAddr.billState}\n` : ''}${this.billAddr.billCountry}\n${this.billAddr.billZip}`
    }
  }
}
