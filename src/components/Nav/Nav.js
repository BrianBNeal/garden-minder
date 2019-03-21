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
        <Navbar color="light" light expand="md" fixed="top">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link light to="/">Garden Minder</Link>
            </NavItem>
            <NavItem>
              <Link to="/gardens/new">Create a Garden</Link>
            </NavItem>
            <NavItem>
              <Link to="/gardens/history">Past Gardens</Link>
            </NavItem>
          </Nav>
          <Nav className="" navbar>
            <NavItem>
              <NavbarBrand >
                Welcome, {this.props.activeUser.username}!
              </NavbarBrand>
            </NavItem>
            <NavItem className="logout-div">
              <Button onClick={this.logout}
                outline color="primary"
                type="button"
                className="btn btn-outline-info" >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </React.Fragment>
    )
  }
}