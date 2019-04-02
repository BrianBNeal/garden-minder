import React, { Component } from "react"
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import moment from "moment"
import GardenNotes from "./GardenNotes";

export default class GardenCard extends Component {

    render() {
        const garden = this.props.garden

        //this garden's plants
        const plants = this.props.gardenPlants.filter(gp => gp.gardenId === garden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        //this garden's reminders
        const reminders = this.props.reminders.filter(r => r.gardenId === garden.id)

        return (
            <React.Fragment>
                {(this.props.location.pathname === "/")
                    ? <Card onClick={() => this.props.history.push(`/gardens/${garden.id}`)}>
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
                                {plants.length === 1
                                    ? <CardText>{plants.length} plant</CardText>
                                    : plants.length > 1
                                        ? <CardText>{plants.length} plants</CardText>
                                        : <CardText>There are no plants in this garden!</CardText>}
                            </section>

                            {/* List the number of reminders in this garden */}
                            <section className="garden-card-reminders">
                                {reminders.length === 1
                                    ? <CardText>{reminders.length} reminder</CardText>
                                    : reminders.length > 1
                                        ? <CardText>{reminders.length} reminders</CardText>
                                        : <CardText>There are no reminders for this garden.</CardText>
                                }
                            </section>

                            <GardenNotes
                            location={this.props.location}
                            garden={garden} />

                        </div>
                    </Card>
                    : null
                }
                {(this.props.location.pathname === "/gardens/history")
                    ? <Card onClick={() => this.props.history.push(`/gardens/history/${garden.id}`)}>
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
                            {plants.length === 1
                                ? <CardText>{plants.length} plant</CardText>
                                : plants.length > 1
                                    ? <CardText>{plants.length} plants</CardText>
                                    : <CardText>There are no plants in this garden!</CardText>}
                            </section>

                            {/* List the number of reminders in this garden */}
                            <section className="garden-card-reminders">
                            {reminders.length === 1
                                ? <CardText>{reminders.length} reminder</CardText>
                                : reminders.length > 1
                                    ? <CardText>{reminders.length} reminders</CardText>
                                    : <CardText>There are no reminders for this garden.</CardText>}
                            </section>

                            <GardenNotes
                            location={this.props.location}
                            garden={garden} />
                        </div>
                    </Card>
                    : null
                }

            </React.Fragment>
        )
    }
}