import React from 'react';
import {  Col, Table, Button } from 'react-materialize'
import { Link } from 'react-router-dom'

export default function(props) {
  return (
    <Col className='s12'>
      <h4>Мои студии</h4>
        <Table>
          <thead>
          <tr>
            <th>Название студии</th>
            <th>Расписание</th>
            <th>Вы заработали</th>
          </tr>
          </thead>
          <tbody>
            {this.props.venues.map(booking => <tr key={booking.venueId}>
              <td><Link to={`/venues/${booking.venueId}`}>{booking.venueName}</Link></td>
              <td>{booking.date.toDateString()}</td>
              <td>{booking.attenders + ' человека'}</td>
              <td>{booking.price / booking.attenders + ' .р'}</td>
              <td>{booking.price - (booking.price / booking.attenders) + ' .р'}</td>
              <td><Button 
              className='green' 
              tooltip='Редактировать информацию' 
              tooltipOptions={{ position: 'right'}}
              >...</Button></td>
            </tr>
            )}
          </tbody>
        </Table>
      </Col>
  )
}