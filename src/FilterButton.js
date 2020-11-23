import React, {Component} from "react";

export class FilterButton extends Component {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    let filterName = this.props.filterName;
    return <button 
              id={filterName}
              className={this.props.filter === filterName ? "selected" : undefined} 
              onClick={this.props.handleClick}>
              {this.capitalize(filterName)}
            </button>
  }
}