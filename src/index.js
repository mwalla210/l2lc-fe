import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'mobx-react'
import website from './store/website.js'

ReactDOM.render(
  <Provider website={website}>
    <App/>
  </Provider>,
  document.querySelector('.container'))
