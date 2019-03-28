import DataManager from "../modules/DataManager"
import GardenCreateForm from "./Garden/GardenCreateForm"
import GardenDetail from "./Garden/GardenDetail"
import GardenEditForm from "./Garden/GardenEditForm"
import GardenList from "./Garden/GardenList"
import PlantCreateForm from "./Plant/PlantCreateForm"
import PlantEditForm from "./Plant/PlantEditForm"
import ReminderCreateForm from "./Reminder/ReminderCreateForm"
import ReminderEditForm from "./Reminder/ReminderEditForm"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import moment from "moment"

export default class ApplicationViews extends Component {

  activeUserId = parseInt(sessionStorage.getItem("credentials"))

  state = {
    gardens: [],
    gardenPlants: [],
    locations: [],
    plantNotes: [],
    plants: [],
    reminders: []
  }

  addGarden = (gardenObj) => {
    //array to store the newly created garden's id, because it won't let me store it in a number variable for some reason
    const newId = []
    //add garden to database
    return DataManager.add("gardens", gardenObj)
      //from the response, store the id in the array
      .then(newGarden => newId.push(newGarden.id))
      //refresh state
      .then(() => DataManager.getAllByUser("gardens", this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
      //get the id from the array and send it back to the onClick function to finish the URL reroute
      .then(() => {
        return newId[0]
      })
  }

  addGardenPlant = (gardenPlantObj) => {
    return DataManager.add("gardenPlants", gardenPlantObj)
      .then(() => DataManager.getAll("gardenPlants"))
      .then(gardenPlants => this.setState({ gardenPlants: gardenPlants }))
  }

  addLocation = (locationObj) => {
    return DataManager.add("locations", locationObj)
      .then(() => DataManager.getAllByUser("locations", this.activeUserId))
      .then(locations => this.setState({ locations: locations }))
  }

  addPlant = (plantObj) => {
    return DataManager.add("plants", plantObj)
      .then(() => DataManager.getAll("plants"))
      .then(plants => this.setState({ plants: plants }))
  }

  addPlantNote = (plantNoteObj) => {
    return DataManager.add("plantNotes", plantNoteObj)
      .then(() => DataManager.getAll("plantNotes"))
      .then(plantNotes => this.setState({ plantNotes: plantNotes }))
  }

  addReminder = (reminderObj) => {
    return DataManager.add("reminders", reminderObj)
      .then(() => DataManager.getAll("reminders"))
      .then(reminders => this.setState({ reminders: reminders }))
  }

  closeGarden = (gardenObj) => {
    gardenObj.dateClosed = moment().format("YYYY-MM-DD")
    return DataManager.edit("gardens", gardenObj)
      .then(() => DataManager.getAllByUser("gardens", this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  deleteGarden = (gardenId) => {
    return DataManager.delete("gardens", gardenId)
      .then(() => DataManager.getAllByUser("gardens", this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  deleteGardenPlant = (id) => {
    return DataManager.delete("gardenPlants", id)
      .then(() => DataManager.getAll("gardenPlants"))
      .then(gp => this.setState({ gardenPlants: gp }))
  }

  deletePlantNote = (id) => {
    return DataManager.delete("plantNotes", id)
      .then(() => DataManager.getAll("plantNotes"))
      .then(plantNotes => this.setState({ plantNotes: plantNotes }))
  }

  updateGarden = (gardenObj) => {
    return DataManager.edit("gardens", gardenObj)
      .then(() => DataManager.getAllByUser("gardens", this.activeUserId))
      .then(gardens => this.setState({ gardens: gardens }))
  }

  updatePlant = (plantObj) => {
    return DataManager.edit("plants", plantObj)
      .then(() => DataManager.getAll("plants"))
      .then(plants => this.setState({ plants: plants }))
  }

  updatePlantNote = (plantNoteObj) => {
    return DataManager.edit("plantNotes", plantNoteObj)
      .then(() => DataManager.getAll("plantNotes"))
      .then(plantNotes => this.setState({ plantNotes: plantNotes }))
  }

  updateReminder = (reminderObj) => {
    return DataManager.edit("reminders", reminderObj)
      .then(() => DataManager.getAll("reminders"))
      .then(reminders => this.setState({ reminders: reminders }))
  }

  componentDidMount() {

    const newState = {}

    DataManager.getAllByUser("gardens", this.activeUserId)
      .then(gardens => newState.gardens = gardens)
      .then(() => DataManager.getAllByUser("locations", this.activeUserId))
      .then(locations => newState.locations = locations)
      .then(() => DataManager.getAll("gardenPlants"))
      .then(gardenPlants => newState.gardenPlants = gardenPlants)
      .then(() => DataManager.getAll("plants"))
      .then(plants => newState.plants = plants)
      .then(() => DataManager.getAll("plantNotes"))
      .then(plantNotes => newState.plantNotes = plantNotes)
      .then(() => DataManager.getAll("reminders"))
      .then(reminders => newState.reminders = reminders)
      .then(() => this.setState(newState))
  }

  render() {

    return <React.Fragment>

      {/* List of open gardens */}
      <Route exact path="/" render={props => {
        return <GardenList {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          plants={this.state.plants}
          reminders={this.state.reminders} />
      }}
      />

      {/* List of closed gardens */}
      <Route exact path="/gardens/history" render={props => {
        return <GardenList {...props}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          plants={this.state.plants}
          reminders={this.state.reminders} />
      }}
      />

      {/* View a single OPEN garden */}
      <Route path="/gardens/:gardenId(\d+)/" render={props => {
        return <GardenDetail {...props}
          addGardenPlant={this.addGardenPlant}
          addPlantNote={this.addPlantNote}
          closeGarden={this.closeGarden}
          deleteGarden={this.deleteGarden}
          deleteGardenPlant={this.deleteGardenPlant}
          deletePlantNote={this.deletePlantNote}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          locations={this.state.locations}
          plantNotes={this.state.plantNotes}
          plants={this.state.plants}
          reminders={this.state.reminders}
          updateGarden={this.updateGarden}
          updatePlantNote={this.updatePlantNote}
          updateReminder={this.updateReminder} />
      }}
      />

      {/* View a single CLOSED garden */}
      <Route path="/gardens/history/:gardenId(\d+)/" render={props => {
        return <GardenDetail {...props}
          addPlantNote={this.addPlantNote}
          deleteGarden={this.deleteGarden}
          deletePlantNote={this.deletePlantNote}
          gardens={this.state.gardens}
          gardenPlants={this.state.gardenPlants}
          locations={this.state.locations}
          plantNotes={this.state.plantNotes}
          plants={this.state.plants}
          reminders={this.state.reminders}
          updatePlantNote={this.updatePlantNote}
        />
      }}
      />

      {/* form for creating a new plant in the database */}
      <Route path="/plants/new/:gardenId(\d+)/" render={props => {
        return <PlantCreateForm {...props}
          addPlant={this.addPlant}
        />
      }}
      />

      {/* form for editing the information on a single plant type in the database.
      Uses gardenPlantId instead of plantId in order to navigate back to the garden
      since it has access to both the gardenId and plantId */}
      <Route path="/plants/edit/:gardenPlantId(\d+)/" render={props => {
        return <PlantEditForm {...props}
          plants={this.state.plants}
          updatePlant={this.updatePlant}
        />
      }}
      />

      {/* form for creating a new garden */}
      <Route path="/gardens/new" render={props => {
        return <GardenCreateForm {...props}
          addLocation={this.addLocation}
          locations={this.state.locations}
          addGarden={this.addGarden}
        />
      }}
      />

      {/* form for creating a new reminder
      this route uses the gardenId to navigate back to GardenDetails */}
      <Route path="/reminders/new/:gardenId(\d+)/" render={props => {
        return <ReminderCreateForm {...props}
          addReminder={this.addReminder}
        />
      }}
      />

      {/* form for editing a reminder
      this route uses reminderId for the GET and then reminder.gardenId to navigate back */}
      <Route path="/reminders/edit/:reminderId(\d+)/" render={props => {
        return <ReminderEditForm {...props}
          updateReminder={this.updateReminder}
        />
      }}
      />

      {/* form for editing the info on a single garden */}
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