import GardenDetail from "./Garden/GardenDetail"
import GardenList from "./Garden/GardenList"
import GardenManager from "../modules/GardenManager"
import GardenPlantManager from "../modules/GardenPlantManager"
import PlantManager from "../modules/PlantManager"
import React, { Component } from "react"
import { Route } from "react-router-dom"

export default class ApplicationViews extends Component {
  state = {
    gardens: [],
    gardenPlants: [],
    plants: []
  }

  componentDidMount() {
    const id = parseInt(sessionStorage.getItem("credentials"))
    const newState = {}

    GardenManager.getAll(id).then(gardens => newState.gardens = gardens)
      .then(() => PlantManager.getAll(id)).then(plants => newState.plants = plants)
      .then(() => GardenPlantManager.getAll(id)).then(gardenPlants => newState.gardenPlants = gardenPlants)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>

      <Route exact path="/" render={props => {
        return <GardenList {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          plants={this.state.plants} />
      }}
      />

      <Route path="/gardens/:gardenId(\d+)/" render={props => {
        return <GardenDetail {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          plants={this.state.plants} />
      }}
      />

    </React.Fragment>
  }
}