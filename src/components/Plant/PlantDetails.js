import React, { Component } from "react"
import { CardText } from "reactstrap"

export default class PlantDetails extends Component {

    render() {

        const plant = this.props.plant

        return (
            <div id="plant-details" >
                <CardText>
                    {plant.startIndoors ? "Start indoors" : "Direct sow outdoors"}
                </CardText>
                <CardText >
                    {plant.daysUntilHarvest} Days To Maturity
                        </CardText>
                <CardText >
                    Plant from {plant.plantingDateStart} until {plant.plantingDateEnd}
                </CardText>
                <CardText >
                    Planting depth {plant.plantingDepth}
                </CardText>
                <CardText >
                    Spacing {plant.spacing}
                </CardText>
            </div>
        )
    }
}