import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import DataManager from "../modules/DataManager"
import MyNavbar from "./Nav/Nav"

export default class UserAccessLayer extends Component {
  state = {
    activeUser: {}
  }

  componentDidMount() {
    DataManager.get("users", this.activeUserId()).then(activeUser =>
      this.setState({ activeUser: activeUser })
    )
  }
  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  render() {
    return (
      <React.Fragment>
        <MyNavbar setAuth={this.props.setAuth} activeUser={this.state.activeUser} />
        <ApplicationViews
          activeUserId={this.activeUserId}
          activeUser={this.state.activeUser}
        />
      </React.Fragment>
    )
  }
}
