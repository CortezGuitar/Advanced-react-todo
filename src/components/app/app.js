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
    return arr.map(item =>
      item.id === id ? { ...item, [propName]: !item[propName] } : item
    );
  }

  onToggleDone = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    });
  };

  onToggleImportant = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    });
  };

  onItemAdded = label => {
    this.setState(({ items }) => {
      const item = this.createItem(label);
      return { items: [...items, item] };
    });
  };

  onDelete = id => {
    this.setState(({ items }) => ({ items: items.filter(el => el.id !== id) }));
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
