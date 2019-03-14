import GardenDetail from "./Garden/GardenDetail"
import GardenList from "./Garden/GardenList"
import GardenManager from "../modules/GardenManager"
import GardenPlantManager from "../modules/GardenPlantManager"
import PlantDetail from "./Plant/PlantDetail"
import PlantManager from "../modules/PlantManager"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import LocationManager from "../modules/LocationManager";

export default class ApplicationViews extends Component {
  state = {
    gardens: [],
    gardenPlants: [],
    locations: [],
    plants: []
  }

  componentDidMount() {
    const id = parseInt(sessionStorage.getItem("credentials"))
    const newState = {}

    GardenManager.getAll(id).then(gardens => newState.gardens = gardens)
      .then(() => GardenPlantManager.getAll()).then(gardenPlants => newState.gardenPlants = gardenPlants)
      .then(() => LocationManager.getAll(id)).then(locations => newState.locations = locations)
      .then(() => PlantManager.getAll()).then(plants => newState.plants = plants)
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
          locations={this.state.locations}
          plants={this.state.plants} />
      }}
      />

      <Route path="/plants/:plantId(\d+)/" render={props => {
        return <PlantDetail {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          locations={this.state.locations}
          plants={this.state.plants} />
      }}
      />

    </React.Fragment>
  }
}