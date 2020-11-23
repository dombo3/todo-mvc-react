import React, {Component} from "react";

export class Filters extends Component {
  render() {
    return <div className="filters">{this.props.children}</div>
  }
}