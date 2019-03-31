import React, { Component } from "react"
import GardenPlantForm from "./GardenPlantForm"
import GardenNotes from "./GardenNotes"
import PlantList from "../Plant/PlantList"
import { Button } from "reactstrap"
import ReminderList from "../Reminder/ReminderList"
import "./GardenDetail.css"

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
                .then(() => {
                    if (this.props.location.pathname.includes("history")) {
                        this.props.history.push("/gardens/history")
                    } else {
                        this.props.history.push("/")
                    }
                })
        }
    }

        render() {

            const thisGarden = this.props.gardens.find(
                garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

            const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
                .map(gp =>
                    this.props.plants.find(
                        p => p.id === gp.plantId
                    ))

            return (
                <div className="garden-detail">
                    <section>
                        <Button onClick={() => this.props.history.goBack()}
                            color="link">
                            Go Back
                        </Button>
                        {/* include (CLOSED) with garden name if garden is closed */
                            (this.props.location.pathname.includes("history"))
                                ? <h1>{thisGarden.name} (CLOSED)</h1>
                                : <h1>{thisGarden.name}</h1>
                        }
                        {/* hide edit garden info button if closed */
                            (this.props.location.pathname.includes("history"))
                                ? null
                                : <Button onClick={() => this.props.history.push(`/gardens/edit/${thisGarden.id}`)}
                                    color="link"
                                    size="sm">
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

                    {/* hide reminders if closed */
                        (this.props.location.pathname.includes("history"))
                            ? null
                            : <ReminderList
                                garden={thisGarden}
                                reminders={this.props.reminders}
                                history={this.props.history}
                            />
                    }

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

                    {/* hide form to add plants AND button to close garden if closed */
                        (this.props.location.pathname.includes("history"))
                            ? null
                            : <div id="garden-plant-form">
                                <GardenPlantForm
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
                            </div>
                    }
                    <Button onClick={() => this.confirmDelete(thisGarden.id)}
                        color="danger" >
                        Delete Garden
                    </Button>

                </div>
            )
        }
    }