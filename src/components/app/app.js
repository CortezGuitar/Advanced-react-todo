import React, { Component } from 'react';

import Header from '../header';
import ItemAddForm from '../item-add-form';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';

import './app.css';

export default class App extends Component {
  state = {
    items: [
      { id: 1, label: 'Drink Tea', important: false, done: false },
      { id: 2, label: 'Play Football', important: false, done: false },
      { id: 3, label: 'Sing Song', important: false, done: false }
    ],
    filter: 'all',
    search: ''
  };

  maxId = 100;

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      important: false,
      done: false
    };
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...oldItem, [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  }

  // onToggleDone = id => {
  //   console.log('lox');
  //   this.setState(state => {
  //     const items = this.toggleProperty(state.items, id, 'done');
  //     return { items };
  //   });
  // };

  onToggleDone = id => {
    this.setState({
      ...this.state,
      items: this.toggleProperty(this.state.items, id, 'done')
    });
  };

  onToggleImportant = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    });
  };

  onItemAdded = label => {
    this.setState(state => {
      const item = this.createItem(label);
      return { items: [...state.items, item] };
    });
  };

  onDelete = id => {
    this.setState(state => {
      const idx = state.items.findIndex(item => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  };

  onFilterChange = filter => this.setState({ filter });

  onSearchChange = search => this.setState({ search });

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter(item => !item.done);
    } else if (filter === 'done') {
      return items.filter(item => item.done);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const { items, filter, search } = this.state;
    const doneCount = items.filter(item => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(
      this.filterItems(items, filter),
      search
    );

    return (
      <div className="container">
        <Header toDo={toDoCount} done={doneCount} />
        <div className="d-flex mb-3">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <div className="mb-3">
          <TodoList
            items={visibleItems}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
            onDelete={this.onDelete}
          />
        </div>

        <ItemAddForm onItemAdded={this.onItemAdded} />
      </div>
    );
  }
}
