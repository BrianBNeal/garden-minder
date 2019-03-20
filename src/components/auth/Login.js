import React, { Component } from "react"
import "./login.css"
import { Button } from "reactstrap"
import DataManager from "../../modules/DataManager"


export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    username: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  handleRegister = e => {
    e.preventDefault()
    const newUserObj = {
      username: this.state.username,
      password: this.state.password
    }
    if (this.state.username && this.state.password) {
      DataManager.searchUsername(this.state.username).then(users => {
        if (users.length) {
          alert(`Username ${this.state.username} already exits!`)
        } else {
          DataManager.add("users", newUserObj).then(user => {
            sessionStorage.setItem("credentials", parseInt(user.id))
            this.props.setAuth()
          })
        }
      })
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.username && this.state.password) {
      DataManager.searchUP(this.state.username, this.state.password).then(
        user => {
          if (!user.length) {
            alert("Wrong username or password!")
          } else {
            sessionStorage.setItem("credentials", parseInt(user[0].id))
            this.props.setAuth()
          }
        }
      )
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  render() {
    return (
      <form className="loginForm">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername">Username</label>
        <input
          onChange={this.handleFieldChange}
          type="username"
          id="username"
          placeholder={` Something Cool`}
          required=""
          autoFocus=""
        />
        <label htmlFor="inputPassword">Password</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder={` Don't tell!`}
          required=""
        />
        <Button color="primary" type="submit" onClick={this.handleLogin}>
          Sign in
        </Button>
        <Button color="warning" type="submit" onClick={this.handleRegister}>
          Register
        </Button>
      </form>
    )
  }
}
