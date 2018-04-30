//Please take note that as of version 3.0.0, a Switch no longer maintains an internal state.
//Using this component requires that you pass both an onClick method and an on value to set the current
//state of the Switch

import React, {Component} from 'react'
import {render} from 'react-dom'
import Switch from 'react-toggle-switch'

@inject('website', 'page')

export default class MyComponent extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    //this.state = state.bind(this)
    this.toggleSwitch = toggleSwitch.bind(this)
    state = {
      switched: false
    }
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      }
    })
  }

  infoClick(){
    this.props.clickHandler(this.props.row, 'info')
  }

  render(){
    let full = this.props.set == 'Full'
    return (
      <span>
        <span>
          <div>
            {/* Basic Switch */}
            <Switch onClick={this.toggleSwitch} on={this.state.switched}/>

            //{/* With children */}
            //<Switch onClick={this.toggleSwitch} on={this.state.switched}>
            //  <i class="some-icon"/>
            //</Switch>

            //{/* Disabled */}
            //<Switch onClick={this.toggleSwitch} on={this.state.switched} enabled={false}/>

            //{/* Custom classnames */}
            //<Switch onClick={this.toggleSwitch} on={this.state.switched} className='other-class'/>
          <div/>
        </span>
      </span>
    )
  }
}

export default MyComponent
