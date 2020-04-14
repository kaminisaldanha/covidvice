import React, { Component } from "react";
import "../css/Image.css";

export default class Image extends Component {
  render() {
    return <img src={this.props.img} className="img" />;
  }
}
