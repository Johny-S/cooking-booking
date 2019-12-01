import React, { Component } from 'react';
import { Col, Table, Button, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'

export default class Bookings extends Component {
  render() {
  return (
    <Col className='s12'>
      <h4>Мои бронирования</h4>
        <Table>
          <thead>
          <tr>
            <th>Название студии</th>
            <th>Дата</th>
            <th>Участинки</th>
            <th>Стоимость</th>
            <th>Вы сэкономили</th>
          </tr>
          </thead>
          <tbody>
            {this.props.bookings.map((booking, i) => <tr key={booking._id}>
              <td><Link to={`/venues/${booking.venueId}`}>{booking.venue.name}</Link></td>
              <td>{`${booking.date.toDateString()} ${booking.date.toTimeString().slice(0, 5)}`}</td>
              <td>{booking.attenders + ' человека'}</td>
              <td>{~~(booking.venue.price / booking.attenders) + ',00 р.'}</td>
              <td>{~~(booking.venue.price - ~~(booking.venue.price / booking.attenders)) + ',00 р.'}</td>
              <td><Button
              icon={<Icon>close</Icon>}
              onClick={() => this.props.bookings.splice(i, 1)} 
              className='button red lighten-2' 
              tooltip='Отменить бронь' 
              tooltipOptions={{ position: 'right'}}
              ></Button></td>
            </tr>
            )}
          </tbody>
        </Table>
      </Col>
  )
            }
}