import React, { Component } from 'react';
import LoginModal from './auth/LoginModal'
import SignupModal from './auth/SignupModal'
import Logout from './auth/Logout'
import { Navbar } from 'react-materialize'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Header extends Component {
  render() {
    return (
      <Navbar 
      brand={<Link className='left brand-logo' to='/' style={{marginLeft: '10px'}}>Cooking Booking <h6 className='right'>агрегатор кулинарных студий в москве</h6></Link>}
      alignLinks='right'>
        {!this.props.user && <LoginModal />}
        {!this.props.user && <SignupModal />}
        {this.props.user && <Link to={`/users/${this.props.user._id}`}>{this.props.user.email}</Link>}
        {/* {this.props.user && <Link to='/venues/new'>Добавить студию</Link>} */}
        {this.props.user && <Logout />}
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps)(Header)