import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./nav.css"
import { Button, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap"

export default class MyNavbar extends Component {

  logout = () => {
    sessionStorage.clear("credentials")
    //credentials are cleared so setAuth will reroute to login
    this.props.setAuth()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md" fixed="top">
          <Nav className="nav-links-div mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/">Garden Minder</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/gardens/new">Create a Garden</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/gardens/history">Past Gardens</Link>
            </NavItem>
          </Nav>
          <Nav navbar className="nav-buttons-div">
            <NavItem>
              <NavbarBrand id="welcome-message">
                Welcome, {this.props.activeUser.username}!
              </NavbarBrand>
            </NavItem>
            <NavItem className="logout-div">
              <Button onClick={this.logout}
                id="logout-btn"
                color="secondary"
                type="button"
              >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </React.Fragment>
    )
  }
}