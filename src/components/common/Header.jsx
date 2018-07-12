import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import observer from '../../infrastructure/observer';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = username => this.setState({username});

    render = () => {
        const loggedInSection = (
            <li>Hello, {this.state.username} |
                <NavLink className="nav-link" to="/logout">logout</NavLink>
            </li>
        );

       const signInSection = (
            <li className="profile pull-right">
                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
            </li>
        );

        return (
            <div>
                {this.state.username !== '' ? loggedInSection : signInSection}
                </div>

        );
    }
}