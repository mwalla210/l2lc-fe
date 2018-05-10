const colorsLight = [
  'rgb(96,146,204,0.4)',
  'rgb(150,182,68,0.4)',
  'rgb(139,103,209,0.4)',
  'rgb(210,155,61,0.4)',
  'rgb(86,118,209,0.4)',
  'rgb(205,88,57,0.4)',
  'rgb(72,183,188,0.4)',
  'rgb(210,66,115,0.4)',
  'rgb(86,174,111,0.4)',
  'rgb(200,89,183,0.4)',
  'rgb(130,136,68,0.4)',
  'rgb(204,158,223,0.4)',
  'rgb(189,124,88,0.4)',
  'rgb(149,95,149,0.4)',
  'rgb(210,118,140,0.4)',
]
const colorsMedium = [
  'rgb(96,146,204,0.6)',
  'rgb(150,182,68,0.6)',
  'rgb(139,103,209,0.6)',
  'rgb(210,155,61,0.6)',
  'rgb(86,118,209,0.6)',
  'rgb(205,88,57,0.6)',
  'rgb(72,183,188,0.6)',
  'rgb(210,66,115,0.6)',
  'rgb(86,174,111,0.6)',
  'rgb(200,89,183,0.6)',
  'rgb(130,136,68,0.6)',
  'rgb(204,158,223,0.6)',
  'rgb(189,124,88,0.6)',
  'rgb(149,95,149,0.6)',
  'rgb(210,118,140,0.6)',
]
const colorsDark = [
  'rgb(96,146,204,1)',
  'rgb(150,182,68,1)',
  'rgb(139,103,209,1)',
  'rgb(210,155,61,1)',
  'rgb(86,118,209,1)',
  'rgb(205,88,57,1)',
  'rgb(72,183,188,1)',
  'rgb(210,66,115,1)',
  'rgb(86,174,111,1)',
  'rgb(200,89,183,1)',
  'rgb(130,136,68,1)',
  'rgb(204,158,223,1)',
  'rgb(189,124,88,1)',
  'rgb(149,95,149,1)',
  'rgb(210,118,140,1)',
]

/**
 * @namespace Consts
 * @classdesc Contains application consts
 */
