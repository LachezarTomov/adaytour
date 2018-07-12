import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import FormErrors from '../../components/common/FormErrors';

const DEFAULT_STATE = {
    username: '',
    password: '',
    repeatPass: '',
    formErrors: {
        username: '',
        password: '',
        repeatPass: ''
    },
    formValid: false
};

export default class RegisterForm extends Component {
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
            case 'repeatPass':
                fieldValidationErrors.repeatPass = value.length >= 4 ? '': ' is less than 4 characters. ';
                fieldValidationErrors.repeatPass += value === this.state.password ? '': ' is not equal to password field';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors}, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: 
                this.state.formErrors.username.length === 0 &&
                this.state.formErrors.password.length === 0 &&
                this.state.formErrors.repeatPass.length === 0 &&
                this.state.formErrors.password === this.state.formErrors.repeatPass
                ? true : false});
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({[fieldName]: fieldValue}, () => { this.validateField(fieldName, fieldValue) });
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
                <div className="panel panel-default alert-danger error-container">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
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
                <input disabled={!this.state.formValid} id="btnRegister" value="Sign Up" className="btn btn-primary" type="submit"/>
            </form>
            
        )
    }
}