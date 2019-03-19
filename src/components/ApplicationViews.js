import GardenCreateForm from "../components/Garden/GardenCreateForm"
import GardenDetail from "./Garden/GardenDetail"
import GardenEditForm from "./Garden/GardenEditForm"
import GardenList from "./Garden/GardenList"
import GardenManager from "../modules/GardenManager"
import GardenPlantManager from "../modules/GardenPlantManager"
import LocationManager from "../modules/LocationManager"
import PlantDetail from "./Plant/PlantDetail"
import PlantManager from "../modules/PlantManager"
import ReminderCreateForm from "../components/Reminder/ReminderCreateForm"
import ReminderEditForm from "../components/Reminder/ReminderEditForm"
import RemindersManager from "../modules/RemindersManager"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import moment from "moment"

export default class ApplicationViews extends Component {

  activeUserId = parseInt(sessionStorage.getItem("credentials"))

  state = {
    gardens: [],
    gardenPlants: [],
    locations: [],
    plants: [],
    reminders: []
  }

  addGarden = (gardenObj) => {
    //array to store the newly created garden's id, because it won't let me store it in a number variable for some reason
    const newId = []
    //add garden to database
    return GardenManager.add(gardenObj)
      //from the response, store the id in the array
      .then(newGarden => newId.push(newGarden.id))
      //refresh state
      .then(() => GardenManager.getAll(this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
      //get the id from the array and send it back to the onClick function to finish the URL reroute
      .then(() => {
        return newId[0]
      })
  }

  addGardenPlant = (gardenPlantObj) => {
    return GardenPlantManager.add(gardenPlantObj)
      .then(() => GardenPlantManager.getAll())
      .then(gardenPlants => this.setState({ gardenPlants: gardenPlants }))
  }

  addLocation = (locationObj) => {
    return LocationManager.add(locationObj)
      .then(() => LocationManager.getAll(this.activeUserId))
      .then(locations => this.setState({ locations: locations }))
  }

  addReminder = (reminderObj) => {
    return RemindersManager.add(reminderObj)
      .then(() => RemindersManager.getAll())
      .then(reminders => this.setState({ reminders: reminders }))
  }

  closeGarden = (gardenObj) => {
    gardenObj.dateClosed = moment().format("YYYY-MM-DD")
    return GardenManager.edit(gardenObj)
      .then(() => GardenManager.getAll(this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  deleteGarden = (gardenId) => {
    return GardenManager.delete(gardenId)
      .then(() => GardenManager.getAll(this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  deleteGardenPlant = (id, event) => {
    return GardenPlantManager.delete(id)
      .then(() => GardenPlantManager.getAll())
      .then(gp => this.setState({ gardenPlants: gp }))
  }

  updateGarden = (gardenObj) => {
    return GardenManager.edit(gardenObj)
      .then(() => GardenManager.getAll(this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  updateReminder = (reminderObj) => {
    return RemindersManager.edit(reminderObj)
      .then(() => RemindersManager.getAll())
      .then(reminders => this.setState({ reminders: reminders }))
  }

  componentDidMount() {

    const newState = {}

    GardenManager.getAll(this.activeUserId)
      .then(gardens => newState.gardens = gardens)
      .then(() => GardenPlantManager.getAll())
      .then(gardenPlants => newState.gardenPlants = gardenPlants)
      .then(() => LocationManager.getAll(this.activeUserId))
      .then(locations => newState.locations = locations)
      .then(() => PlantManager.getAll())
      .then(plants => newState.plants = plants)
      .then(() => RemindersManager.getAll())
      .then(reminders => newState.reminders = reminders)
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

      <Route path="/gardens/history" render={props => {
        return <GardenList {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          plants={this.state.plants} />
      }}
      />

      <Route path="/gardens/:gardenId(\d+)/" render={props => {
        return <GardenDetail {...props}
          addGardenPlant={this.addGardenPlant}
          closeGarden={this.closeGarden}
          deleteGarden={this.deleteGarden}
          deleteGardenPlant={this.deleteGardenPlant}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          locations={this.state.locations}
          plants={this.state.plants}
          reminders={this.state.reminders}
          updateGarden={this.updateGarden}
          updateReminder={this.updateReminder} />
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
          addLocation={this.addLocation}
          locations={this.state.locations}
          addGarden={this.addGarden}
        />
      }}
      />

      {/* this route uses the gardenId to navigate back to GardenDetails */}
      <Route path="/reminders/new/:gardenId(\d+)/" render={props => {
        return <ReminderCreateForm {...props}
          addReminder={this.addReminder}
        />
      }}
      />

      {/* this route uses reminderId for the GET and then reminder.gardenId to navigate back */}
      <Route path="/reminders/edit/:reminderId(\d+)/" render={props => {
        return <ReminderEditForm {...props}
          updateReminder={this.updateReminder}
        />
      }}
      />

      <Route path="/gardens/edit/:gardenId(\d+)/" render={props => {
        return <GardenEditForm {...props}
          addLocation={this.addLocation}
          locations={this.state.locations}
          updateGarden={this.updateGarden}
        />
      }}
      />

    </React.Fragment>
  }
}