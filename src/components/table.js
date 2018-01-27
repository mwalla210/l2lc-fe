import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

@observer
export default class Table extends Component {
  static propTypes = {
    tableModel: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props)
    this.props.tableModel.dataFetch()
  }

  render() {
    // const data = [
    //   {
    //     name: 'Tanner Linsley',
    //     age: 26,
    //     friend: {
    //       name: 'Jason Maurer',
    //       age: 23,
    //     }
    //   }
    // ]
    // const columns = [
    //   {
    //     Header: 'Name',
    //     accessor: 'name' // String-based value accessors!
    //   },
    //   {
    //     Header: 'Age',
    //     accessor: 'age',
    //     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    //   },
    //   {
    //     id: 'friendName', // Required because our accessor is not a string
    //     Header: 'Friend Name',
    //     accessor: d => d.friend.name // Custom value accessors!
    //   },
    //   {
    //     Header: props => <span>Friend Age</span>, // Custom header components!
    //     accessor: 'friend.age'
    //   }
    // ]

    /* Custom onClick
    getTdProps={(state, rowInfo, column, instance) => {
      return {
        onClick: (e, handleOriginal) => {
          console.log('A Td Element was clicked!')
          console.log('it produced this event:', e)
          console.log('It was in this column:', column)
          console.log('It was in this row:', rowInfo)
          console.log('It was in this table instance:', instance)

          // IMPORTANT! React-Table uses onClick internally to trigger
          // events like expanding SubComponents and pivots.
          // By default a custom 'onClick' handler will override this functionality.
          // If you want to fire the original onClick handler, call the
          // 'handleOriginal' function.
          if (handleOriginal) {
            handleOriginal()
          }
        }
      }
    }}
    getTrProps={(state, rowInfo, column) => {
      return {
        style: {
          background: rowInfo.row.age > 20 ? 'green' : 'red'
        }
      }
    }}
     */

    /* Page sizing customization
    defaultPageSize={14}
    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
     */

    return (
      <div>
        <div className='row' style={{paddingBottom: '20px'}}>
          {this.props.tableModel.tableButton}
        </div>
        <div className='row'>
          <ReactTable
            data={toJS(this.props.tableModel.data)}
            columns={this.props.tableModel.columns}
            loading={this.props.tableModel.loading}
          />
        </div>
      </div>
    )

  }
}
