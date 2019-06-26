import React, { Component } from "react"
import GardenPlantForm from "./GardenPlantForm"
import GardenNotes from "./GardenNotes"
import PlantList from "../Plant/PlantList"
import { Button } from "reactstrap"
import ReminderList from "../Reminder/ReminderList"
import "./GardenDetail.css"
import moment from "moment"

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
            if (this.props.location.pathname.includes("history")) {
                this.props.history.push("/gardens/history")
            } else {
                this.props.history.push("/")
            }
        }
    }

    render() {

        const thisGarden = this.props.gardens.find(
            garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

        const thisLocation = this.props.locations.find(location => location.id === thisGarden.locationId)

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <div id="garden-detail">
                <section id="garden-detail-title">
                    {/* include (CLOSED) with garden name if garden is closed */
                        (this.props.location.pathname.includes("history"))
                            ? <React.Fragment>
                                <h1>{thisGarden.name} (CLOSED)</h1>
                                <div>Planted in {thisLocation.name}</div>
                                <div className="garden-detail-dates">Created on {moment(thisGarden.dateCreated).format("MMMM DD, YYYY")} & closed on {moment(thisGarden.dateClosed).format("MMMM DD, YYYY")}</div>
                            </React.Fragment>
                            : <React.Fragment>
                                <h1>{thisGarden.name}</h1>
                                <div>Planted in {thisLocation.name}</div>
                                <div className="garden-detail-dates">Created on {moment(thisGarden.dateCreated).format("MMMM DD, YYYY")}</div>
                            </React.Fragment>
                    }
                    {/* hide edit garden info button if closed */
                        (this.props.location.pathname.includes("history"))
                            ? null
                            : <Button onClick={() => this.props.history.push(`/gardens/edit/${thisGarden.id}`)}
                                color="link"
                                size="lg" >
                                edit garden info
                                </Button>
                    }

                </section>

                <GardenNotes
                    garden={thisGarden}
                    updateGarden={this.props.updateGarden}
                    history={this.props.history}
                    location={this.props.location}
                />

                <ReminderList
                    garden={thisGarden}
                    location={this.props.location}
                    reminders={this.props.reminders}
                    history={this.props.history}
                    updateReminder={this.props.updateReminder}
                />


                <PlantList
                    addPlantNote={this.props.addPlantNote}
                    deleteGardenPlant={this.props.deleteGardenPlant}
                    deletePlantNote={this.props.deletePlantNote}
                    garden={thisGarden}
                    gardenPlants={this.props.gardenPlants}
                    history={this.props.history}
                    location={this.props.location}
                    plantNotes={this.props.plantNotes}
                    plants={plantsInThisGarden}
                    updatePlantNote={this.props.updatePlantNote}
                />

                {/* hide form to add plants if garden is closed */
                    (this.props.location.pathname.includes("history"))
                        ? null
                        : <section id="garden-plant-form">
                            <GardenPlantForm
                                garden={thisGarden}
                                gardenPlants={this.props.gardenPlants}
                                history={this.props.history}
                                plants={this.props.plants}
                                addGardenPlant={this.props.addGardenPlant}
                            />

                        </section>
                }
                <section id="garden-buttons">
                    {/* hide close button if garden is already closed */
                        (this.props.location.pathname.includes("history"))
                            ? null
                            : <Button onClick={() => this.confirmClose(thisGarden)}
                                color="warning" >
                                Close Garden
                            </Button>
                    }
                    <Button onClick={() => this.confirmDelete(thisGarden.id)}
                        id="garden-delete"
                        color="danger" >
                        Delete Garden
                    </Button>
                </section>

            </div >
        )
    }
}