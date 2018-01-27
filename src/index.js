import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'mobx-react'
import website from './store/website.js'
import page from './store/page.js'

ReactDOM.render(
  <Provider website={website} page={page}>
    <App/>
  </Provider>,
  document.querySelector('.container'))
