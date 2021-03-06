import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Place extends Component {

    render = () => {
        return (
            <div key={this.props._id} className="col-md place-container shadow">
                <Link to={{pathname: `/placedetails/${this.props._id}`, query: {showControls: this.props.showControls, isAdmin: this.props.isAdmin}}}>
                    <img className="img-tile" alt={this.props.title} src={this.props.imageUrl} />

                    <h3>{this.props.title}</h3>
                    <div className="short_desc">
                        {this.props.description}
                    </div>
                </Link>
            </div>
        )
    }
}