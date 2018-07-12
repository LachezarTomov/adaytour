import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class Logout extends Component {
    logout = () => {
        observer.trigger(observer.events.loginUser, '');
        requester.post('user', '_logout', 'kinvey')
            .then(res => sessionStorage.removeItem('authtoken'))
            .catch(res => console.log(res));
    }

    render = () => {
        this.logout();
        // this.props.history.push('/');
        return <Redirect to="/" />
    }
}