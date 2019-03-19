import React, { Component } from "react"
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import moment from "moment"
import "./GardenCard.css"

export default class GardenCard extends Component {

    componentDidMount() {
        console.log("GardenCard componentDidMount")
    }

    render() {
        console.log("GardenCard render")

        const garden = this.props.garden
        //return only this garden's plants
        const plants = this.props.gardenPlants.filter(gp => gp.gardenId === garden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                <Card onClick={() => this.props.history.push(`/gardens/${garden.id}`)}>
                    <CardBody>
                        <CardTitle>{garden.name}</CardTitle>
                        <CardSubtitle>
                            Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                            {/*if the garden is closed, also show the closed date */}
                            {(garden.dateClosed !== "") ?
                                <span> & Closed on {moment(garden.dateClosed).format("MMMM DD, YYYY")}</span>
                                : null}
                        </CardSubtitle>
                        {plants.map(plant => <CardText key={plant.id}>{plant.name}</CardText>)}
                        <CardText><pre>{garden.notes}</pre></CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}