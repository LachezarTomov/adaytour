import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

const DEFAULT_STATE = {
    title: '',
    description: '',
    longDesctiption: '',
    imageUrl: '',
    author: '',
    coordinates: {
        lon: 0,
        lat: 0
    },
    operationType: ''
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

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({[fieldName]: fieldValue});
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
        const newButton = (<div><input id="btnRegister" value="Sign Up" className="btn btn-primary" type="submit"/></div>);
        const saveButton = (<div><input id="btnSave" value="Save" className="btn btn-primary" type="submit"/></div>);
        const newHeader = <h2>New nice place to visit</h2>
        const saveHeader = <h2>Edit a place</h2>
        return (
            <form id="registerForm" onSubmit={this.handleSubmit}>
                {this.state.operationType === '' ? newHeader : saveHeader}

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
                    <input name="lon" type="text" className="form-control" id="lon" onChange={this.handleChange}  value={this.state.coordinates.lon} />
                </div>
                <div className="form-group">
                    <label htmlFor="lat">Latitude:</label>
                    <input name="lat" type="text" className="form-control" id="lat" onChange={this.handleChange}  value={this.state.coordinates.lat} />
                </div>
                {this.state.operationType === 'edit' ? saveButton : newButton  }
            </form>
        )
    }
}