class Consts {
  /**
   * @name customerFields
   * @description List of customer form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get customerFields(){ return [
    {
      type: 'textfield',
      label: 'Company Name',
      id: 'companyName',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The company name must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Email Address',
      id: 'email',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (value.length > 0 && reg.test(value) == false)
          return 'Please enter a valid email address.'
        else if (value.length > 30)
          return 'The email address must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Phone Number',
      id: 'phone',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a phone number.'
        else if (value.length < 10) //could of put a regex here but international numbers have different formats
          return 'The phone number is too short.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Website',
      id: 'website',
      required: false,
      disabled: false,
      validation: (value, required) => {
        let reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 0 && reg.test(value) == false)
          return 'Please enter a valid website address.'
        else if (value.length > 50)
          return 'The website address must be less than 50 characters.'
        return null
      }
    },
    {
      type: 'select',
      label: 'Country',
      id: 'shipCountry',
      options: this.countrySelect,
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select a country.'
        return null
      },
      onUpdate: (value) => {
        if (value == 'United States of America'){
          return [
            {
              id: 'shipState',
              options: this.stateSelect,
              required: true,
              disabled: false
            },
            {
              id: 'shipZip',
              required: true,
              disabled: false
            }
          ]
        }
        return [
          {
            id: 'shipState',
            options: [{title: 'Not Applicable'}],
            required: false,
            disabled: true
          },
          {
            id: 'shipZip',
            required: false,
            disabled: false
          }
        ]
      }
    },
    {
      type: 'textfield',
      label: 'Address Line 1',
      id: 'shipAddr1',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The address must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Address Line 2',
      id: 'shipAddr2',
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The address must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'City',
      id: 'shipCity',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The city name must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'select',
      label: 'State',
      id: 'shipState',
      options: this.stateSelect,
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select the state.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Zip Code',
      id: 'shipZip',
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 10)
          return 'The zip code must be less than 10 characters.'
        return null
      }
    },
    {
      type: 'checkbox',
      label: 'Billing address same as shipping',
      id: 'billIsSame',
      required: false,
      validation: null,
      onUpdate: (value, fields) => {
        if (value){
          return [
            {
              id: 'billCountry',
              disabled: true,
              required: false
            },
            {
              id: 'billAddr1',
              disabled: true,
              required: false
            },
            {
              id: 'billAddr2',
              disabled: true,
              required: false
            },
            {
              id: 'billCity',
              disabled: true,
              required: false
            },
            {
              id: 'billState',
              disabled: true,
              required: false
            },
            {
              id: 'billZip',
              disabled: true,
              required: false
            },
          ]
        }
        let stateShow = false
        let zipRequired = false
        if (fields.find(obj => obj.id == 'billCountry').value == 'United States of America'){
          stateShow = true
          zipRequired = true
        }
        return [
          {
            id: 'billCountry',
            disabled: false,
            required: true
          },
          {
            id: 'billAddr1',
            disabled: false,
            required: true
          },
          {
            id: 'billAddr2',
            disabled: false,
            required: false
          },
          {
            id: 'billCity',
            disabled: false,
            required: true
          },
          {
            id: 'billState',
            disabled: !stateShow,
            required: stateShow
          },
          {
            id: 'billZip',
            disabled: false,
            required: zipRequired
          },
        ]
      }
    },
    {
      type: 'select',
      label: 'Country',
      id: 'billCountry',
      options: this.countrySelect,
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select a country.'
        return null
      },
      onUpdate: (value) => {
        if (value == 'United States of America'){
          return [
            {
              id: 'billAddr1',
              required: true,
              disabled: false
            },
            {
              id: 'billAddr2',
              required: false,
              disabled: false
            },
            {
              id: 'billCity',
              required: true,
              diabled: false
            },
            {
              id: 'billState',
              options: this.stateSelect,
              required: true,
              disabled: false
            },
            {
              id: 'billZip',
              required: true,
              disabled: false
            }
          ]
        }
        return [
          {
            id: 'billAddr1',
            required: true,
            disabled: false
          },
          {
            id: 'billAddr2',
            required: false,
            disabled: false
          },
          {
            id: 'billCity',
            required: true,
            diabled: false
          },
          {
            id: 'billState',
            options: [{title: 'Not Applicable'}],
            required: false,
            disabled: true
          },
          {
            id: 'billZip',
            required: false,
            disabled: false
          }
        ]
      }
    },
    {
      type: 'textfield',
      label: 'Address Line 1',
      id: 'billAddr1',
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The address must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Address Line 2',
      id: 'billAddr2',
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The address must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'City',
      id: 'billCity',
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The city name must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'select',
      label: 'State',
      id: 'billState',
      options: this.stateSelect,
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select the state.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Zip Code',
      id: 'billZip',
      required: false,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 10)
          return 'The zip code must be less than 10 characters.'
        return null
      }
    }
  ]}
  /**
   * @name projectFields
   * @description List of project form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get projectFields(){ return [
    {
      type: 'select',
      label: 'Cost Center',
      id: 'costCenterTitle',
      options: this.costCenterSelect,
      required: true,
      disabled: false,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select a cost center.'
        return null
      },
      onUpdate: (value) => {
        if (value == 'APC'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.apcProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: true,
              disabled: false
            },
            {
              id: 'title',
              required: false,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Decorative'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.decorativeProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: true,
              disabled: false
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Maintenance'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.maintenanceProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: true
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Administration'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.adminProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: true
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Research and Development'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.rdProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: true
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Military'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.militaryProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: false
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Production'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.productionProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: true
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        else if (value == 'Other'){
          return [
            {
              id: 'jobTypeTitle',
              options: this.otherProjectSelect,
              required: true,
              disabled: false
            },
            {
              id: 'partCount',
              required: false,
              disabled: true
            },
            {
              id: 'title',
              required: true,
              disabled: false
            },
            {
              id: 'priority',
              required: true,
              disabled: false
            },
            {
              id: 'descr',
              required: false,
              disabled: false
            },
            {
              id: 'refNum',
              required: false,
              disabled: false
            }
          ]
        }
        return [
          {
            id: 'jobTypeTitle',
            options: [],
            required: true,
            disabled: true
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'title',
            required: true,
            disabled: true
          },
          {
            id: 'priority',
            required: true,
            disabled: true
          },
          {
            id: 'descr',
            required: false,
            disabled: true
          },
          {
            id: 'refNum',
            required: false,
            disabled: true
          }
        ]
      }
    },
    {
      type: 'select',
      label: 'Project Type',
      id: 'jobTypeTitle',
      options: [],
      required: true,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select a project type.'
        return null
      },
      onUpdate: (value) => {
        if (value == 'Piston' || value == 'Turbo' || value == 'Rotor' || value == 'Pump'){
          return [
            {
              id: 'title',
              required: false,
              disabled: false
            }
          ]
        }
        return [
          {
            id: 'title',
            required: true,
            disabled: false
          }
        ]
      }
    },
    {
      type: 'textfield',
      label: 'Part Count',
      id: 'partCount',
      required: false,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        let reg = /^\d+$/
        if (value.length > 0 && reg.test(value.trim()) == false)
          return 'Please enter a valid number.'
        else if (value.length > 4)
          return 'The part count number must be less than 4 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Project Title',
      id: 'title',
      required: false,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The project title name must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'select',
      label: 'Priority',
      id: 'priority',
      options: [{title: 'Select...'}, {title: '1-2 Days'}, {title: '3 Days'}, {title: '4-5 Days'}, {title: '10 Days'}],
      required: true,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please select a priority.'
        return null
      }
    },
    {
      type: 'textarea',
      label: 'Description',
      id: 'descr',
      required: false,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 100)
          return 'The description must be less than 100 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Job/Work Order Number',
      id: 'refNum',
      required: false,
      disabled: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The order number must be less than 30 characters.'
        return null
      }
    },
  ]}
  /**
   * @name employeeFields
   * @description List of employee form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get employeeFields(){ return [
    {
      type: 'textfield',
      label: 'First Name',
      id: 'firstName',
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The first name must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Last Name',
      id: 'lastName',
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The last name must be less than 30 characters.'
        return null
      }
    },
  ]}
  /**
   * @name accountFields
   * @description List of account form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get accountFields(){ return [
    {
      type: 'textfield',
      label: 'Username',
      id: 'username',
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The username must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'textfield',
      label: 'Password',
      id: 'password',
      password: true,
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 30)
          return 'The password must be less than 30 characters.'
        return null
      }
    },
    {
      type: 'checkbox',
      label: 'Admin User',
      id: 'admin',
      required: true,
      validation: null,
    }
  ]}
  /**
   * @name timeEntryFields
   * @description List of time entry form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get timeEntryFields(){ return [
    {
      type: 'textfield',
      label: 'Project ID',
      id: 'projectID',
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 15)
          return 'The project ID must be less than 15 characters.'
        if (!value.startsWith('P'))
          return 'Project IDs must begin with the letter "P".'
        if (value.length < 2)
          return 'Project IDs must contain at least one number.'
        return null
      },
    },
    {
      type: 'textfield',
      label: 'Employee ID',
      id: 'employeeID',
      required: true,
      validation: (value, required) => {
        if (required && value == '')
          return 'Please enter a value.'
        else if (value.length > 15)
          return 'The employee ID must be less than 15 characters.'
        if (!value.startsWith('E'))
          return 'Employee IDs must begin with the letter "E".'
        if (value.length < 2)
          return 'Employee IDs must contain at least one number.'
        return null
      }
    }
  ]}
  /**
   * @name countrySelect
   * @description List of countries for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get countrySelect() {return [
    {title: 'Select...'}, {title: 'United States of America'}, {title: 'Canada'}, {title: '--------------', disabled: true}, {title: 'Afghanistan'}, {title: 'Aland Islands'}, {title: 'Albania'}, {title: 'Algeria'}, {title: 'American Samoa'}, {title: 'Andorra'}, {title: 'Angola'}, {title: 'Anguilla'}, {title: 'Antarctica'}, {title: 'Antigua and Barbuda'}, {title: 'Argentina'}, {title: 'Armenia'}, {title: 'Aruba'}, {title: 'Australia'}, {title: 'Austria'}, {title: 'Azerbaijan'}, {title: 'Bahamas'}, {title: 'Bahrain'}, {title: 'Bangladesh'}, {title: 'Barbados'}, {title: 'Belarus'}, {title: 'Belgium'}, {title: 'Belize'}, {title: 'Benin'}, {title: 'Bermuda'}, {title: 'Bhutan'}, {title: 'Bolivia'}, {title: 'Bonaire, Sint Eustatius and Saba'}, {title: 'Bosnia and Herzegovina'}, {title: 'Botswana'}, {title: 'Bouvet Island'}, {title: 'Brazil'}, {title: 'British Indian Ocean Territory'}, {title: 'United States Minor Outlying Islands'}, {title: 'Virgin Islands (British)'}, {title: 'Virgin Islands (U.S.)'},{title: 'Brunei Darussalam'}, {title: 'Bulgaria'}, {title: 'Burkina Faso'}, {title: 'Burundi'}, {title: 'Cambodia'}, {title: 'Cameroon'}, {title: 'Cabo Verde'}, {title: 'Cayman Islands'}, {title: 'Central African Republic'}, {title: 'Chad'}, {title: 'Chile'}, {title: 'China'}, {title: 'Christmas Island'}, {title: 'Cocos (Keeling) Islands'}, {title: 'Colombia'}, {title: 'Comoros'}, {title: 'Congo'}, {title: 'Cook Islands'}, {title: 'Costa Rica'}, {title: 'Croatia'}, {title: 'Cuba'}, {title: 'Curaçao'}, {title: 'Cyprus'}, {title: 'Czech Republic'}, {title: 'Denmark'}, {title: 'Djibouti'}, {title: 'Dominica'}, {title: 'Dominican Republic'}, {title: 'Ecuador'}, {title: 'Egypt'}, {title: 'El Salvador'}, {title: 'Equatorial Guinea'}, {title: 'Eritrea'}, {title: 'Estonia'}, {title: 'Ethiopia'}, {title: 'Falkland Islands (Malvinas)'}, {title: 'Faroe Islands'}, {title: 'Fiji'}, {title: 'Finland'}, {title: 'France'}, {title: 'French Guiana'}, {title: 'French Polynesia'}, {title: 'French Southern Territories'}, {title: 'Gabon'}, {title: 'Gambia'}, {title: 'Georgia'}, {title: 'Germany'}, {title: 'Ghana'}, {title: 'Gibraltar'}, {title: 'Greece'}, {title: 'Greenland'}, {title: 'Grenada'}, {title: 'Guadeloupe'}, {title: 'Guam'}, {title: 'Guatemala'}, {title: 'Guernsey'}, {title: 'Guinea'}, {title: 'Guinea-Bissau'}, {title: 'Guyana'}, {title: 'Haiti'}, {title: 'Heard Island and McDonald Islands'}, {title: 'Holy See'}, {title: 'Honduras'}, {title: 'Hong Kong'}, {title: 'Hungary'}, {title: 'Iceland'}, {title: 'India'}, {title: 'Indonesia'}, {title: 'Cote dIvoire'}, {title: 'Iran (Islamic Republic of)'}, {title: 'Iraq'}, {title: 'Ireland'}, {title: 'Isle of Man'}, {title: 'Israel'}, {title: 'Italy'}, {title: 'Jamaica'}, {title: 'Japan'}, {title: 'Jersey'}, {title: 'Jordan'}, {title: 'Kazakhstan'}, {title: 'Kenya'}, {title: 'Kiribati'}, {title: 'Kuwait'}, {title: 'Kyrgyzstan'}, {title: 'Lao Peoples Democratic Republic'}, {title: 'Latvia'}, {title: 'Lebanon'}, {title: 'Lesotho'}, {title: 'Liberia'}, {title: 'Libya'}, {title: 'Liechtenstein'}, {title: 'Lithuania'}, {title: 'Luxembourg'}, {title: 'Macao'}, {title: 'Macedonia'}, {title: 'Madagascar'}, {title: 'Malawi'}, {title: 'Malaysia'},{title: 'Maldives'}, {title: 'Mali'}, {title: 'Malta'}, {title: 'Marshall Islands'}, {title: 'Martinique'}, {title: 'Mauritania'}, {title: 'Mauritius'}, {title: 'Mayotte'}, {title: 'Mexico'}, {title: 'Micronesia'}, {title: 'Moldova'}, {title: 'Monaco'}, {title: 'Mongolia'}, {title: 'Montenegro'}, {title: 'Montserrat'}, {title: 'Morocco'}, {title: 'Mozambique'}, {title: 'Myanmar'}, {title: 'Namibia'}, {title: 'Nauru'}, {title: 'Nepal'}, {title: 'Netherlands'}, {title: 'New Caledonia'}, {title: 'New Zealand'}, {title: 'Nicaragua'}, {title: 'Niger'}, {title: 'Nigeria'}, {title: 'Niue'}, {title: 'Norfolk Island'}, {title: 'Korea (Democratic Peoples Republic of)'}, {title: 'Northern Mariana Islands'}, {title: 'Norway'}, {title: 'Oman'}, {title: 'Pakistan'}, {title: 'Palau'}, {title: 'Palestine, State of'}, {title: 'Panama'}, {title: 'Papua New Guinea'}, {title: 'Paraguay'}, {title: 'Peru'}, {title: 'Philippines'}, {title: 'Pitcairn'}, {title: 'Poland'}, {title: 'Portugal'}, {title: 'Puerto Rico'}, {title: 'Qatar'}, {title: 'Republic of Kosovo'}, {title: 'Réunion'}, {title: 'Romania'}, {title: 'Russian Federation'}, {title: 'Rwanda'}, {title: 'Saint Barthelemy'}, {title: 'Saint Helena, Ascension, and Tristan da Cunha'}, {title: 'Saint Kitts and Nevis'}, {title: 'Saint Lucia'}, {title: 'Saint Martin'}, {title: 'Saint Pierre and Miquelon'}, {title: 'Saint Vincent and the Grenadines'}, {title: 'Samoa'}, {title: 'San Marino'}, {title: 'Sao Tome and Principe'}, {title: 'Saudi Arabia'}, {title: 'Senegal'}, {title: 'Serbia'}, {title: 'Seychelles'}, {title: 'Sierra Leone'}, {title: 'Singapore'}, {title: 'Sint Maarten'}, {title: 'Slovakia'}, {title: 'Slovenia'}, {title: 'Solomon Islands'}, {title: 'Somalia'}, {title: 'South Africa'}, {title: 'South Georgia and the South Sandwich Islands'}, {title: 'Korea'}, {title: 'South Sudan'}, {title: 'Spain'}, {title: 'Sri Lanka'}, {title: 'Sudan'}, {title: 'Suriname'}, {title: 'Svalbard and Jan Mayen'}, {title: 'Swaziland'}, {title: 'Sweden'}, {title: 'Switzerland'}, {title: 'Syrian Arab Republic'}, {title: 'Taiwan'}, {title: 'Tajikistan'}, {title: 'Tanzania, United Republic of'}, {title: 'Thailand'}, {title: 'Timor-Leste'}, {title: 'Togo'}, {title: 'Tokelau'}, {title: 'Tonga'}, {title: 'Trinidad and Tobago'}, {title: 'Tunisia'}, {title: 'Turkey'}, {title: 'Turkmenistan'}, {title: 'Turks and Caicos Islands'}, {title: 'Tuvalu'}, {title: 'Uganda'}, {title: 'Ukraine'}, {title: 'United Arab Emirates'}, {title: 'United Kingdom of Great Britain'}, {title: 'Northern Ireland'}, {title: 'Uruguay'}, {title: 'Uzbekistan'}, {title: 'Vanuatu'}, {title: 'Venezuela'}, {title: 'Vietnam'}, {title: 'Wallis'}, {title: 'Futuna'}, {title: 'Western Sahara'}, {title: 'Yemen'}, {title: 'Zambia'}, {title: 'Zimbabwe'}
  ]}
  /**
   * @name stateSelect
   * @description List of states for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get stateSelect() {return [
    {title: 'Select...'}, {title: 'Alabama'}, {title: 'Alaska'}, {title: 'Arizona'}, {title: 'Arkansas'}, {title: 'California'}, {title: 'Colorado'}, {title: 'Connecticut'}, {title: 'Delaware'}, {title: 'Florida'}, {title: 'Georgia'}, {title: 'Hawaii'}, {title: 'Idaho'}, {title: 'Illinois'}, {title: 'Indiana'}, {title: 'Iowa'}, {title: 'Kansas'}, {title: 'Kentucky'}, {title: 'Louisiana'}, {title: 'Maine'}, {title: 'Maryland'}, {title: 'Massachusetts'}, {title: 'Michigan'}, {title: 'Minnesota'}, {title: 'Mississippi'}, {title: 'Missouri'}, {title: 'Montana'}, {title: 'Nebraska'}, {title: 'Nevada'}, {title: 'New Hampshire'}, {title: 'New Jersey'}, {title: 'New Mexico'}, {title: 'New York'}, {title: 'North Carolina'}, {title: 'North Dakota'}, {title: 'Ohio'}, {title: 'Oklahoma'}, {title: 'Oregon'}, {title: 'Pennsylvania'}, {title: 'Rhode Island'}, {title: 'South Carolina'}, {title: 'South Dakota'}, {title: 'Tennessee'}, {title: 'Texas'}, {title: 'Utah'}, {title: 'Vermont'}, {title: 'Virginia'}, {title: 'Washington'}, {title: 'West Virginia'}, {title: 'Wisconsin'}, {title: 'Wyoming'}
  ]}
  /**
   * @name costCenterSelect
   * @description List of cost centers for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get costCenterSelect() {return [
    {title: 'Select...'}, {title: 'APC'}, {title: 'Decorative'}, {title: 'Maintenance'}, {title: 'Administration'}, {title: 'Production'}, {title: 'Military'}, {title: 'Research and Development'}, {title: 'Other'}
  ]}
  /**
   * @name apcProjectSelect
   * @description List of APC project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get apcProjectSelect() {return [
    {title: 'Select...'}, {title: 'Piston'}, {title: 'Turbo'}, {title: 'Rotor'}, {title: 'Pump'}, {title: 'Avaslick'}, {title: 'Specialty'}
  ]}
  /**
   * @name decorativeProjectSelect
   * @description List of Decorative project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get decorativeProjectSelect() {return [{title: 'Select...'}, {title: 'Decorative'}]}
  /**
   * @name maintenanceProjectSelect
   * @description List of Maintenance project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get maintenanceProjectSelect() {return [{title: 'Select...'}, {title: 'Maintenance'}]}
  /**
   * @name adminProjectSelect
   * @description List of Administration project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get adminProjectSelect() {return [{title: 'Select...'}, {title: 'ISO'}, {title: 'Other'}]}
  /**
   * @name rdProjectSelect
   * @description List of R&D project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get rdProjectSelect() {return [{title: 'Select...'}, {title: 'Research and Development'}]}
  /**
   * @name militaryProjectSelect
   * @description List of Military project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get militaryProjectSelect() {return [{title: 'Select...'}, {title: 'Military'}]}
  /**
   * @name productionProjectSelect
   * @description List of Production project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get productionProjectSelect() {return [{title: 'Select...'}, {title: 'Production'}]}
  /**
   * @name otherProjectSelect
   * @description List of Other project types for selecting
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get otherProjectSelect() {return [{title: 'Select...'}, {title: 'Other'}]}
  /**
   * @name doneColor
   * @description Color to label finished projects
   * @memberof Consts.prototype
   * @type {String}
   * @readonly
   */
  static get doneColor() {return '#49a4ff'}
  /**
   * @name helpColor
   * @description Color to label projects that need assistance
   * @memberof Consts.prototype
   * @type {String}
   * @readonly
   */
  static get helpColor() {return '#ffbf00'}
  /**
   * @name openColor
   * @description Color to label open projects
   * @memberof Consts.prototype
   * @type {String}
   * @readonly
   */
  static get openColor() {return '#57d500'}
  /**
   * @name pieColors
   * @description Colors for pie charts
   * @memberof Consts.prototype
   * @readonly
   * @type {String[]}
   */
  static get pieColors() {return colorsDark}
  /**
   * @name barBGColorByIndex
   * @description Colors for bar charts
   * @memberof Consts.prototype
   * @param  {Number}      index Index of color
   * @type {String}
   */
  static barBGColorByIndex(index) {return colorsMedium[index]}
  /**
   * @name barBorColorByIndex
   * @description Colors for bar charts
   * @memberof Consts.prototype
   * @param  {Number}      index Index of color
   * @type {String}
   */
  static barBorColorByIndex(index) {return colorsDark[index]}
  /**
   * @name barHovColorByIndex
   * @description Colors for bar charts
   * @memberof Consts.prototype
   * @param  {Number}      index Index of color
   * @type {String}
   */
  static barHovColorByIndex(index) {return colorsLight[index]}
  /**
   * @name summaryProps
   * @description Summary page box properties for style and visuals
   * @memberof Consts.prototype
   * @type {String}
   * @readonly
   */
  static get summaryProps(){
    return {
      style: {
        border: '1px solid #b4b4b4',
        borderRadius: '8px',
        paddingTop: '1rem',
        margin: '2px'
      },
      className: 'col-3'
    }
  }
  /**
   * @name customerFields
   * @description List of customer form fields
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get taskFields(){
    return [
      {
        type: 'textfield',
        label: 'Task Name',
        id: 'taskName',
        required: true,
        disabled: false,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          else if (value.length > 30)
            return 'The task name must be less than 30 characters.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Process Area',
        id: 'processArea',
        options: this.stationSelect,
        required: false,
        disabled: false,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please select a station.'
          return null
        }
      }
    ]
  }
  /**
   * @name stationSelect
   * @description List of stations for selecting
   * @memberof Consts.prototype
   * @type {String[]}
   * @readonly
   */
  static get stationSelect(){
    return [{title: 'Select...'}, {title: 'Receiving'},{title: 'Ticketing'},{title: 'Preparation'},{title: 'Coating and Curing'},{title: 'Quality Control and Packaging'}]
  }
  /**
   * @name pistonTasks
   * @description List of piston default tasks
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get pistonTasks(){
    return [
      {
        title: 'Degrease',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Engrave',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Blast',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Wash',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Measure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Probe Zero',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Coat',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Cure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'QC Check',
        required: true,
        station: 'Quality Control and Packaging'
      },
    ]
  }
  /**
   * @name turboTasks
   * @description List of piston default tasks
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get turboTasks(){
    return [
      {
        title: 'Degrease',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Engrave',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Blast',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Wash',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Measure',
        required: false,
        station: 'Coating and Curing'
      },
      {
        title: 'Probe Zero',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Coat',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Cure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'QC Check',
        required: false,
        station: 'Quality Control and Packaging'
      },
    ]
  }
  /**
   * @name pumpTasks
   * @description List of piston default tasks
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get pumpTasks(){
    return [
      {
        title: 'Degrease',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Engrave',
        required: false,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Blast',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Wash',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Measure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Probe Zero',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Coat',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Cure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'QC Check',
        required: false,
        station: 'Quality Control and Packaging'
      },
    ]
  }
  /**
   * @name rotorTasks
   * @description List of piston default tasks
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get rotorTasks(){
    return [
      {
        title: 'Degrease',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Engrave',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Blast',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Wash',
        required: true,
        station: 'Preparation'
      },
      {
        title: 'Mask',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Measure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Probe Zero',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Coat',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'Cure',
        required: true,
        station: 'Coating and Curing'
      },
      {
        title: 'QC Check',
        required: false,
        station: 'Quality Control and Packaging'
      },
    ]
  }
  /**
   * @name avaslickTasks
   * @description List of piston default tasks
   * @memberof Consts.prototype
   * @type {Object[]}
   * @readonly
   */
  static get avaslickTasks(){
    return this.pistonTasks
  }
  /**
   * @name calculateTime
   * @description Calculates time difference total for a list of time entry pairs
   * @memberof Consts.prototype
   * @param  {Date[]}      timeEntries List of time entry pairs
   * @return {Object}
   */
  static calculateTime(timeEntries){
    let hour = 0
    let min = 0
    for (let i = 0; i < timeEntries.length-1; i+=2){
      let diff = Math.abs(new Date(timeEntries[i+1].created)-new Date(timeEntries[i].created))
      let diffHrs = Math.floor((diff % 86400000) / 3600000) // hour
      let diffMins = Math.round(((diff % 86400000) % 3600000) / 60000) // min
      hour += diffHrs
      if (min + diffMins > 60){
        hour += 1
        min += diffMins - 60
      }
      else {
        min += diffMins
      }
    }
    return {hour, min}
  }
}

module.exports = Consts
