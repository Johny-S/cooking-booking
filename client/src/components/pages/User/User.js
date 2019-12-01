import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-materialize'
import Bookings from './Bookings'
import UserVenues from './UserVenues'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getVenues } from '../../../actions/venueActions';
import { getReservations } from '../../../actions/reservationActions';

import { findName } from '../../../helpers'

class User extends Component {
  state = {
    bookings: [],
    venues: null
  }
  componentDidMount = async () => {
    this.props.getVenues();
    this.props.getReservations();
    const user = this.props.user
    const reservations = this.props.reservations.filter(item => item.userId === user._id)
    const venues = this.props.venues.filter(venue => {
      return reservations.some(res => res.venueId === venue._id)
    })
    const bookings = reservations.map(el => {
      return {
        ...el,
        date: new Date(el.date),
        venue: findName(venues, el.venueId),
        attenders: Math.floor(Math.random() * (5-2) + 2),
      }
    })
    this.setState({
      bookings
    })

  }
  showBookings() {
    if (this.state.bookings) {
      return <Bookings bookings={this.state.bookings} />
    }
    return (
      <Col s={12}>
        <h4>У вас пока нет ниодоного бронирования</h4>
        <h5>:(</h5>
      </Col>
    )
  }
  isOwner() {
    if (this.state.venues) {
      return <UserVenues venues={this.state.venues} />
    }
    return (
      <Col s={12}>
        <h4>Вы владелец студии?</h4>
        <Link to='../venues/new'><Button>Добавить</Button></Link>
      </Col>
    )
  }
  render() {
    return (
      <Container>
        <Row>
          <Bookings bookings={this.state.bookings} />
        </Row>
        <Row>
          {this.isOwner()}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  reservations: state.reservations.reservations,
  user: state.auth.user,
  venues: state.venues.venues
})

export default connect(mapStateToProps, { getVenues, getReservations })(User);