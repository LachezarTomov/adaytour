import React, { Component } from 'react';
import Place from './Place';

import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';


export default class PlacesList extends Component {
    constructor(props) {
        super(props);

            this.state = {
                places: []
            }
    }

    loginAsGuest = () => {
        requester.post('user', 'login', 'basic', {username: "test1", password: "test"})
            .then(res => {
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                this.getPlaces();
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description});
            });
    }

    // userLoggedInData = (dat) => {
    //     this.setState({...dat});
    // }

    getPlaces = () => requester.get('appdata', 'places?query={}&fields=title,_id,description,imageUrl', 'kinvey')
        .then(res => {
            this.setState({places: res});
        });

    componentDidMount = () => {
        if (sessionStorage.getItem('authtoken')) {
            this.getPlaces();
        } else {
            this.loginAsGuest();
        }
    }

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    {this.state.places.map(p => {
                        const showControls = this.props.userId === p._acl.creator;
                        return <Place key={p._id} {...p} showControls={showControls} isAdmin={this.props.isAdmin} />
                    }
                    )}
                </div>
            </div>
        )
    }
}