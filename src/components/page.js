import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
import NavBar from './navbar'

@inject ('page') @observer
export default class Page extends Component {
  loginContent() {
    return(
      <Login/>
    )
  }

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

  render() {
    let content = null
    if (!this.props.page.loggedin)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
