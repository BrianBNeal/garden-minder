import React, { Component } from "react"
import { CardText } from "reactstrap"

export default class PlantDetails extends Component {

    render() {

        const plant = this.props.plant

        return (
            <div id="plant-details" >
            <h6>Plant Care:</h6>
                <p>
                    {plant.startIndoors ? "Start indoors" : "Direct sow outdoors"}
                </p>
                <p >
                    {plant.daysUntilHarvest} Days To Maturity
                        </p>
                <p >
                    Plant from {plant.plantingDateStart} until {plant.plantingDateEnd}
                </p>
                <p >
                    Planting depth {plant.plantingDepth}
                </p>
                <p >
                    Spacing {plant.spacing}
                </p>
            </div>
        )
    }
}