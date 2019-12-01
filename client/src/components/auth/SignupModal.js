import React, { Component, Fragment } from 'react';
import { TextInput, Button, Modal, NavItem } from 'react-materialize'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { signup } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class SignupModal extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  // componentDidUpdate(prevProps) {
  //   const { error, isAuthenticated } = this.props
  //   if (error !== prevProps.error) {
  //     // check for registered user
  //     if (error.id === 'REGISTER_FAIL') {
  //       this.setState({ msg: error.msg.msg })
  //     } else {
  //       this.setState({ msg: null })
  //     }
  //   }
  //   // close modal if authenticated
  //   if (this.state.isOpen) {
  //     if (isAuthenticated) {
  //       this.toggleModal()
  //     }
  //   }
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  toggleModal = (e) => {
    this.props.clearErrors()
    this.setState({ isOpen: !this.state.isOpen })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.password === this.state.confirm) {
      const newUser = { email: this.state.email, password: this.state.password }
      this.props.signup(newUser)
    }
    return this.setState({
      msg: 'Passwords dont match'
    })
  }
  checkPasswords = () => {
    if (this.state.msg) {
      return <p className='red-text'>{this.state.msg}</p>
    }
  }
  render() {
    return (
      <Fragment>
        <NavItem onClick={this.toggleModal}>Регистрация</NavItem>
        <Modal header='Register new user' open={this.state.isOpen}>
          <form onSubmit={this.handleSubmit}>
            <TextInput label='Your email' name='email' email onChange={this.handleChange}/>
            <TextInput label='Your password' name='password' password onChange={this.handleChange} />
            <TextInput label='Confirm password' name='confirm' password onChange={this.handleChange} />
            <Button>Регистрация</Button>
            {this.checkPasswords()}
          </form>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { signup, clearErrors }
)(SignupModal);