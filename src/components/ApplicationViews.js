import GardenCreateForm from "../components/Garden/GardenCreateForm"
import GardenDetail from "./Garden/GardenDetail"
import GardenList from "./Garden/GardenList"
import GardenManager from "../modules/GardenManager"
import GardenPlantManager from "../modules/GardenPlantManager"
import LocationManager from "../modules/LocationManager"
import PlantDetail from "./Plant/PlantDetail"
import PlantManager from "../modules/PlantManager"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import moment from "moment"

export default class ApplicationViews extends Component {
  state = {
    gardens: [],
    gardenPlants: [],
    locations: [],
    plants: []
  }

  addGarden = (gardenObj) => {
    //array to store the newly created garden's id, because it won't let me store it in a number variable for some reason
    const newId = []
    //add garden to database
    return GardenManager.add(gardenObj)
      //from the response, store the id in the array
      .then(newGarden => newId.push(newGarden.id))
      //refresh state
      .then(() => GardenManager.getAll(parseInt(sessionStorage.getItem("credentials"))))
      .then(gardens => this.setState({ gardens: gardens }))
      //get the id from the array and send it back to the onClick function to finish the URL reroute
      .then(() => {
        return newId[0]
      })
  }

  closeGarden = (gardenObj) => {
    gardenObj.dateClosed = moment().format("YYYY-MM-DD")
    return GardenManager.edit(gardenObj)
      .then(() => GardenManager.getAll(parseInt(sessionStorage.getItem("credentials"))))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  componentDidMount() {
    const newState = {}
    const activeUserId = parseInt(sessionStorage.getItem("credentials"))

    GardenManager.getAll(activeUserId).then(gardens => newState.gardens = gardens)
      .then(() => GardenPlantManager.getAll()).then(gardenPlants => newState.gardenPlants = gardenPlants)
      .then(() => LocationManager.getAll(activeUserId)).then(locations => newState.locations = locations)
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
          closeGarden={this.closeGarden}
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

      <Route path="/gardens/new" render={props => {
        return <GardenCreateForm {...props}
          locations={this.state.locations}
          addGarden={this.addGarden}
        />
      }}
      />

    </React.Fragment>
  }
}