import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name Customer
 * @class Customer
 * @description Customer storage object
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
 * @property {Boolean} [billSame=false] Indicator that billing address is same as shipping address for Customer [observable]
 */
class Customer {
  constructor(id, companyName, shipAddr1, shipAddr2, shipCity, shipState, shipCountry, shipZip, email, phone, website, billIsSame, billAddr1, billAddr2, billCity, billState, billCountry, billZip) {
    let addtlProps = {}
    addtlProps.companyName = companyName
    addtlProps.billSame = billIsSame
    addtlProps.shipAddr = {
      shipAddr1: shipAddr1,
      shipCity: shipCity,
      shipState: shipState,
      shipCountry: shipCountry,
      shipZip: shipZip,
      //Optional
      shipAddr2: shipAddr2
    }
    // Optional
    addtlProps.email = email
    addtlProps.phone = phone
    addtlProps.website = website
    addtlProps.billAddr = {
      billAddr1: billAddr1,
      billCity: billCity,
      billState: billState,
      billCountry: billCountry,
      billZip: billZip,
      // Optional
      billAddr2: billAddr2,
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.id = id
  }

  /**
  * @name edit
  * @description Updates Customer object in database
  * @memberof Customer.prototype
  * @method
  * @mobx action
  */
  @action async edit(){
    // TODO: Description: updates Customer object in database
  }

  /**
  * @name getProjects
  * @description Fetches Projects from database that are associated with Customer ID
  * @memberof Customer.prototype
  * @method
  * @mobx action
  */
  @action async getProjects(){
    // TODO: Fetches Projects from database that are associated with Customer ID
  }

  /**
  * @name getformattedShipAddress
  * @description Provides formatted concatenated string of shipping address
  * @memberof Customer.prototype
  * @method
  * @mobx computed
  */
  @computed get formattedShipAddress(){
    return this.shipAddr1 + '\n' + this.shipAddr2 + '\n' + this.shipCity + ',' + this.shipState + '\n' + this.shipCountry + '\n' + this.shipZip
  }

  /**
  * @name getformattedBillAddress
  * @description Provides formatted concatenated string of billing address (if billIsSame, calls formattedShipAddress)
  * @memberof Customer.prototype
  * @method
  * @mobx computed
  */
  @computed get formattedBillAddress(){
    if (this.billSame == true){
      this.getformattedShipAddress
    }
    else{
      return this.billAddr1 + '\n' + this.billAddr2 + '\n' + this.billCity + ',' + this.billState + '\n' + this.billCountry + '\n' + this.billZip}
  }

}

const customer = new Customer()
export default customer
