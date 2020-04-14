import React, { Component } from 'react';

export default class Icon extends Component {
    render() {
        return (
            <div className="iconWrapper"><span className="material-icons icon">{this.props.name}</span> <span className="iconData">{this.props.data}</span> </div>
        )
    }
}