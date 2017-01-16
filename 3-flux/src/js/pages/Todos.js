import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  createTodo(newTodo) {
    newTodo = {
      id: Date.now(),
      text: this.input.value,
      complete: false
    }
    TodoActions.createTodo(newTodo);
    this.input.value = ''
  }


  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });


    return (

      <div>
        <button class="btn btn-medium btn-success" style={{display: 'inline'}}onClick={this.createTodo.bind(this)}>Create!</button>&nbsp;&nbsp;&nbsp;
        <input type="text" class="form-control" style={{width: '20em', display: 'inline'}} ref={(input) => this.input = input} />&nbsp;&nbsp;&nbsp;
        <button class="btn btn-medium btn-success" onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
