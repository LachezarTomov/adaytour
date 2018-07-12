import React, { Component } from 'react';
import observer from '../../infrastructure/observer';
// import observer from '../../infrastructure/observer';

//import '../../styles/notifications.css';

const DEFAULT_STATE = {
    message: '',
    success: '',
    error: '',
    loading: ''
}

export default class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_STATE;
        observer.subscribe(observer.events.notification, this.showNotification);
    }

    showNotification = data => {
        const message = data.message;
        const type = data.type;

        this.setState({[type]: type, message: message});
    }

    hideNotification = () => this.setState(DEFAULT_STATE);

    render = () => {
        let notificationId;
        let notificationClass;
        if (this.state.success) {
            notificationId = "infoBox";
            notificationClass = "alert alert-success alert-dismissible fade show";
        } if (this.state.error) {
            notificationId = "errorBox";
            notificationClass = "alert alert-danger alert-dismissible fade show";
        } else if (this.state.loading) {
            notificationId = "loadingBox";
            notificationClass = "alert alert-warning alert-dismissible fade show";
        }

        if (this.state.message) {
            return (
                <div id={notificationId} className={notificationClass}><
                    span>{this.state.message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideNotification}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        } else {
            return '';
        }
    }
}