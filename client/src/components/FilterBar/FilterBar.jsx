import React, { Component } from 'react'
import './FilterBar-style.css'
import Flatpickr from 'react-flatpickr'
import { Button, Row, Col, Select, Checkbox, Icon } from 'react-materialize'
import { filterReservations } from '../../actions/reservationActions'
import { filterVenues, cancelFilter } from '../../actions/venueActions'
import { connect } from 'react-redux'

class FilterBar extends Component {
  state = {
    date: null,
    options: {
      pastry: false,
      gastro: false,
      cold: false
    },
    parsedDate: null,
    hours: null,
    price: null
  }
  dropFilter = () => {
    this.setState(
      {
        date: null,
        options: {
          pastry: false,
          gastro: false,
          cold: false
        },
        parsedDate: null,
        hours: null,
        price: null
      }
    )
    this.props.cancelFilter()
  }
  onChangeOptions = async e => {
    await this.setState({
      options: {
        ...this.state.options,
        [e.target.className]: !this.state.options[e.target.className]
      }
    });
  
    const { options } = this.state
    this.props.filterVenues({ options })

  };
  handleChangePrice = (e) => {
    this.handleChange(e)
    const price = e.target.value
    if (price) this.props.filterVenues({ price }) 
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value || null
    })
  }

  filterOnDateFilled = () => {
    if (this.state.date) {
      this.props.filterReservations(this.state.date)
    }
  }
  handleDateChange = date => {
    this.setState({
      date: date[0]
    });
    this.filterOnDateFilled()
  };
  render() {
    return (
      <Row className='container'>
      <div className='filterBar'>
        <div>Выберите дату:</div>
        <Col className='myDate'>
        <Flatpickr style={{ borderBottom: '1px solid #9e9e9e'}}
              label='Выберите'
              data-enable-time 
              defaultValue={this.state.date}
              onChange={(date) => this.handleDateChange(date)}
        />
        </Col>
        <div style={{}}>Выберите дату:</div>
        <Select name='price' onChange={this.handleChangePrice}>
          <option value=''></option>
          <option value="1000">До 1000 р.</option>
          <option value="2000">До 2000 р.</option>
          <option value="3000">До 3000 р.</option>
        </Select>
        <div className='checkContainer' style={{ display: 'flex', alignItems: 'center'}}>
           <div style={{marginLeft: '10px'}}>
             <Checkbox
               className='pastry'
               onChange={this.onChangeOptions}
               value={this.state.pastry}
               label='Кондитерский цех'
               checked={this.state.options.pastry}
             />
           </div>
           <div style={{marginLeft: '10px'}}>
             <Checkbox
               className='gastro'
               onChange={this.onChangeOptions}
               value={this.state.gastro}
               label='Кулинарный цех'
               checked={this.state.options.gastro}
             />
           </div>
           <div style={{marginLeft: '10px'}}>
             <Checkbox
               className='cold'
               onChange={this.onChangeOptions}
               value={this.state.cold}
               label='Холодный цех'
               checked={this.state.options.cold}
             />
           </div>
         </div>
        <Button icon={<Icon>close</Icon>}onClick={this.dropFilter} className='button red lighten-2' tooltip='Сбросить фильтр'></Button>
      </div>
    </Row>
    )
  }
}

export default connect(null, { filterReservations, filterVenues, cancelFilter })(FilterBar)