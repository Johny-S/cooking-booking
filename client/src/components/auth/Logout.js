import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavItem } from 'react-materialize';
import PropTypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <NavItem href='#' onClick={this.props.logout}>
        Logout
      </NavItem>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
