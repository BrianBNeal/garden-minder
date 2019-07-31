import React from "react"
import GardenPlantForm from "./GardenPlantForm"
import GardenNotes from "./GardenNotes"
import PlantList from "../Plant/PlantList"
import { Button } from "reactstrap"
import ReminderList from "../Reminder/ReminderList"
import "./GardenDetail.css"
import moment from "moment"

const GardenDetail = (props) => {

    const { addGardenPlant,
        addPlantNote,
        closeGarden,
        deleteGarden,
        deleteGardenPlant,
        deletePlantNote,
        gardenPlants,
        gardens,
        history,
        location,
        locations,
        plantNotes,
        plants,
        reminders,
        updateGarden,
        updatePlantNote,
        updateReminder }
        = props

    const confirmClose = (garden) => {
        const doubleCheck = window.confirm("Are you sure? This garden will be available in your history but can no longer be edited in any way.")
        if (doubleCheck === true) {
            closeGarden(garden)
                .then(() => history.push("/"))
        }
    }

    const confirmDelete = (gardenId) => {
        const doubleCheck = window.confirm("Are you sure? This will permanently delete this garden and all of its information.")
        if (doubleCheck === true) {
            deleteGarden(gardenId)
            if (location.pathname.includes("history")) {
                history.push("/gardens/history")
            } else {
                history.push("/")
            }
        }
    }

    const thisGarden = gardens.find(
        garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

    const thisLocation = locations.find(location => location.id === thisGarden.locationId)

    const plantsInThisGarden = gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
        .map(gp =>
            plants.find(
                p => p.id === gp.plantId
            ))

    return (
        <div id="garden-detail">
            <section id="garden-detail-title">
                {/* include (CLOSED) with garden name if garden is closed */
                    (location.pathname.includes("history"))
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
                    (location.pathname.includes("history"))
                        ? null
                        : <Button onClick={() => history.push(`/gardens/edit/${thisGarden.id}`)}
                            color="link"
                            size="lg" >
                            edit garden info
                                </Button>
                }

            </section>

            <GardenNotes
                garden={thisGarden}
                updateGarden={updateGarden}
                history={history}
                location={location}
            />

            {/* hide reminders if closed */
                (location.pathname.includes("history"))
                    ? null
                    : <ReminderList
                        garden={thisGarden}
                        reminders={reminders}
                        history={history}
                        updateReminder={updateReminder}
                    />
            }

            <PlantList
                addPlantNote={addPlantNote}
                deleteGardenPlant={deleteGardenPlant}
                deletePlantNote={deletePlantNote}
                garden={thisGarden}
                gardenPlants={gardenPlants}
                history={history}
                location={location}
                plantNotes={plantNotes}
                plants={plantsInThisGarden}
                updatePlantNote={updatePlantNote}
            />

            {/* hide form to add plants if garden is closed */
                (location.pathname.includes("history"))
                    ? null
                    : <section id="garden-plant-form">
                        <GardenPlantForm
                            garden={thisGarden}
                            gardenPlants={gardenPlants}
                            history={history}
                            plants={plants}
                            addGardenPlant={addGardenPlant}
                        />

                    </section>
            }
            <section id="garden-buttons">
                {/* hide close button if garden is already closed */
                    (location.pathname.includes("history"))
                        ? null
                        : <Button onClick={() => confirmClose(thisGarden)}
                            color="warning" >
                            Close Garden
                            </Button>
                }
                <Button onClick={() => confirmDelete(thisGarden.id)}
                    id="garden-delete"
                    color="danger" >
                    Delete Garden
                    </Button>
            </section>

        </div >
    )
}

export default GardenDetail