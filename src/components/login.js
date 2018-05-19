import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ButtonPrimary from './buttonPrimary'

/**
 * Login component; constructor binds functions
 * @namespace Login
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('page', 'website') @observer
export default class Login extends Component {
  constructor(props){
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.props.page.createNewProjMenuItem = this.props.page.createNewProjMenuItem.bind(this)
  }

  /**
   * Calls website.login with default page navigation
   * @method formSubmit
   * @param {Object} event Form submit event
   * @memberof Login.prototype
   * @see {@link Website}
   */
  formSubmit(event){
    event.preventDefault()
    this.props.website.login(this.props.page.createNewProjMenuItem)
  }

  /**
   * Calls website.updateUsername with default page navigation
   * @method onChangeUsername
   * @param {Object} event Field content change event
   * @memberof Login.prototype
   * @see {@link Website}
   */
  onChangeUsername(event){
    let value = event.target.value
    this.props.website.updateUsername(value)
  }

  /**
   * Calls website.updatePassword with default page navigation
   * @method onChangePassword
   * @param {Object} event Field content change event
   * @memberof Login.prototype
   * @see {@link Website}
   */
  onChangePassword(event){
    let value = event.target.value
    this.props.website.updatePassword(value)
  }

  /**
   * Renders HTML div component containing logo, fields, and button
   * @method render
   * @memberof Login.prototype
   * @return {Component}
   * @see {@link ButtonPrimary}
   */
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
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="row justify-content-center">
              <div className="col-6 alert alert-warning" role="alert" {...alertStyle}>
                <strong>Warning!</strong>{' Couldn\'t authenticate this username and password combination.'}
              </div>
            </div>
            <form>
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-sm-6">
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
                    autoFocus
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-sm-6">
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
                <div className="row justify-content-center">
                  <div className="col-sm-6">
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
