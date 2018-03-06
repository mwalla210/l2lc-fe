import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
useStrict(true)

const fields = [
  {
    type: 'textfield',
    label: 'Company Name',
    id: 'companyName',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The company name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Email Address',
    id: 'emailAddress',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (value.length > 0 && reg.test(value) == false)
        return 'Please enter a valid email address.'
      if (value.length > 30)
        return 'The email address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Phone Number',
    id: 'phoneNumber',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a phone number.'
      if (value.length < 10) //could of put a regex here but international numbers have different formats
        return 'The phone number is too short.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Website',
    id: 'websiteLink',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      let reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      if (value.length > 0 && reg.test(value) == false)
        return 'Please enter a valid website address.'
      if (value.length > 50)
        return 'The website address must be less than 50 characters.'
      return null
    }
  },
  {
    type: 'select',
    label: 'Country',
    id: 'country',
    options: [{title: 'Select...'}, {title: 'United States of America'}, {title: 'Canada'}, {title: '--------------', disabled: true}, {title: 'Afghanistan'}, {title: 'Aland Islands'}, {title: 'Albania'}, {title: 'Algeria'}, {title: 'American Samoa'}, {title: 'Andorra'}, {title: 'Angola'},
    {title: 'Anguilla'}, {title: 'Antarctica'}, {title: 'Antigua and Barbuda'}, {title: 'Argentina'}, {title: 'Armenia'}, {title: 'Aruba'}, {title: 'Australia'}, {title: 'Austria'}, {title: 'Azerbaijan'}, {title: 'Bahamas'}, {title: 'Bahrain'}, {title: 'Bangladesh'}, {title: 'Barbados'},
    {title: 'Belarus'}, {title: 'Belgium'}, {title: 'Belize'}, {title: 'Benin'}, {title: 'Bermuda'}, {title: 'Bhutan'}, {title: 'Bolivia'}, {title: 'Bonaire, Sint Eustatius and Saba'}, {title: 'Bosnia and Herzegovina'}, {title: 'Botswana'}, {title: 'Bouvet Island'},
    {title: 'Brazil'}, {title: 'British Indian Ocean Territory'}, {title: 'United States Minor Outlying Islands'}, {title: 'Virgin Islands (British)'}, {title: 'Virgin Islands (U.S.)'},{title: 'Brunei Darussalam'}, {title: 'Bulgaria'}, {title: 'Burkina Faso'}, {title: 'Burundi'},
    {title: 'Cambodia'}, {title: 'Cameroon'}, {title: 'Cabo Verde'}, {title: 'Cayman Islands'}, {title: 'Central African Republic'}, {title: 'Chad'}, {title: 'Chile'}, {title: 'China'}, {title: 'Christmas Island'}, {title: 'Cocos (Keeling) Islands'}, {title: 'Colombia'}, {title: 'Comoros'},
    {title: 'Congo'}, {title: 'Cook Islands'}, {title: 'Costa Rica'}, {title: 'Croatia'}, {title: 'Cuba'}, {title: 'Curaçao'}, {title: 'Cyprus'}, {title: 'Czech Republic'}, {title: 'Denmark'}, {title: 'Djibouti'}, {title: 'Dominica'}, {title: 'Dominican Republic'}, {title: 'Ecuador'},
    {title: 'Egypt'}, {title: 'El Salvador'}, {title: 'Equatorial Guinea'}, {title: 'Eritrea'}, {title: 'Estonia'}, {title: 'Ethiopia'}, {title: 'Falkland Islands (Malvinas)'}, {title: 'Faroe Islands'}, {title: 'Fiji'}, {title: 'Finland'}, {title: 'France'}, {title: 'French Guiana'},
    {title: 'French Polynesia'}, {title: 'French Southern Territories'}, {title: 'Gabon'}, {title: 'Gambia'}, {title: 'Georgia'}, {title: 'Germany'}, {title: 'Ghana'}, {title: 'Gibraltar'}, {title: 'Greece'}, {title: 'Greenland'}, {title: 'Grenada'}, {title: 'Guadeloupe'}, {title: 'Guam'},
    {title: 'Guatemala'}, {title: 'Guernsey'}, {title: 'Guinea'}, {title: 'Guinea-Bissau'}, {title: 'Guyana'}, {title: 'Haiti'}, {title: 'Heard Island and McDonald Islands'}, {title: 'Holy See'}, {title: 'Honduras'}, {title: 'Hong Kong'}, {title: 'Hungary'}, {title: 'Iceland'}, {title: 'India'},
    {title: 'Indonesia'}, {title: 'Cote dIvoire'}, {title: 'Iran (Islamic Republic of)'}, {title: 'Iraq'}, {title: 'Ireland'}, {title: 'Isle of Man'}, {title: 'Israel'}, {title: 'Italy'}, {title: 'Jamaica'}, {title: 'Japan'}, {title: 'Jersey'}, {title: 'Jordan'}, {title: 'Kazakhstan'},
    {title: 'Kenya'}, {title: 'Kiribati'}, {title: 'Kuwait'}, {title: 'Kyrgyzstan'}, {title: 'Lao Peoples Democratic Republic'}, {title: 'Latvia'}, {title: 'Lebanon'}, {title: 'Lesotho'}, {title: 'Liberia'}, {title: 'Libya'}, {title: 'Liechtenstein'}, {title: 'Lithuania'}, {title: 'Luxembourg'},
    {title: 'Macao'}, {title: 'Macedonia'}, {title: 'Madagascar'}, {title: 'Malawi'}, {title: 'Malaysia'},{title: 'Maldives'}, {title: 'Mali'}, {title: 'Malta'}, {title: 'Marshall Islands'}, {title: 'Martinique'}, {title: 'Mauritania'}, {title: 'Mauritius'}, {title: 'Mayotte'}, {title: 'Mexico'},
    {title: 'Micronesia'}, {title: 'Moldova'}, {title: 'Monaco'}, {title: 'Mongolia'}, {title: 'Montenegro'}, {title: 'Montserrat'}, {title: 'Morocco'}, {title: 'Mozambique'}, {title: 'Myanmar'}, {title: 'Namibia'}, {title: 'Nauru'}, {title: 'Nepal'}, {title: 'Netherlands'}, {title: 'New Caledonia'},
    {title: 'New Zealand'}, {title: 'Nicaragua'}, {title: 'Niger'}, {title: 'Nigeria'}, {title: 'Niue'}, {title: 'Norfolk Island'}, {title: 'Korea (Democratic Peoples Republic of)'}, {title: 'Northern Mariana Islands'}, {title: 'Norway'}, {title: 'Oman'}, {title: 'Pakistan'}, {title: 'Palau'},
    {title: 'Palestine, State of'}, {title: 'Panama'}, {title: 'Papua New Guinea'}, {title: 'Paraguay'}, {title: 'Peru'}, {title: 'Philippines'}, {title: 'Pitcairn'}, {title: 'Poland'}, {title: 'Portugal'}, {title: 'Puerto Rico'}, {title: 'Qatar'}, {title: 'Republic of Kosovo'}, {title: 'Réunion'},
    {title: 'Romania'}, {title: 'Russian Federation'}, {title: 'Rwanda'}, {title: 'Saint Barthelemy'}, {title: 'Saint Helena, Ascension, and Tristan da Cunha'}, {title: 'Saint Kitts and Nevis'}, {title: 'Saint Lucia'}, {title: 'Saint Martin'}, {title: 'Saint Pierre and Miquelon'},
    {title: 'Saint Vincent and the Grenadines'}, {title: 'Samoa'}, {title: 'San Marino'}, {title: 'Sao Tome and Principe'}, {title: 'Saudi Arabia'}, {title: 'Senegal'}, {title: 'Serbia'}, {title: 'Seychelles'}, {title: 'Sierra Leone'}, {title: 'Singapore'}, {title: 'Sint Maarten'}, {title: 'Slovakia'},
    {title: 'Slovenia'}, {title: 'Solomon Islands'}, {title: 'Somalia'}, {title: 'South Africa'}, {title: 'South Georgia and the South Sandwich Islands'}, {title: 'Korea'}, {title: 'South Sudan'}, {title: 'Spain'}, {title: 'Sri Lanka'}, {title: 'Sudan'}, {title: 'Suriname'}, {title: 'Svalbard and Jan Mayen'},
    {title: 'Swaziland'}, {title: 'Sweden'}, {title: 'Switzerland'}, {title: 'Syrian Arab Republic'}, {title: 'Taiwan'}, {title: 'Tajikistan'}, {title: 'Tanzania, United Republic of'}, {title: 'Thailand'}, {title: 'Timor-Leste'}, {title: 'Togo'}, {title: 'Tokelau'}, {title: 'Tonga'},
    {title: 'Trinidad and Tobago'}, {title: 'Tunisia'}, {title: 'Turkey'}, {title: 'Turkmenistan'}, {title: 'Turks and Caicos Islands'}, {title: 'Tuvalu'}, {title: 'Uganda'}, {title: 'Ukraine'}, {title: 'United Arab Emirates'}, {title: 'United Kingdom of Great Britain'}, {title: 'Northern Ireland'},
    {title: 'Uruguay'}, {title: 'Uzbekistan'}, {title: 'Vanuatu'}, {title: 'Venezuela'}, {title: 'Vietnam'}, {title: 'Wallis'}, {title: 'Futuna'}, {title: 'Western Sahara'}, {title: 'Yemen'}, {title: 'Zambia'}, {title: 'Zimbabwe'}],
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
            id: 'state',
            options: [{title: 'Select...'}, {title: 'Alabama'}, {title: 'Alaska'}, {title: 'Arizona'}, {title: 'Arkansas'}, {title: 'California'}, {title: 'Colorado'},
              {title: 'Connecticut'}, {title: 'Delaware'}, {title: 'Florida'}, {title: 'Georgia'}, {title: 'Hawaii'}, {title: 'Idaho'}, {title: 'Illinois'},
              {title: 'Indiana'}, {title: 'Iowa'}, {title: 'Kansas'}, {title: 'Kentucky'}, {title: 'Louisiana'}, {title: 'Maine'}, {title: 'Maryland'},
              {title: 'Massachusetts'}, {title: 'Michigan'}, {title: 'Minnesota'}, {title: 'Mississippi'}, {title: 'Missouri'}, {title: 'Montana'},
              {title: 'Nebraska'}, {title: 'Nevada'}, {title: 'New Hampshire'}, {title: 'New Jersey'}, {title: 'New Mexico'}, {title: 'New York'},
              {title: 'North Carolina'}, {title: 'North Dakota'}, {title: 'Ohio'}, {title: 'Oklahoma'}, {title: 'Oregon'}, {title: 'Pennsylvania'},
              {title: 'Rhode Island'}, {title: 'South Carolina'}, {title: 'South Dakota'}, {title: 'Tennessee'}, {title: 'Texas'}, {title: 'Utah'},
              {title: 'Vermont'}, {title: 'Virginia'}, {title: 'Washington'}, {title: 'West Virginia'}, {title: 'Wisconsin'}, {title: 'Wyoming'}],
            required: true,
            disabled: false
          },
          {
            id: 'zipCode',
            required: true,
            disabled: false
          }
        ]
      }
      return [
        {
          id: 'state',
          options: [{title: 'Not Applicable'}],
          required: false,
          disabled: true
        },
        {
          id: 'zipCode',
          required: false,
          disabled: false
        }
      ]
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 1',
    id: 'addressLine1',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 2',
    id: 'addressLine2',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'City',
    id: 'city',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The city name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'select',
    label: 'State',
    id: 'state',
    options: [{title: 'Select...'}, {title: 'Alabama'}, {title: 'Alaska'}, {title: 'Arizona'}, {title: 'Arkansas'}, {title: 'California'}, {title: 'Colorado'},
      {title: 'Connecticut'}, {title: 'Delaware'}, {title: 'Florida'}, {title: 'Georgia'}, {title: 'Hawaii'}, {title: 'Idaho'}, {title: 'Illinois'},
      {title: 'Indiana'}, {title: 'Iowa'}, {title: 'Kansas'}, {title: 'Kentucky'}, {title: 'Louisiana'}, {title: 'Maine'}, {title: 'Maryland'},
      {title: 'Massachusetts'}, {title: 'Michigan'}, {title: 'Minnesota'}, {title: 'Mississippi'}, {title: 'Missouri'}, {title: 'Montana'},
      {title: 'Nebraska'}, {title: 'Nevada'}, {title: 'New Hampshire'}, {title: 'New Jersey'}, {title: 'New Mexico'}, {title: 'New York'},
      {title: 'North Carolina'}, {title: 'North Dakota'}, {title: 'Ohio'}, {title: 'Oklahoma'}, {title: 'Oregon'}, {title: 'Pennsylvania'},
      {title: 'Rhode Island'}, {title: 'South Carolina'}, {title: 'South Dakota'}, {title: 'Tennessee'}, {title: 'Texas'}, {title: 'Utah'},
      {title: 'Vermont'}, {title: 'Virginia'}, {title: 'Washington'}, {title: 'West Virginia'}, {title: 'Wisconsin'}, {title: 'Wyoming'}],
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
    id: 'zipCode',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 10)
        return 'The zip code must be less than 10 characters.'
      return null
    }
  },
  {
    type: 'checkbox',
    label: 'Billing address is same as shipping',
    id: 'enableShippingAddress',
    required: false,
    validation: null,
    onUpdate: (value) => {
      if (value){
        return [
          {
            id: 'billingCountry',
            required: false,
            disabled: true
          },
          {
            id: 'billingAddressLine1',
            required: false,
            disabled: true
          },
          {
            id: 'billingAddressLine2',
            required: false,
            disabled: true
          },
          {
            id: 'billingCity',
            required: false,
            disabled: true
          },
          {
            id: 'billingState',
            required: false,
            disabled: true
          },
          {
            id: 'billingZipCode',
            required: false,
            disabled: true
          },
        ]
      }
      return [
        {
          id: 'billingCountry',
          required: true,
          disabled: false
        },
        {
          id: 'billingAddressLine1',
          required: true,
          disabled: false
        },
        {
          id: 'billingAddressLine2',
          required: false,
          disabled: false
        },
        {
          id: 'billingCity',
          required: true,
          disabled: false
        },
        {
          id: 'billingState',
          required: true,
          disabled: false
        },
        {
          id: 'billingZipCode',
          required: true,
          disabled: false
        },
      ]
    }
  },
  {
    type: 'select',
    label: 'Country',
    id: 'billingCountry',
    options: [{title: 'Select...'}, {title: 'United States of America'}, {title: 'Canada'}, {title: '--------------', disabled: true}, {title: 'Afghanistan'}, {title: 'Aland Islands'}, {title: 'Albania'}, {title: 'Algeria'}, {title: 'American Samoa'}, {title: 'Andorra'}, {title: 'Angola'},
    {title: 'Anguilla'}, {title: 'Antarctica'}, {title: 'Antigua and Barbuda'}, {title: 'Argentina'}, {title: 'Armenia'}, {title: 'Aruba'}, {title: 'Australia'}, {title: 'Austria'}, {title: 'Azerbaijan'}, {title: 'Bahamas'}, {title: 'Bahrain'}, {title: 'Bangladesh'}, {title: 'Barbados'},
    {title: 'Belarus'}, {title: 'Belgium'}, {title: 'Belize'}, {title: 'Benin'}, {title: 'Bermuda'}, {title: 'Bhutan'}, {title: 'Bolivia'}, {title: 'Bonaire, Sint Eustatius and Saba'}, {title: 'Bosnia and Herzegovina'}, {title: 'Botswana'}, {title: 'Bouvet Island'},
    {title: 'Brazil'}, {title: 'British Indian Ocean Territory'}, {title: 'United States Minor Outlying Islands'}, {title: 'Virgin Islands (British)'}, {title: 'Virgin Islands (U.S.)'},{title: 'Brunei Darussalam'}, {title: 'Bulgaria'}, {title: 'Burkina Faso'}, {title: 'Burundi'},
    {title: 'Cambodia'}, {title: 'Cameroon'}, {title: 'Cabo Verde'}, {title: 'Cayman Islands'}, {title: 'Central African Republic'}, {title: 'Chad'}, {title: 'Chile'}, {title: 'China'}, {title: 'Christmas Island'}, {title: 'Cocos (Keeling) Islands'}, {title: 'Colombia'}, {title: 'Comoros'},
    {title: 'Congo'}, {title: 'Cook Islands'}, {title: 'Costa Rica'}, {title: 'Croatia'}, {title: 'Cuba'}, {title: 'Curaçao'}, {title: 'Cyprus'}, {title: 'Czech Republic'}, {title: 'Denmark'}, {title: 'Djibouti'}, {title: 'Dominica'}, {title: 'Dominican Republic'}, {title: 'Ecuador'},
    {title: 'Egypt'}, {title: 'El Salvador'}, {title: 'Equatorial Guinea'}, {title: 'Eritrea'}, {title: 'Estonia'}, {title: 'Ethiopia'}, {title: 'Falkland Islands (Malvinas)'}, {title: 'Faroe Islands'}, {title: 'Fiji'}, {title: 'Finland'}, {title: 'France'}, {title: 'French Guiana'},
    {title: 'French Polynesia'}, {title: 'French Southern Territories'}, {title: 'Gabon'}, {title: 'Gambia'}, {title: 'Georgia'}, {title: 'Germany'}, {title: 'Ghana'}, {title: 'Gibraltar'}, {title: 'Greece'}, {title: 'Greenland'}, {title: 'Grenada'}, {title: 'Guadeloupe'}, {title: 'Guam'},
    {title: 'Guatemala'}, {title: 'Guernsey'}, {title: 'Guinea'}, {title: 'Guinea-Bissau'}, {title: 'Guyana'}, {title: 'Haiti'}, {title: 'Heard Island and McDonald Islands'}, {title: 'Holy See'}, {title: 'Honduras'}, {title: 'Hong Kong'}, {title: 'Hungary'}, {title: 'Iceland'}, {title: 'India'},
    {title: 'Indonesia'}, {title: 'Cote dIvoire'}, {title: 'Iran (Islamic Republic of)'}, {title: 'Iraq'}, {title: 'Ireland'}, {title: 'Isle of Man'}, {title: 'Israel'}, {title: 'Italy'}, {title: 'Jamaica'}, {title: 'Japan'}, {title: 'Jersey'}, {title: 'Jordan'}, {title: 'Kazakhstan'},
    {title: 'Kenya'}, {title: 'Kiribati'}, {title: 'Kuwait'}, {title: 'Kyrgyzstan'}, {title: 'Lao Peoples Democratic Republic'}, {title: 'Latvia'}, {title: 'Lebanon'}, {title: 'Lesotho'}, {title: 'Liberia'}, {title: 'Libya'}, {title: 'Liechtenstein'}, {title: 'Lithuania'}, {title: 'Luxembourg'},
    {title: 'Macao'}, {title: 'Macedonia'}, {title: 'Madagascar'}, {title: 'Malawi'}, {title: 'Malaysia'},{title: 'Maldives'}, {title: 'Mali'}, {title: 'Malta'}, {title: 'Marshall Islands'}, {title: 'Martinique'}, {title: 'Mauritania'}, {title: 'Mauritius'}, {title: 'Mayotte'}, {title: 'Mexico'},
    {title: 'Micronesia'}, {title: 'Moldova'}, {title: 'Monaco'}, {title: 'Mongolia'}, {title: 'Montenegro'}, {title: 'Montserrat'}, {title: 'Morocco'}, {title: 'Mozambique'}, {title: 'Myanmar'}, {title: 'Namibia'}, {title: 'Nauru'}, {title: 'Nepal'}, {title: 'Netherlands'}, {title: 'New Caledonia'},
    {title: 'New Zealand'}, {title: 'Nicaragua'}, {title: 'Niger'}, {title: 'Nigeria'}, {title: 'Niue'}, {title: 'Norfolk Island'}, {title: 'Korea (Democratic Peoples Republic of)'}, {title: 'Northern Mariana Islands'}, {title: 'Norway'}, {title: 'Oman'}, {title: 'Pakistan'}, {title: 'Palau'},
    {title: 'Palestine, State of'}, {title: 'Panama'}, {title: 'Papua New Guinea'}, {title: 'Paraguay'}, {title: 'Peru'}, {title: 'Philippines'}, {title: 'Pitcairn'}, {title: 'Poland'}, {title: 'Portugal'}, {title: 'Puerto Rico'}, {title: 'Qatar'}, {title: 'Republic of Kosovo'}, {title: 'Réunion'},
    {title: 'Romania'}, {title: 'Russian Federation'}, {title: 'Rwanda'}, {title: 'Saint Barthelemy'}, {title: 'Saint Helena, Ascension, and Tristan da Cunha'}, {title: 'Saint Kitts and Nevis'}, {title: 'Saint Lucia'}, {title: 'Saint Martin'}, {title: 'Saint Pierre and Miquelon'},
    {title: 'Saint Vincent and the Grenadines'}, {title: 'Samoa'}, {title: 'San Marino'}, {title: 'Sao Tome and Principe'}, {title: 'Saudi Arabia'}, {title: 'Senegal'}, {title: 'Serbia'}, {title: 'Seychelles'}, {title: 'Sierra Leone'}, {title: 'Singapore'}, {title: 'Sint Maarten'}, {title: 'Slovakia'},
    {title: 'Slovenia'}, {title: 'Solomon Islands'}, {title: 'Somalia'}, {title: 'South Africa'}, {title: 'South Georgia and the South Sandwich Islands'}, {title: 'Korea'}, {title: 'South Sudan'}, {title: 'Spain'}, {title: 'Sri Lanka'}, {title: 'Sudan'}, {title: 'Suriname'}, {title: 'Svalbard and Jan Mayen'},
    {title: 'Swaziland'}, {title: 'Sweden'}, {title: 'Switzerland'}, {title: 'Syrian Arab Republic'}, {title: 'Taiwan'}, {title: 'Tajikistan'}, {title: 'Tanzania, United Republic of'}, {title: 'Thailand'}, {title: 'Timor-Leste'}, {title: 'Togo'}, {title: 'Tokelau'}, {title: 'Tonga'},
    {title: 'Trinidad and Tobago'}, {title: 'Tunisia'}, {title: 'Turkey'}, {title: 'Turkmenistan'}, {title: 'Turks and Caicos Islands'}, {title: 'Tuvalu'}, {title: 'Uganda'}, {title: 'Ukraine'}, {title: 'United Arab Emirates'}, {title: 'United Kingdom of Great Britain'}, {title: 'Northern Ireland'},
    {title: 'Uruguay'}, {title: 'Uzbekistan'}, {title: 'Vanuatu'}, {title: 'Venezuela'}, {title: 'Vietnam'}, {title: 'Wallis'}, {title: 'Futuna'}, {title: 'Western Sahara'}, {title: 'Yemen'}, {title: 'Zambia'}, {title: 'Zimbabwe'}],
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a country.'
      return null
    },
    onUpdate: (value) => {
      if (value !== 'United States of America'){
        return [
          {
            id: 'billingAddressLine1',
            required: true,
            disabled: false
          },
          {
            id: 'billingAddressLine2',
            required: false,
            disabled: false
          },
          {
            id: 'billingCity',
            required: true,
            diabled: false
          },
          {
            id: 'billingState',
            options: [{title: 'Not Applicable'}],
            required: false,
            disabled: true
          },
          {
            id: 'billingZipCode',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'United States of America'){
        return [
          {
            id: 'billingAddressLine1',
            required: true,
            disabled: false
          },
          {
            id: 'billingAddressLine2',
            required: false,
            disabled: false
          },
          {
            id: 'billingCity',
            required: true,
            diabled: false
          },
          {
            id: 'billingState',
            options: [{title: 'Select...'}, {title: 'Alabama'}, {title: 'Alaska'}, {title: 'Arizona'}, {title: 'Arkansas'}, {title: 'California'}, {title: 'Colorado'},
              {title: 'Connecticut'}, {title: 'Delaware'}, {title: 'Florida'}, {title: 'Georgia'}, {title: 'Hawaii'}, {title: 'Idaho'}, {title: 'Illinois'},
              {title: 'Indiana'}, {title: 'Iowa'}, {title: 'Kansas'}, {title: 'Kentucky'}, {title: 'Louisiana'}, {title: 'Maine'}, {title: 'Maryland'},
              {title: 'Massachusetts'}, {title: 'Michigan'}, {title: 'Minnesota'}, {title: 'Mississippi'}, {title: 'Missouri'}, {title: 'Montana'},
              {title: 'Nebraska'}, {title: 'Nevada'}, {title: 'New Hampshire'}, {title: 'New Jersey'}, {title: 'New Mexico'}, {title: 'New York'},
              {title: 'North Carolina'}, {title: 'North Dakota'}, {title: 'Ohio'}, {title: 'Oklahoma'}, {title: 'Oregon'}, {title: 'Pennsylvania'},
              {title: 'Rhode Island'}, {title: 'South Carolina'}, {title: 'South Dakota'}, {title: 'Tennessee'}, {title: 'Texas'}, {title: 'Utah'},
              {title: 'Vermont'}, {title: 'Virginia'}, {title: 'Washington'}, {title: 'West Virginia'}, {title: 'Wisconsin'}, {title: 'Wyoming'}],
            required: true,
            disabled: false
          },
          {
            id: 'billingZipCode',
            required: true,
            disabled: false
          }
        ]
      }
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 1',
    id: 'billingAddressLine1',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 2',
    id: 'billingAddressLine2',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'City',
    id: 'billingCity',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The city name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'select',
    label: 'State',
    id: 'billingState',
    options: [{title: 'Select...'}, {title: 'Alabama'}, {title: 'Alaska'}, {title: 'Arizona'}, {title: 'Arkansas'}, {title: 'California'}, {title: 'Colorado'},
      {title: 'Connecticut'}, {title: 'Delaware'}, {title: 'Florida'}, {title: 'Georgia'}, {title: 'Hawaii'}, {title: 'Idaho'}, {title: 'Illinois'},
      {title: 'Indiana'}, {title: 'Iowa'}, {title: 'Kansas'}, {title: 'Kentucky'}, {title: 'Louisiana'}, {title: 'Maine'}, {title: 'Maryland'},
      {title: 'Massachusetts'}, {title: 'Michigan'}, {title: 'Minnesota'}, {title: 'Mississippi'}, {title: 'Missouri'}, {title: 'Montana'},
      {title: 'Nebraska'}, {title: 'Nevada'}, {title: 'New Hampshire'}, {title: 'New Jersey'}, {title: 'New Mexico'}, {title: 'New York'},
      {title: 'North Carolina'}, {title: 'North Dakota'}, {title: 'Ohio'}, {title: 'Oklahoma'}, {title: 'Oregon'}, {title: 'Pennsylvania'},
      {title: 'Rhode Island'}, {title: 'South Carolina'}, {title: 'South Dakota'}, {title: 'Tennessee'}, {title: 'Texas'}, {title: 'Utah'},
      {title: 'Vermont'}, {title: 'Virginia'}, {title: 'Washington'}, {title: 'West Virginia'}, {title: 'Wisconsin'}, {title: 'Wyoming'}],
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
    id: 'billingZipCode',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 10)
        return 'The zip code must be less than 10 characters.'
      return null
    }
  }
]

