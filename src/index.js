import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'mobx-react'
import website from './store/website.js'
import page from './store/page.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

ReactDOM.render(
  <Provider website={website} page={page}>
    <App/>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.querySelector('.container'))
