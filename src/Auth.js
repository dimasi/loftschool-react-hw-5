import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {authorizeUser, isAuthorized} from './AuthorizeApi';

import './Auth.css';

class Auth extends Component {
  state = {
    isAuthorized,
    error: false,
    email: '',
    password: ''
  }

  handleChange = e => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const {email, password} = this.state;
    const isAuthorized = authorizeUser(email, password);

    this.setState({
      isAuthorized,
      error: !isAuthorized
    });
  }

  redirectAuthorizedUser = () => {
    if (this.state.isAuthorized) {
      return <Redirect from="/auth" to="/" />;
    }
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <div className="Auth__form-messages">
          <p className="Auth__form-message Auth__form-message_error error">Incorrect e-mail or password</p>
        </div>
      );
    }
  }

  render() {
    const {email, password} = this.state;

    return (
      <div className="Auth">
        {this.redirectAuthorizedUser()}
        <header className="App__page-header">
          <h1 className="App__page-heading">Sign In</h1>
        </header>
        <div className="Auth__form">
          {this.renderError()}
          <div className="Auth__form-row">
            <input 
              className="App__textfield"
              placeholder="E-mail"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="Auth__form-row">
            <input 
              className="App__textfield"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className="Auth__form-row">
            <button 
              className="App__button"
              type="button"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
