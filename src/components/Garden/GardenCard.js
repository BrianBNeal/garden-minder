import React, { Component } from "react"
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import moment from "moment"

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
                        <CardBody>
                            <CardTitle>{garden.name}</CardTitle>
                            <CardSubtitle>
                                Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                                {/*if the garden is closed, also show the closed date */}
                                {(garden.dateClosed !== "") ?
                                    <span> & Closed on {moment(garden.dateClosed).format("MMMM DD, YYYY")}</span>
                                    : null}
                            </CardSubtitle>

                            {/* List the number of plants in this garden */}
                            {plants.length === 1
                                ? <CardText>{plants.length} plant</CardText>
                                : plants.length > 1
                                    ? <CardText>{plants.length} plants</CardText>
                                    : <CardText>There are no plants in this garden!</CardText>}

                            {/* List the number of reminders in this garden */}
                            {reminders.length === 1
                                ? <CardText>{reminders.length} reminder</CardText>
                                : reminders.length > 1
                                    ? <CardText>{reminders.length} reminders</CardText>
                                    : <CardText>There are no reminders for this garden.</CardText>}
                            {}
                            <pre className="card-notes">{garden.notes}</pre>
                        </CardBody>
                    </Card>
                    : null
                }
                {(this.props.location.pathname === "/gardens/history")
                    ? <Card onClick={() => this.props.history.push(`/gardens/history/${garden.id}`)}>
                        <CardBody>
                            <CardTitle>{garden.name}</CardTitle>
                            <CardSubtitle>
                                Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                                {/*if the garden is closed, also show the closed date */}
                                {(garden.dateClosed !== "") ?
                                    <span> & Closed on {moment(garden.dateClosed).format("MMMM DD, YYYY")}</span>
                                    : null}
                            </CardSubtitle>

                            {/* List the number of plants in this garden */}
                            {plants.length === 1
                                ? <CardText>{plants.length} plant</CardText>
                                : plants.length > 1
                                    ? <CardText>{plants.length} plants</CardText>
                                    : <CardText>There are no plants in this garden!</CardText>}

                            {/* List the number of reminders in this garden */}
                            {reminders.length === 1
                                ? <CardText>{reminders.length} reminder</CardText>
                                : reminders.length > 1
                                    ? <CardText>{reminders.length} reminders</CardText>
                                    : <CardText>There are no reminders for this garden.</CardText>}
                            {}
                            <pre className="card-notes">{garden.notes}</pre>
                        </CardBody>
                    </Card>
                    : null
                }

            </React.Fragment>
        )
    }
}