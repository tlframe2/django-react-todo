import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import axios from 'axios';
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: [] 
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    axios.post('http://localhost:8000/api/', {...newTodo})
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  remove(id) {
    axios.delete(`http://localhost:8000/api/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // componentDidMount() {
  //   axios.get('http://localhost:8000/api/')
  //     .then(res => this.setState({ todos: res.data }));
  // }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        axios.put(`http://localhost:8000/api/${id}`, {task: updatedTask});
        return { ...todo, task: updatedTask }
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        axios.put(`http://localhost:8000/api/${id}`, {task: todo.task, completed: !todo.completed});
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos })
  }

  render() {
    axios.get('http://localhost:8000/api/')
      .then(res => this.setState({ todos: res.data }));
    const todos = this.state.todos.map(todo => {
      return (
        <Todo 
          key={todo.id} 
          id={todo.id} 
          task={todo.task}
          completed={todo.completed}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      );
    });

    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App.</span>
        </h1>
        <ul>{todos}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    )
  }
}

export default TodoList;