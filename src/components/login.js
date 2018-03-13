import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ButtonPrimary from './buttonPrimary'

@inject ('page', 'website') @observer
export default class Login extends Component {
  constructor(props){
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.props.page.createNewProjMenuItem = this.props.page.createNewProjMenuItem.bind(this)
  }

  formSubmit(event){
    event.preventDefault()
    this.props.website.login(this.props.page.createNewProjMenuItem)
  }

  onChangeUsername(event){
    let value = event.target.value
    this.props.website.updateUsername(value)
  }

  onChangePassword(event){
    let value = event.target.value
    this.props.website.updatePassword(value)
  }

  render() {
    let alertStyle = null
    if (!this.props.website.loginerror){
      alertStyle = {
        style: {display: 'none'}
      }
    }
    return(
      <div>
        <p className="container" style={{display: 'flex', justifyContent: 'center'}}>
          <img style={{margin: '30px'}} src={'../../img/L2L-Logo-raisedLARGE.png'}/>
        </p>
        <h1 style={{marginBottom: '30px'}}>Line2Line Cloud</h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="col-sm-6 col-sm-offset-3 alert alert-warning" role="alert" {...alertStyle}>
              <strong>Warning!</strong>{' Couldn\'t authenticate this username and password combination.'}
            </div>
            <form>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    tabIndex="1"
                    className="form-control"
                    placeholder="Username"
                    value={this.props.website.username}
                    onChange={this.onChangeUsername}
                    onBlur={this.onBlur}
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    tabIndex="2"
                    className="form-control"
                    placeholder="Password"
                    value={this.props.website.password}
                    onChange={this.onChangePassword}
                    onBlur={this.onBlur}
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <ButtonPrimary
                      className="btn-lg btn-block"
                      onClick={this.formSubmit}
                      disabled={this.props.website.loginButtonDisabled}
                      text="Login"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
