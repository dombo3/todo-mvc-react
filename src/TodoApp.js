import {Item} from './Item.js';
import {TodoItem} from './TodoItem.js';
import {Footer} from './Footer.js';
import React, {Component} from "react";

import {APP_ALL, APP_ACTIVE, APP_COMPLETED} from './const.js';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: '',
      filter: APP_ALL
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => {
      const items = state.items.slice();
      items.push(new TodoItem(state.input))
      return {
        items: items,
        input: '',
      }
    });
  }

  handleFilter(filter) {
    this.setState({
      filter: filter,
    })
  }

  handleEdit(item) {
    const items = this.state.items.slice();
    items.forEach(item => item.isEditable = false);
    item.isEditable = true;
    // explain i === item
    // console.log(items.find(i => i === item));
    items[items.indexOf(item)] = item;
    this.setState({
      items: items
    })
  }

  handleToggle(item) {
    const items = this.state.items.slice();
    // const currentItem = items.find(item => item._id === id);
    const index = items.indexOf(item);
    item.isCompleted = !item.isCompleted;
    items[index] = item;
    
    const toggleAll = document.querySelector("#toggle-all")
    toggleAll.checked = !items.find(item => !item.isCompleted);

    this.setState({
      items: items
    })
  }

  handleSave(item) {
    const items = this.state.items.slice();
    item.isEditable = false;
    items[items.indexOf(item)] = item;
    this.setState({
      items: items
    })
  }

  handleDelete(item) {
    const items = this.state.items.slice();
    const index = items.indexOf(item);
    items.splice(index, 1);
    this.setState({
      items: items
    })
  }

  clearCompleted() {
    const items = this.state.items.slice();
    const activeItems = items.filter(item => !item.isCompleted);
    this.setState({
      items: activeItems,
    })
  }

  toggleAll(event) {
    const items = this.state.items.slice();
    items.forEach(item => item.isCompleted = event.target.checked);
    this.setState({
      items: items,
    })
  }

  render() {
    let items = this.state.items;

    items.forEach(item => {
      if (item.name === "") {
        this.handleDelete(item);
      };
    })

    if (this.state.filter === APP_ACTIVE) {
      items = items.filter(item => !item.isCompleted);
    } else if (this.state.filter === APP_COMPLETED) {
      items = items.filter(item => item.isCompleted)
    }

    let activeItemCount = items.filter(item => !item.isCompleted).length
    let completedItemCount = items.filter(item => item.isCompleted).length

    items = items.map((item) =>
      <Item
        key={item._id}
        item={item}
        onToggle={this.handleToggle}
        onEdit={this.handleEdit}
        onSave={this.handleSave}
        onDelete={this.handleDelete}
      />
    );

    return (
      <main id="main">
        <h1 className="header">todos</h1>
        <section id="todo-box">
          <form
            onSubmit={this.handleSubmit}
            id="input-form"
          >
            <input
              id="input-bar"
              onChange={this.handleChange}
              value={this.state.input}
              type="text"
              placeholder="What needs to be done?"
            />
          </form>
          {this.state.items.length === 0
            ? null
            : <section id="todo-list-box">
              <input id="toggle-all" className="toggle-all" type="checkbox" onClick={this.toggleAll.bind(this)}></input>
              <label htmlFor="toggle-all"></label>
              <ul id="todo-list">{items}</ul>
              <Footer 
                filter={this.state.filter}
                activeItemCount = {activeItemCount}
                completedItemCount = {completedItemCount}
                handleFilter={this.handleFilter}
                clearCompleted={this.clearCompleted}
              />
            </section>
          }
        </section>
      </main>
    );
  }
}