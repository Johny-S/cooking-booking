import React, { Component, Fragment } from 'react';
import { TextInput, Button, Modal, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  state = {
    isOpen: false
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for registered user
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // close modal if authenticated
    if (this.state.isOpen) {
      if (isAuthenticated) {
        this.toggleModal();
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  toggleModal = e => {
    this.props.clearErrors();
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const user = { email: this.state.email, password: this.state.password };
    this.props.login(user);
  };
  render() {
    return (
      <Fragment>
        <NavItem onClick={this.toggleModal}>
          Войти
        </NavItem>
        <Modal header='Login' open={this.state.isOpen}>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              label='Your email'
              name='email'
              email
              onChange={this.handleChange}
            />
            <TextInput
              label='Your password'
              name='password'
              password
              onChange={this.handleChange}
            />
            <Button>Войти</Button>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
