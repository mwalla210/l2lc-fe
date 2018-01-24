import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject ('website') @observer
export default class Page extends Component {
  loginContent() {
    return(
      <div>
        <p>
          Login!
        </p>
        <button onClick={this.activateLasers.bind(this)}>
          Activate Lasers
        </button>
      </div>
    )
  }

  activateLasers(){
    this.props.website.changeLogin()
  }

  pageContent(){
    return (
      <div>
        <h1>{this.props.website.pageTitle}</h1>
        {this.props.website.content}
        {this.props.website.pageButtons}
      </div>
    )
  }

  render() {
    console.log('page render')
    if (this.props.website.login){
      return (
        <div>
          {this.loginContent()}
        </div>
      )
    }
    else{
      return (
        <div>
          {this.pageContent()}
        </div>
      )
    }
  }
}
