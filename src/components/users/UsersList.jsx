import React, { Component } from 'react';

import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

     getUsers = () => requester.get('user', '', 'kinvey')
        .then(res => {
            // filter admin and dummy users
            res = res.filter(function(user) {
                return user._id !== '5b40de5c0beb7505a63a4853' &&
                user._id !== '5b40e1021454032e72885902';
            });

            // check for disabled users
            res = res.filter(function(user){
                return (!('status' in user._kmd)) || (
                    ('status' in user._kmd) &&
                    ('val' in user._kmd.status) &&
                    user._kmd.status.val !== 'disabled'
                );
            });

            this.setState({users: res});
        })
        .catch(res =>
            observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
        );

    componentDidMount = () => {
        this.getUsers();
    }

    deleteUser = (id) => {
        requester.remove('user', id, 'kinvey')
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: 'The user was removed!'});
                this.props.history.push('/users');
            })
            .catch(res =>
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description})
            );
    }

    render = () => {
        return (
            <div className="container users-list">
                <h2>Users list</h2>
                {
                    this.state.users.map(u => {
                        return (
                        <div className="row" key={u._id}>
                            <div className="col">{u.username} </div>
                            <div className="col"><button className="btn btn-danger" onClick={() => this.deleteUser(u._id)} >Delete</button></div>
                        </div>
                        )
                    }
                )}
            </div>
        )
    }
}