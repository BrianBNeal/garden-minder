import React, { Component } from "react"
import GardenAddPlantForm from "./GardenAddPlantForm"
import GardenNotes from "./GardenNotes"
import PlantList from "../Plant/PlantList"
import { Button } from "reactstrap"
import DataManager from "../../modules/DataManager"
import ReminderList from "../Reminder/ReminderList"

export default class GardenDetail extends Component {

    confirmClose = (garden) => {
        const doubleCheck = window.confirm("Are you sure? This garden will be available in your history but can no longer be edited in any way.")
        if (doubleCheck === true) {
            this.props.closeGarden(garden)
                .then(() => this.props.history.push("/"))
        }
    }

    confirmDelete = (gardenId) => {
        const doubleCheck = window.confirm("Are you sure? This will permanently delete this garden and all of its information.")
        if (doubleCheck === true) {
            this.props.deleteGarden(gardenId)
                .then(() => this.props.history.push("/"))
        }
    }

    render() {

        const thisGarden = this.props.gardens.find(
            garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                )) || {}


        return (
            <React.Fragment>
                <section>
                    <h1>{thisGarden.name}</h1>
                    <Button onClick={() => this.props.history.push(`/gardens/edit/${thisGarden.id}`)}
                        color="link"
                        size="sm">
                        edit garden info
                    </Button>
                </section>

                {/* Notes */}
                <GardenNotes
                    garden={thisGarden}
                    updateGarden={this.props.updateGarden}
                />

                <ReminderList
                    garden={thisGarden}
                    reminders={this.props.reminders}
                />

                <PlantList
                    deleteGardenPlant={this.props.deleteGardenPlant}
                    garden={thisGarden}
                    gardenPlants={this.props.gardenPlants}
                    history={this.props.history}
                    plants={plantsInThisGarden}
                    />

                <GardenAddPlantForm
                    garden={thisGarden}
                    gardenPlants={this.props.gardenPlants}
                    history={this.props.history}
                    plants={this.props.plants}
                    addGardenPlant={this.props.addGardenPlant}
                />

                <Button onClick={() => this.confirmClose(thisGarden)}
                    color="warning" >
                    Close Garden
                </Button>
                <Button onClick={() => this.confirmDelete(thisGarden.id)}
                    color="danger" >
                    Delete Garden
                </Button>

            </React.Fragment>
        )
    }
}