import {Filters} from './Filters.js';
import {FilterButton} from './FilterButton.js';
import {APP_ALL, APP_ACTIVE, APP_COMPLETED} from './const.js';

import React, {Component} from "react";

export class Footer extends Component {
  render() {
    return (
      <footer>
        <p>{this.props.activeItemCount} {this.props.activeItemCount > 1 ? "items" : "item"} left</p>
        <Filters>
          <FilterButton filterName={APP_ALL} filter={this.props.filter} handleClick={(e) => this.props.handleFilter(APP_ALL, e)}/>
          <FilterButton filterName={APP_ACTIVE} filter={this.props.filter} handleClick={(e) => this.props.handleFilter(APP_ACTIVE, e)}/>
          <FilterButton filterName={APP_COMPLETED} filter={this.props.filter} handleClick={(e) => this.props.handleFilter(APP_COMPLETED, e)}/>
        </Filters>
        {this.props.completedItemCount > 0 && <button id="clear-all" onClick={this.props.clearCompleted} >Clear completed</button>}
      </footer>
    );
  }
}