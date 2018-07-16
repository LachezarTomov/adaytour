import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import FormErrors from '../../components/common/FormErrors';

const DEFAULT_STATE = {
    title: '',
    description: '',
    longDesctiption: '',
    imageUrl: '',
    author: '',
    lon: '',
    lat: '',
    operationType: '',
    formErrors: {
        title: '',
        description: '',
        longDesctiption: '',
        imageUrl: '',
        author: '',
        lon: '',
        lat: ''
    },
    formValid: false
};

export default class NewPlace extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;

        if (this.props.match.params.id) {
            requester.get('appdata', 'places/' + this.props.match.params.id , 'kinvey', this.state)
            .then(res => {
                this.setState({...res});
                this.setState({operationType: 'edit'});
            });
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch(fieldName) {
            case 'title':
                fieldValidationErrors.title = value.length >= 6 ? '' : ' is less than 6 characters';
                break;
            case 'description':
                fieldValidationErrors.description = value.length >= 10 ? '': ' is less than 10 characters';
                break;
            case 'longDesctiption':
                fieldValidationErrors.longDesctiption = value.length >= 30 ? '': ' is less than 30 characters';
                break;
            case 'imageUrl':
                fieldValidationErrors.imageUrl = value.length >= 10 ? '': ' is less than 10 characters';
                break;
            case 'author':
                fieldValidationErrors.author = value.length >= 4 ? '': ' is less than 4 characters';
                break;
            case 'lon':
                fieldValidationErrors.lon = value.length >= 4 && this.isDigits(value) ? '': ' is less than 4 characters or contains letters';
                break;
            case 'lat':
                fieldValidationErrors.lat = value.length >= 4 && this.isDigits(value) ? '': ' is less than 4 characters or contains letters';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors}, this.validateForm);
    }

    isDigits = (s) => {
        const rgx = /^[-0-9]*\.?[0-9]*$/;
        const result = rgx.test(s);

        return result;
    }

    validateForm() {
        this.setState({formValid:
            this.state.formErrors.title.length === 0 &&
            this.state.formErrors.description.length === 0 &&
            this.state.formErrors.longDesctiption.length === 0 &&
            this.state.formErrors.imageUrl.length === 0 &&
            this.state.formErrors.author.length === 0 &&
            this.state.formErrors.lon.length === 0 &&
            this.state.formErrors.lat.length === 0
            ? true : false});
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({[fieldName]: fieldValue}, () => { this.validateField(fieldName, fieldValue) });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        if (this.state.operationType === '') {
            requester.post('appdata', 'places', 'kinvey', this.state)
                .then(res => {
                    observer.trigger(observer.events.notification, {type: 'success', message: 'The new place is added successfully!!!'});
                    this.props.history.push('/');
                })
                .catch(res =>
                    observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
                );
        } else {
            requester.update('appdata', 'places/' + this.props.match.params.id, 'kinvey', this.state)
                .then(res => {
                    observer.trigger(observer.events.notification, {type: 'success', message: 'The place is modified successfully!!!'});
                    this.props.history.push('/');
                })
                .catch(res =>
                    observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
                );
        }
    }

    render = () => {
        const newButton = (<div><input disabled={!this.state.formValid} id="btnRegister" value="Sign Up" className="btn btn-primary" type="submit"/></div>);
        const saveButton = (<div><input disabled={!this.state.formValid} id="btnSave" value="Save" className="btn btn-primary" type="submit"/></div>);
        const newHeader = <h2>New nice place to visit</h2>
        const saveHeader = <h2>Edit a place</h2>
        return (
            <form id="registerForm" onSubmit={this.handleSubmit}>
                {this.state.operationType === '' ? newHeader : saveHeader}

                <div className="panel panel-default alert-danger error-container">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input name="title" type="text" className="form-control" id="title" onChange={this.handleChange}  value={this.state.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description (short):</label>
                    <input name="description" type="text" className="form-control" id="description" onChange={this.handleChange}  value={this.state.description} />
                </div>
                <div className="form-group">
                    <label htmlFor="longDesctiption">Description (long):</label>
                    <textarea className="form-control" name="longDesctiption" id="longDesctiption" rows="3"  onChange={this.handleChange}  value={this.state.longDesctiption} ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input name="imageUrl" type="text" className="form-control" id="imageUrl" onChange={this.handleChange}  value={this.state.imageUrl} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input name="author" type="text" className="form-control" id="author" onChange={this.handleChange}  value={this.state.author} />
                </div>
                <div className="form-group">
                    <label htmlFor="lon">Longitude:</label>
                    <input name="lon" type="text" className="form-control" id="lon" onChange={this.handleChange}  value={this.state.lon} />
                </div>
                <div className="form-group">
                    <label htmlFor="lat">Latitude:</label>
                    <input name="lat" type="text" className="form-control" id="lat" onChange={this.handleChange}  value={this.state.lat} />
                </div>
                {this.state.operationType === 'edit' ? saveButton : newButton  }
            </form>
        )
    }
}