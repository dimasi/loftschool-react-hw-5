import React, {Component} from 'react';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom';
import Private from './Private';
import Home from './Home';
import Auth from './Auth';
import Public from './Public';

import './App.css';

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  }

  render() {
    let {isAuthorized} = this.state;

    return (
      <div className="App">
        <nav className="App__nav">
          <NavLink 
            to="/" 
            className="App__nav-link" 
            activeClassName="App__nav-link_active"
            exact 
          >
            Home
          </NavLink>
          <NavLink 
            to="/public" 
            className="App__nav-link" 
            activeClassName="App__nav-link_active"
          >
            Public
          </NavLink>
          <NavLink 
            to="/auth" 
            className="App__nav-link" 
            activeClassName="App__nav-link_active"
          >
            Sign in
          </NavLink>
          <NavLink 
            to="/private" 
            className="App__nav-link" 
            activeClassName="App__nav-link_active"
          >
            Private
          </NavLink>
        </nav>
        <Switch>
          <Route 
            path="/" 
            component={Home} 
            exact 
          />
          <Route 
            path="/public" 
            component={Public} 
          />
          <Route 
            path="/auth" 
            component={Auth} 
          />
          {isAuthorized ? (
            <Route 
              path="/private" 
              component={Private} 
            />
          ) : (
            <Redirect 
              from="/private" 
              to="/auth" 
            />
          )}
          <Redirect 
            from="*" 
            to="/" 
          />
        </Switch>
      </div>
    );
  }
}

export default App;
