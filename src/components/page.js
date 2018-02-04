import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
import Sidebar from './sidebar'
import Table from './table'
import L2LCModal from './l2lcmodal'
import Formfield from './formfield'
import Form from './form'
import { Button } from 'react-bootstrap'

@inject ('page') @observer
export default class Page extends Component {
  loginContent() {
    return(
      <Login/>
    )
  }

  pageContent(){
    // Example with Modal and associated button
    // return (
    //   <div>
    //     <Button
    //       bsStyle="primary"
    //       bsSize="large" onClick={() => this.props.page.showModal()}>
    //         Open Modal
    //     </Button>
    //     <L2LCModal
    //       title={'Test Title'}
    //       body={
    //         <div>a</div>
    //       }
    //       button={{
    //         title: 'New Button',
    //         onClick: () => console.log('button onClick')
    //       }}/>
    //   </div>
    // )

    let tableContent = null
    if (this.props.page.tableModel){
      tableContent = <Table tableModel={this.props.page.tableModel}/>
    }
    return (
      <div className='main'>
        <h1>{this.props.page.title}</h1>
        {this.props.page.content}
        {tableContent}
        {this.props.page.buttons}
        <Sidebar highlight={this.props.page.navHighlight}/>
      </div>
    )
  }

  render() {
    let content = null
    if (this.props.page.loggedin)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
