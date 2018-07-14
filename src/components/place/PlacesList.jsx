import React, { Component } from 'react';
import RowGrid from './RowGrid';


import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';


export default class PlacesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: []
        }
    }

    splitArray = (input, spacing) => {
        let output = [];

        for (let i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }

        return output;
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

    getPlaces = () => requester.get('appdata', 'places?query={}&fields=title,_id,description,imageUrl', 'kinvey')
        .then(res => {
            this.setState({places: res});
        });

    componentDidMount = () => {
        if (this.props.userId === '' && !sessionStorage.getItem('loggedasguest')) {
            this.loginAsGuest();
            sessionStorage.setItem('loggedinasguest', true);
        } else {
            this.getPlaces();
        }
    }

    render = () => {
        let partArray = this.splitArray(this.state.places, 3);

        return (
            <div className="container">
                {/* {this.state.places.map((p, index) => {
                    const showControls = this.props.userId === p._acl.creator;

                    return (
                        <RowGrid {...p} showControls={showControls} isAdmin={this.props.isAdmin} />
                    );
                })} */
                partArray.map((r, index) => 
                    <RowGrid key={index} items={r} userId={this.props.userId} isAdmin={this.props.isAdmin} />
                )
            }


            </div>

        )
    }
}