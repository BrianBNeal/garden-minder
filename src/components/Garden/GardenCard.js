import React from "react"
import { Card, CardText } from 'reactstrap'
import moment from "moment"
import GardenNotes from "./GardenNotes";

const GardenCard = (props) => {

    const { garden, plants, gardenPlants, reminders, history, location } = props

    //this garden's plants
    const plantsList = gardenPlants.filter(gp => gp.gardenId === garden.id)
        .map(gp =>
            plants.find(
                p => p.id === gp.plantId
            ))

    //this garden's reminders
    const reminderList = reminders.filter(r => r.gardenId === garden.id)

    return (
        <React.Fragment>

            {/*********   MAIN VIEW   **********/}

            {(location.pathname === "/")
            ? <Card onClick={() => history.push(`/gardens/${garden.id}`)}>
                <div className="garden-card-body">
                    <div className="garden-card-title">{garden.name}</div>
                    <div className="garden-card-created">
                        Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                        {/*if the garden is closed, also show the closed date */}
                        {(garden.dateClosed !== "")
                            ? <span> & Closed on {moment(garden.dateClosed).format("MMMM DD, YYYY")}</span>
                            : null}
                    </div>

                    {/* List the number of plants in this garden */}
                    <section className="garden-card-plants">
                        {plantsList.length === 1
                            ? <CardText>{plantsList.length} plant</CardText>
                            : plantsList.length > 1
                                ? <CardText>{plantsList.length} plants</CardText>
                                : <CardText>There are no plants in this garden!</CardText>}
                    </section>

                    {/* List the number of reminders in this garden */}
                    <section className="garden-card-reminders">
                        {reminderList.length === 1
                            ? <CardText>{reminderList.length} reminder</CardText>
                            : reminderList.length > 1
                                ? <CardText>{reminderList.length} reminders</CardText>
                                : <CardText>There are no reminders for this garden.</CardText>
                        }
                    </section>

                    <GardenNotes
                        location={location}
                        garden={garden} />

                </div>
            </Card>
            : null
        }

            {/*********   HISTORY VIEW   **********/}

            {(location.pathname === "/gardens/history")
                ? <Card onClick={() => history.push(`/gardens/history/${garden.id}`)}>
                    <div className="garden-card-body">
                        <div className="garden-card-title">{garden.name}</div>
                        <div className="garden-card-created">
                            Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                            {/*if the garden is closed, also show the closed date */}
                            {(garden.dateClosed !== "") ?
                                <span> & Closed on {moment(garden.dateClosed).format("MMMM DD, YYYY")}</span>
                                : null}
                        </div>

                        {/* List the number of plants in this garden */}
                        <section className="garden-card-plants">
                            {plantsList.length === 1
                                ? <CardText>{plantsList.length} plant</CardText>
                                : plantsList.length > 1
                                    ? <CardText>{plantsList.length} plants</CardText>
                                    : <CardText>There are no plants in this garden!</CardText>}
                        </section>

                        {/* List the number of reminders in this garden */}
                        <section className="garden-card-reminders">
                            {reminderList.length === 1
                                ? <CardText>{reminderList.length} reminder</CardText>
                                : reminderList.length > 1
                                    ? <CardText>{reminderList.length} reminders</CardText>
                                    : <CardText>There are no reminders for this garden.</CardText>}
                        </section>

                        <GardenNotes
                            location={location}
                            garden={garden} />
                    </div>
                </Card>
                : null
            }

        </React.Fragment>
    )
}

export default GardenCard