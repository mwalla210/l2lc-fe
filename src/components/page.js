import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
import NavBar from './navbar'

/**
 * Page component
 * @namespace Page
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('page', 'website') @observer
export default class Page extends Component {
  /**
   * Renders Login
   * @method loginContent
   * @memberof Page.prototype
   * @see {@link Login}
   */
  loginContent() {
    return(
      <Login/>
    )
  }

  /**
   * Renders HTML div component with NavBar, page title, and dynamic content
   * @method pageContent
   * @memberof Page.prototype
   * @see {@link Navbar}
   */
  pageContent(){
    let content = null
    if (this.props.page.content){
      let ContentType = this.props.page.content
      content = <ContentType/>
    }
    return (
      <div>
        <NavBar/>
        <h1>{this.props.page.title}</h1>
        {content}
      </div>
    )
  }

  /**
   * Renders HTML div component; content depends on whether user is logged in
   * @method render
   * @memberof Page.prototype
   */
  render() {
    let content = null
    if (!this.props.website.currentUser)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
