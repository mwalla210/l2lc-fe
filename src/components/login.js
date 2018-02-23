import React, { Component } from 'react'
import { inject } from 'mobx-react'

@inject ('page')
export default class Login extends Component {
  activateLasers(){
    this.props.page.changeLogin()
  }

  render() {
    return(
      <div>
        <p className='container' style={{display: 'flex', justifyContent: 'center'}}>
          <img style={{margin: '30px'}} src={'../../img/L2L-Logo-raisedLARGE.png'}/>
        </p>
        <h1>Line2Line Cloud</h1>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='form-group'>
              <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  tabIndex='1'
                  className='form-control'
                  placeholder='Username'
                  value=''/>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  tabIndex='2'
                  className='form-control'
                  placeholder='Password'/>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg btn-block'
                    onClick={this.activateLasers.bind(this)}>
                      Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
