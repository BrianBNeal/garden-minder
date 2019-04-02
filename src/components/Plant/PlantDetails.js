import React, { Component } from "react"
import { CardText } from "reactstrap"

export default class PlantDetails extends Component {

    render() {

        const plant = this.props.plant

        return (
            <div className="plant-details" >
                <p className="plant-care-item">
                    {plant.startIndoors ? "Start indoors" : "Direct sow outdoors"}
                </p>
                <p className="plant-care-item">
                    {plant.daysUntilHarvest} Days To Maturity
                        </p>
                <p className="plant-care-item">
                    Plant from:<br/>
                    {plant.plantingDateStart} until {plant.plantingDateEnd}
                </p>
                <p className="plant-care-item">
                    Planting depth {plant.plantingDepth}
                </p>
                <p className="plant-care-item">
                    Spacing {plant.spacing}
                </p>
                <p className="plant-care-item">
                    Sun Exposure: {plant.sunExposure}
                </p>
            </div>
        )
    }
}