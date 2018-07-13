import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Place extends Component {

    render = () => {
        return (
            <div key={this.props._id} className="col-md place-container">
                <Link to={`/placedetails/${this.props._id}`}>
                    <img className="img-tile" alt={this.props.title} src={this.props.imageUrl} />
                </Link>
                <h3><Link to="/">{this.props.title}</Link></h3>
                <div className="short_desc">
                    {this.props.description}
                </div>
                <div className="controls">
                    <Link to={{pathname: `/placedetails/${this.props._id}`, query: {showControls: this.props.showControls, isAdmin: this.props.isAdmin}}}>Details</Link>
                </div>
            </div>
        )
    }
}