import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import observer from '../../infrastructure/observer';
import requester from '../../infrastructure/requester';

const DEFAULT_STATE = {
    username: '',
    isAdmin: false,
    userId: ''
};

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = (data) => this.setState({...data});

    logout = () => {
        observer.trigger(observer.events.loginUser, DEFAULT_STATE);

        requester.post('user', '_logout', 'kinvey')
            .then(res => sessionStorage.removeItem('authtoken'))
            .catch(res => console.log(res));
    }

    render = () => {
        const loggedInSection = (
            <li className="nav-item"><span>Hello, {this.state.username} |
                {/* <NavLink to="/logout">Logout</NavLink> */}
                <Link to="/" onClick={this.logout}>Logout</Link>
                </span>
            </li>
        );

        const signInSection = (
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
            </li>
        );

        const addNewPlace = (
            <li className="nav-item">
                <NavLink className="nav-link" to="/newplace" >Add new place</NavLink>
            </li>
        );

        const login = (
            <li className="nav-item">
                <NavLink className="nav-link" to="/login" >Login</NavLink>
            </li>
        )

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="/">A Day Tour</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                        </li>
                        
                        {this.state.username !== '' ? addNewPlace : ''}
                       
                    </ul>
                    <ul className="navbar-nav">
                    {this.state.username !== '' ? '' : login}
                    {this.state.username !== '' ? loggedInSection : signInSection}

                    </ul>
                </div>
            </nav>
        );
    }
}