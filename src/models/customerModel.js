import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
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
 * @property {Boolean} pastDue Indicator of overdue bills for Customer [observable]
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
  constructor(id, companyName, shipAddr1, shipAddr2, shipCity, shipState, shipCountry, shipZip, email, phone, website, pastDue, billIsSame, billAddr1, billAddr2, billCity, billState, billCountry, billZip) {
    let addtlProps = {
      companyName,
      billIsSame,
      pastDue,
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
    autoBind(this)
  }

  /**
   * @name setBillIsSame
   * @description Sets this.billIsSame to true
   * @method setBillIsSame
   * @memberof CustomerModel.prototype
   * @mobx action
   */
  @action setBillIsSame(){this.billIsSame = true}


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
  * @return {String}
  * @mobx computed
  */
  @computed get formattedShipAddress(){
    // Allow for missing addr2, state
    return `${this.shipAddr.shipAddr1}\n${(this.shipAddr.shipAddr2) ? `${this.shipAddr.shipAddr2}\n` : ''}${this.shipAddr.shipCity}, ${(this.shipAddr.shipState) ? `${this.shipAddr.shipState} ` : ''} ${this.shipAddr.shipZip}\n${this.shipAddr.shipCountry}`
  }

  /**
  * @name getformattedBillAddress
  * @description Provides formatted concatenated string of billing address (if billIsSame, calls formattedShipAddress)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get formattedBillAddress(){
    if (this.billIsSame == true){
      return this.formattedShipAddress
    }
    else{
      // Allow for missing addr2, state
      return `${this.billAddr.billAddr1}\n${(this.billAddr.billAddr2) ? `${this.billAddr.billAddr2}\n` : ''}${this.billAddr.billCity}, ${(this.billAddr.billState) ? `${this.billAddr.billState} ` : ''} ${this.billAddr.billZip}\n${this.billAddr.billCountry}`
    }
  }

  /**
  * @name getBillAddressLine1
  * @description Provides string of billing address line 1 (if billIsSame, uses ship address instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressLine1(){
    if (this.billIsSame == true){
      return `${this.shipAddr.shipAddr1}`
    }
    else{
      return `${this.billAddr.billAddr1}`
    }
  }

  /**
  * @name getBillAddressLine2
  * @description Provides string of billing address line 2 (if billIsSame, uses ship address instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressLine2(){
    if (this.shipAddr.shipAddr2 != null || this.billAddr.billAddr2 != null){
      if (this.billIsSame == true){
        return `${this.shipAddr.shipAddr2}`
      }
      else{
        return `${this.billAddr.billAddr2}`
      }
    }
    return null
  }

  /**
  * @name getBillAddressCity
  * @description Provides string of billing city (if billIsSame, uses ship city instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressCity(){
    if (this.billIsSame == true){
      return `${this.shipAddr.shipCity}`
    }
    else{
      return `${this.billAddr.billCity}`
    }
  }

  /**
  * @name getBillAddressState
  * @description Provides string of billing state (if billIsSame, uses ship state instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressState(){
    if (this.billIsSame == true){
      return `${this.shipAddr.shipState}`
    }
    else{
      return `${this.billAddr.billState}`
    }
  }

  /**
  * @name getBillAddressZip
  * @description Provides string of billing zip (if billIsSame, uses ship zip instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressZip(){
    if (this.billIsSame == true){
      return `${this.shipAddr.shipZip}`
    }
    else{
      return `${this.billAddr.billZip}`
    }
  }

  /**
  * @name getBillAddressCountry
  * @description Provides string of billing country (if billIsSame, uses ship country instead)
  * @memberof CustomerModel.prototype
  * @method
  * @return {String}
  * @mobx computed
  */
  @computed get billAddressCountry(){
    if (this.billIsSame == true){
      return `${this.shipAddr.shipCountry}`
    }
    else{
      return `${this.billAddr.billCountry}`
    }
  }
}
