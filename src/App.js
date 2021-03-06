import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import todosList from './todos.json';

class App extends Component {
  state = {
    todos: todosList,
  };

  handleAddTodo = (event) => {
    if (event.key === 'Enter') {
      const newTodo = {
        userId: 1,
        id: Math.random(),
        title: event.target.value,
        completed: false,
      };

      const newTodosArr = this.state.todos.slice();
      newTodosArr.push(newTodo);
      this.setState({
        todos: newTodosArr,
      });
      event.target.value = '';
      // console.log(this.state);
    }
  };

  handleToggleCheckbox = (event, todoId) => {
    const brandNewTodos = this.state.todos.slice();

    const updataNewTodos = brandNewTodos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updataNewTodos });
  };

  handleDeleteTodo = (event, dele) => {
    const todosNew = this.state.todos.filter((todo) => {
      if (todo.id === dele) {
        return false;
      }
      return true;
    });

    this.setState({
      todos: todosNew,
    });
  };

  handleClearAll = () => {
    const deleteTodo = this.state.todos.filter((todo) => {
      if (todo.completed !== false) {
        return false;
      }
      return true;
    });
    this.setState({
      todos: deleteTodo,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              todos={this.state.todos}
              handleToggleCheckbox={this.handleToggleCheckbox}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          )}
        />
        <Route
          path="/active"
          render={() => (
            <TodoList
              todos={this.state.todos.filter(
                (todo) => todo.completed === false
              )}
              handleToggleCheckbox={this.handleToggleCheckbox}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          )}
        />
        <Route
          path="/completed"
          render={() => (
            <TodoList
              todos={this.state.todos.filter((todo) => todo.completed === true)}
              handleToggleCheckbox={this.handleToggleCheckbox}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          )}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {this.state.todos.filter((todo) => !todo.completed).length}
            </strong>{' '}
            item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={(event) =>
              this.props.handleToggleCheckbox(event, this.props.id)
            }
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map((todo) => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              handleToggleCheckbox={this.props.handleToggleCheckbox}
              handleDeleteTodo={(event) =>
                this.props.handleDeleteTodo(event, todo.id)
              }
              key={todo.id}
            />
          ))}
        </ul>
      </section>
    );
  }
}
export default App;
