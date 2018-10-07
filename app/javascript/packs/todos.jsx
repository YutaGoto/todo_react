import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { todoLists: [], value: '' }
    this.fetchState()
  }

  render() {
    return (
      <div>
        <ul className="uk-list">
          { this.listCreator(this.state.todoLists) }
        </ul>
        <div>
          <h3>Todoリストを追加</h3>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input className="uk-input" type="text" value={ this.state.value } onChange={ (e) => this.handleChange(e) } />
            <input className="uk-button uk-button-default" type="submit" value="追加する" />
          </form>
        </div>
        <div>
          <button className="uk-button uk-button-primary" onClick={ (e) => this.ajaxSubmit(e, this.state.todoLists) }>保存</button>
        </div>
      </div>
    )
  }

  listCreator(todoLists) {
    let lists = []

    todoLists.forEach((todo, i, todoLists) => {
      let idName = `todo_input_${i}`

      lists.push(
        <li key={i}>
          <input key={i} type='checkbox' value={todo['title']} id={idName} defaultChecked={todo['checked']} onClick={(e) => this.handleCheck(e, i)} />
          <label key={i + 1} htmlFor={idName}>{todo['title']}</label>
        </li>
      )
    })

    return lists
  }

  handleSubmit(e) {
    e.preventDefault()

    let title = this.state.value

    let todoLists = [
      ...this.state.todoLists,
      {
        title: title,
        checked: false
      }
    ]

    this.setState({ todoLists: todoLists, value: '' })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleCheck(e, i) {
    let stateTodoLists = this.state.todoLists
    let targetTodo = stateTodoLists[i]
    let todoLists = [
      ...stateTodoLists.slice(0, i),
      Object.assign({}, targetTodo, {
        checked: !targetTodo.checked
      }),
      ...stateTodoLists.slice(i + 1)
    ]

    this.setState({ todoLists: todoLists })
  }

  ajaxSubmit(e, todoLists) {
    axios.post('/todos', {
      todo_lists: todoLists
    }).then(function() {
      location.href = "/todos/list"
    })
  }

  fetchState() {
    let t = this
    axios.get("/todos/fetch", {}).then(function(response) {
      t.setState({ todoLists: response.data })
    })
  }
}

render(
  <App />,
  document.getElementById('container')
)
