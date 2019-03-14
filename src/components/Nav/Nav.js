import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./nav.css"

export default class Nav extends Component {
  logout = () => {
    sessionStorage.clear("credentials")
    //credentials are cleared so setAuth will reroute to login
    this.props.setAuth()
  }

  render() {
    return (
      <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Garden Minder
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gardens/new">
              Create a Garden
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Past Gardens
            </Link>
          </li>
        </ul>
        <div className="logout-div">
          <div className="nav-link">Welcome, {this.props.activeUser.username}!</div>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={this.logout}>
            Logout
        </button>
        </div>
      </nav>
    )
  }
}