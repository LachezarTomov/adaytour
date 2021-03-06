import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import FormErrors from '../../components/common/FormErrors';

const DEFAULT_STATE = {
    username: '',
    password: '',
    formErrors: {
        username: '',
        password: ''
    },
    formValid: false
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch(fieldName) {
          case 'username':
            fieldValidationErrors.username = value.length >= 4 ? '' : ' is less than 4 characters';
            break;
          case 'password':
            fieldValidationErrors.password = value.length >= 4 ? '': ' is less than 4 characters';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.formErrors.username.length === 0 &&
                this.state.formErrors.password.length === 0 ? true : false});
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({[fieldName]: fieldValue}, () => { this.validateField(fieldName, fieldValue) });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        requester.post('user', 'login', 'basic', {
            username: this.state.username,
            password: this.state.password
            })
            .then(res => {
                const roles = res._kmd.roles || [];
                const isAdmin = roles.some(e => e.roleId === '0271d87b-5ae8-4e62-b96d-fdd46230855d');
                const userId = res._id;

                this.setState(DEFAULT_STATE);
                this.props.history.push('/');
                observer.trigger(observer.events.loginUser, {
                    username: res.username,
                    isAdmin: isAdmin,
                    userId: userId
                });

                observer.trigger(observer.events.notification, {type: 'success', message: 'Logged in successfully!!!'});
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.removeItem('loggedinasguest')
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description});
                this.setState(DEFAULT_STATE);
            });

    }

    render = () => {
        return (
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign in</h2>
                <div className="panel panel-default alert-danger error-container">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div htmlFor="username" className="form-group">
                    <label>Username:</label>
                    <input name="username" type="text" id="username"
                        className="form-control"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                </div>
                <div htmlFor="password" className="form-group">
                    <label>Password:</label>
                    <input name="password" type="password" id="password" className="form-control" onChange={this.handleChange} value={this.state.password}/>
                </div>
                <input disabled={!this.state.formValid} id="btnLogin" className="btn btn-primary" value="Sign In" type="submit"/>
            </form>
        )
    }
}