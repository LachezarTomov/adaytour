import React, { Component } from 'react';
import Place from '../place/Place';

export default class GridRow extends Component {

    renderItems = (items) => {
        return items.map((p, index) => {
            if (p === '') {
                return (
                    <div key={'e'+index} className="col-md"></div>
                );
            }
            const showControls = this.props.userId === p._acl.creator;
            return (
                <Place key={p._id} {...p} showControls={showControls} isAdmin={this.props.isAdmin}/>
            )
        });
    }

    render = () => {
        const items = this.props.items;
        const arrayLength = items.length;
        if (arrayLength < 3) {
            for (let i = 0; i < (3 - arrayLength); i++) {
                items.push('');
            }
        }

        return (
             <div className="row">
                 { this.renderItems(items) }
             </div>
        )
    }
}