import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import MapComponent from '../common/MapComponent';

const DEFAULT_STATE = {
    _id: '',
    title: '',
    description: '',
    longDesctiption: '',
    imageUrl: '',
    author: '',
    coordinates: {
        lon: 0,
        lat: 0
    },
    _kmd: {
        ect : 0
    },
    username: '',
    isAdmin: false,
    userId: ''
};

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_STATE;
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            requester.get('appdata', 'places/' + this.props.match.params.id , 'kinvey', this.state)
            .then(res => {
                this.setState({...res});
            })
            .catch(res =>
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
        )}
    }

    dateFormat = (isodate) => {
        const date = new Date(isodate);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return day + '/' + month + '/' + year;
    }

    deletePlace = () => {
        requester.remove('appdata', 'places/' + this.state._id, 'kinvey', this.state)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(res =>
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
            );
    }

    render = () => {
        const buttons = (
            <div className="row controls">
                <Link className="btn btn-info" to={`/newplace/${this.state._id}`} >Edit</Link>
                <button className="btn btn-danger" onClick={this.deletePlace} >Delete</button>
            </div>
        );

        return (
            <div className="container place-details">
                <div className="row">
                    <h1 className="place-title">
                        <Link to="/">{this.state.title}</Link>
                    </h1>
                </div>
                <div className="row">
                    <img className="img-tile" alt={this.state.title} src={this.state.imageUrl} />
                </div>
                <div className="row">
                    <div className="long-desc">
                        {this.state.longDesctiption}
                    </div>
                </div>
                <div className="row">
                    <div className="map">
                        <MapComponent 
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyACteGNsEAWsbCvFgBG47KwQZ97aHcWKw4&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            isMarkerShown={true}
                            lat={this.state.coordinates.lat}
                            lng={this.state.coordinates.lon}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="place-author">
                        Author: {this.state.author}
                    </div>
                </div>
                <div className="row">
                    <div className="place-author">
                        Creation date: {this.dateFormat(this.state._kmd.ect)}
                    </div>
                </div>
                {this.props.location.query.isAdmin || this.props.location.query.showControls ? buttons : ''}
            </div>
        )
    }
}