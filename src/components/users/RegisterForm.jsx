import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

const DEFAULT_STATE = {
    username: '',
    password: '',
    repeatPass: ''
};

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({[fieldName]: fieldValue});
    }

    handleSubmit = ev => {
        ev.preventDefault();

        requester.post('user', '', 'basic', {
            username: this.state.username,
            password: this.state.password
            })
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username);
                sessionStorage.setItem('authtoken', res._kmd.authtoken);

                observer.trigger(observer.events.notification, {type: 'success', message: 'The new user is added successfully!!!'});
                this.props.history.push('/');
            })
            .catch(res => 
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
            );
    }

    render = () => {
        return (
            <form id="registerForm" onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input name="username" type="text" className="form-control" id="username" onChange={this.handleChange}  value={this.state.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" className="form-control" id="password" onChange={this.handleChange} value={this.state.password} />
                </div>
                <div className="form-group">
                    <label htmlFor="repeatPass">Repeat Password:</label>
                    <input name="repeatPass" type="password" className="form-control" id="repeatPass" onChange={this.handleChange} value={this.state.repeatPass} />
                </div>
                <input id="btnRegister" value="Sign Up" className="btn btn-primary" type="submit"/>
            </form>
            
        )
    }
}