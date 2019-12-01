import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/pages/Home';
import Header from './components/Header';
import AddVenue from './components/Venue/AddVenue';
import Venue from './components/Venue/Venue'
import User from './components/pages/User/User'
import { loadUser } from './actions/authActions';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className='App'>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/venues/new' component={AddVenue} />
            <Route path='/venues/:id' component={Venue}/>
            <Route path='/users/:id' component={User} />
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}
