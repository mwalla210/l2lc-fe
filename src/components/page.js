import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
import NavBar from './navbar'
import {Button} from 'react-bootstrap'

const chevLeft = '../../style/open-iconic-master/svg/chevron-left.svg'

@inject ('page', 'website') @observer
export default class Page extends Component {
  constructor(props){
    super(props)
    this.backNav = this.backNav.bind(this)
  }
  loginContent() {
    return(
      <Login/>
    )
  }

  backNav(){
    // Get prior page
    let nav = this.props.page.backNavPop()
    nav()
    // Secondary call to remove item added from nav function
    this.props.page.backNavPop()
  }

  pageContent(){
    let content = null
    if (this.props.page.content){
      let ContentType = this.props.page.content
      content = <ContentType/>
    }
    console.log(this.props.page.backNav.length)
    return (
      <div>
        <NavBar/>
        <div style={{textAlign: 'center'}}>
        <Button disabled={this.props.page.backNav.length<=0} type="button" className="btn btn-primary" onClick={this.backNav} style={{float: 'left', marginRight: '-33px'}}>
          <img src={chevLeft} alt="chevron-left"/>
        </Button>
        <h1>{this.props.page.title}</h1>
        </div>
        {content}
      </div>
    )
  }

  render() {
    // history.pushState(null, null, document.URL);
    // window.addEventListener('popstate', function () {
    //     history.pushState(null, null, document.URL);
    // });
    let content = null
    if (!this.props.website.currentUser)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
