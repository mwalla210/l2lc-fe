import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'

/**
 * ProjectStatusFilter component; constructor binds functions
 * @namespace ProjectStatusFilter
 * @property {Object} [filter] Current filter values
 * @property {Function} onChange On change function for checkboxes
 * @extends React.Component
 */
@inject ('page') @observer
export default class ProjectStatusFilter extends Component {
  static propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.checkChange = this.checkChange.bind(this)
  }

  /**
   * Handles onChange of checkbox filters
   * @method checkChange
   * @memberof ProjectStatusFilter.prototype
   */
  checkChange(val){
    this.props.onChange(val)
  }

  /**
   * Renders SplitButton and Checkbox, CheckboxGroup
   * @method render
   * @memberof ProjectStatusFilter.prototype
   * @return {Component}
   * @see {@link https://reactstrap.github.io/components/button-dropdown/ Reactstrap.ButtonDropdown}
   * @see {@link https://www.npmjs.com/package/react-checkbox-group Checkbox}
   */
  render(){
    return (
      <ButtonDropdown isOpen={this.props.page.tableModel.filterDD} toggle={this.props.page.tableModel.toggleDropdown} style={{height: '30px'}}>
        <DropdownToggle outline caret
          color="secondary"
          style={{paddingTop: '2px'}}
        >
          Filter
        </DropdownToggle>
        <DropdownMenu>
          <CheckboxGroup
            name="Filters"
            value={this.props.filter ? this.props.filter.value : []}
            onChange={this.checkChange}
          >
            <label style={{marginLeft: '8px'}}><Checkbox value="Received"/> Received</label>
            <br/>
            <label style={{marginLeft: '8px'}}><Checkbox value="In Progress"/> In Progress</label>
            <br/>
            <label style={{marginLeft: '8px'}}><Checkbox value="Completed"/> Completed</label>
            <br/>
          </CheckboxGroup>
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}