/**
  * @name CustomerFormModel
  * @class CustomerFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
 */
export default class CustomerFormModel extends FormModel{
  constructor(onClickNav, onCancelNav) {
    let primaryOnClick = () => {}
    super(fields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      {
        title: 'Cancel',
        onClick: onCancelNav
      }
    )
    this.onClickNav = onClickNav
    autoBind(this)
    this.primaryButton.onClick = this.newButton()
  }
  /**
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = fields
  }
  /**
   * @name editButton
   * @description Returns function for onClick of primary button when editing
   * @method editButton
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => console.log('EDIT with', fields)
  }
  /**
   * @name newButton
   * @description Returns function for onClick of primary button when creating
   * @method newButton
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  newButton(){
    return (fields) => {
      let valueReturn = (id) => {
        let val
        fields.forEach(item => {
          if (item.id == id){
            val = item.value
          }
        })
        return val
      }
      let body = {
        name: valueReturn('companyName').trim(),
        email: valueReturn('emailAddress').trim(),
        website: valueReturn('websiteLink').trim(),
        shippingAddr: {
          street: `${valueReturn('addressLine1').trim()} ${valueReturn('addressLine2').trim()}`.trim(),
          city: valueReturn('city').trim(),
          state: valueReturn('state').trim(),
          country: valueReturn('country').trim(),
          zip: valueReturn('zipCode').trim()
        },
        isPastDue: false,
        phoneNumber: valueReturn('phoneNumber').trim(),
      }
      if (valueReturn('enableShippingAddress'))
        body.billingAddr = body.shippingAddr
      else
        body.billingAddr = {
          street: `${valueReturn('billingAddressLine1').trim()} ${valueReturn('billingAddressLine2').trim()}`.trim(),
          city: valueReturn('billingCity').trim(),
          state: valueReturn('billingState').trim(),
          country: valueReturn('billingCountry').trim(),
          zip: valueReturn('billingZipCode').trim()
        }
      Website.createCustomer(body)
      .then(() => this.onClickNav())
    }
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentCustomer
   * @method setEdit
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.resetFields()
    // Update fields with values corresponding to currentCustomer
    console.log(Website.currentCustomer)
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton()
    this.resetFields()
  }
  /**
   * @name setOnClickNav
   * @description Modifies primary button click
   * @method setOnClickNav
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setOnClickNav(newOnClick){
    this.onClickNav = newOnClick
  }
}
