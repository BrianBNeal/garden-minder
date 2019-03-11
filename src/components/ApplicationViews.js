import GardenManager from "../modules/GardenManager"
import GardenList from "./Garden/GardenList";
import React, { Component } from "react"
import { Route } from "react-router-dom"

export default class ApplicationViews extends Component {
  state = {
    gardens: []
  }

  componentDidMount() {
    const newState = {}

    GardenManager.getAll().then(gardens => newState.gardens = gardens)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route path="/" render={props => {
        return <GardenList gardens={this.state.gardens}/>
      }}
      />
    </React.Fragment>
  }
}