import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Notification from './components/common/Notification';
import Logout from './components/users/Logout';
import UsersList from './components/users/UsersList';
import RegisterForm from './components/users/RegisterForm';
import LoginForm from './components/users/LoginForm';
import Navigation from './components/common/Navigation';
import Home from './components/Home/Home';
import NewPlace from './components/place/NewPlace';
import Details from './components/place/Details';
import AddPropsToRoute from './components/common/AddPropsToRoute';
import observer from './infrastructure/observer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isAdmin: false,
      userId: ''
    }

    observer.subscribe(observer.events.loginUser, this.userLoggedInData);
  }

  userLoggedInData = (dat) => {
    this.setState({ ...dat });
  }

  render() {
    const passingProps = {
      isAdmin: this.state.isAdmin,
      userId: this.state.userId
    }

    return (
      <main>
        <Navigation />
        <Notification />
        <div className="main">
          <Switch>
            <Route path='/' exact component={AddPropsToRoute(Home, passingProps)}  />
            <Route path='/logout' exact component={Logout} />
            <Route path='/register' exact component={RegisterForm} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/placedetails/:id' exact component={Details} />
            <Route path='/newplace' exact component={NewPlace} />
            <Route path="/newplace/:id" component={NewPlace} />
            <Route path="/users" component={UsersList} />
            {/* <Route path="/removeplace/:id" component={NewPlace} /> */}
          </Switch>
        </div>

      </main>
    );
  }
}

export default App;
