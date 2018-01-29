import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

export default class Formfield extends Component {
  render() {
    return(

      <div class="form-group">
        <label for={this.props.id}>{this.props.label}</label>
        <input type={this.props.type} class="form-control" id={this.props.id} aria-describedby={this.props.aria} placeholder={this.props.placeholder}>
        <small id={this.props.aria} class="form-text text-muted">{this.props.smalltext}</small>
      </div>

      <div class="form-group">
        <label for={this.props.id}>{this.props.label}</label>
        <textarea class="form-control" rows="5" id={this.props.id}></textarea>
      </div>

      <div class="form-group">
        <label class="checkbox-inline"><input type="checkbox" value="">{this.props.?} 1</label> // The number of options and their fields I'm not sure how to abstract
        <label class="checkbox-inline"><input type="checkbox" value="">{this.props.?} 2</label> //
        <label class="checkbox-inline"><input type="checkbox" value="">{this.props.?} 3</label> //
      </div>

      <div class="form-group">
        <div class="checkbox">
          <label><input type="checkbox" value="">{this.props.?} 1</label> //The number of options and their fields I'm not sure how to abstract
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="">{this.props.?} 2</label>
        </div>
        <div class="checkbox disabled">
          <label><input type="checkbox" value="" >{this.props.option3} 3</label> // maybe like this?
        </div>
      </div>

      <div class="form-group">
        <div class="radio">
          <label><input type="radio" name="optradio">Option 1</label> // Ditto for the options here
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Option 2</label>
        </div>
        <div class="radio disabled">
          <label><input type="radio" name="optradio" >Option 3</label>
        </div>
      </div>

      <div class="form-group">
        <label for="sel1">Select list:</label>
          <select class="form-control" id="sel1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
      </div>
    )
  }
}
