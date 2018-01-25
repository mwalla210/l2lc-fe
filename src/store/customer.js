import { observable, action, computed, useStrict } from 'mobx'

useStrict(true)

/**
 * @name Customer
 * @class Customer
 * @description Customer storage object
 * @property {Number}  [id=null]  ID of Customer
 * @property {String} [companyName=''] name of Customer
 * @property {String} [email=''] email of Customer
 * @property {String} [website=''] website of Customer
 * @property {String} [phone=''] phone of Customer
 * @property {Boolean} [pastDue = false] indicator of overdue bills for Customer
 * @property {String} [shipAddr1='' ] line one of shipping address for Customer
 * @property {String} [shipAddr2=''] line two of shipping address for Customer
 * @property {String} [shipCity=''] city of shipping address of Customer
 * @property {String} [shipState=''] state of shipping address of Customer
 * @property {String} [shipCountry=''] country of shipping address of Customer
 * @property {Number} [shipZip=null] zipcode of shipping address of Customer
 * @property {String} [billAddr1=''] line one of billing address for Customer
 * @property {String} [billAddr2=''] line two of billing address for Customer
 * @property {String} [billCity=''] city of billing address of Customer
 * @property {String} [billState=''] state of billing address of Customer
 * @property {String} [billCountry=''] country of billing address of Customer
 * @property {Number} [billZip=null] zipcode of billing address of Customer
 * @property {Boolean} [billSame=false] indicator that billing address is same as shipping address for Customer
 */


class Customer {
  constructor(id, companyName, shipAddr1, shipCity, shipState, shipCountry, shipZip, email, phone, website, billIsSame, billAddr1, billCity, billState, billCountry, billZip}) {

    this.companyName = companyName
    this.shipAddr1 = shipAddr1
    this.shipAddr2 = shipAddr2
    this.shipCity = shipCity
    this.shipState = shipState
    this.shipCountry = shipCountry
    this.shipZip = shipZip

    //Optional
    this.email = email
    this.phone = phone
    this.website = website
    this.billSame = billIsSame
    this.billAddr1 = billAddr1
    this.billAddr2 = billAddr2
    this.billCity = billCity
    this.billState = billState
    this.billCountry = billCountry
    this.billZip = billZip
    extendObservable(this)
    this.id = id
  }

  // Observable values can be watched by Observers
  @observable id = null
  @observable companyName = ''
  @observable email = ''
  @observable website = ''
  @observable phone = ''
  @observable pastDue = false
  @observable shipAddr1 = ''
  @observable shipAddr2 = ''
  @observable shipCity = ''
  @observable shipState = ''
  @observable shipCountry = ''
  @observable shipZip = null
  @observable billAddr1 = ''
  @observable billAddr2 = ''
  @observable billCity = ''
  @observable billState = ''
  @observable billCountry = ''
  @observable billZip = null
  @observable billSame = false

  /**
  * @name edit
  * @description updates Customer object in database
  * @memberof Customer
  * @method
  * @mobx action
  */
  @action async edit(){
    // TODO: Description: updates Customer object in database
  }

  /**
  * @name getProjects
  * @description fetches Projects from database that are associated with Customer ID
  * @memberof Customer
  * @method
  * @mobx action
  */
  @action async getProjects(){
    // TODO: Fetches Projects from database that are associated with Customer ID
  }

  /**
  * @name getformattedShipAddress
  * @description provides formatted concatenated string of shipping address
  * @memberof Customer
  * @method
  * @mobx action
  */
  @computed get formattedShipAddress(){
    return this.shipAddr1 + '\n' + this.shipAddr2 + '\n' + this.shipCity + ',' + this.shipState + '\n' + this.shipCountry + '\n' + this.shipZip
  }

  /**
  * @name getformattedBillAddress
  * @description provides formatted concatenated string of billing address (if billIsSame, calls formattedShipAddress)
  * @memberof Customer
  * @method
  * @mobx action
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
export { Customer }
