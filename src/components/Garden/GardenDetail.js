import React, { Component } from "react"
import PlantCard from "../Plant/PlantCard"

export default class GardenDetail extends Component {
    render() {
        const garden = this.props.gardens.find(garden => garden.id === parseInt(this.props.match.params.gardenId))
        const plants = this.props.gardenPlants.filter(gp => gp.gardenId === garden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                {plants.map(plant =>
                    <PlantCard key={plant.id}
                    history={this.props.history}
                        plant={plant}
                    />
                )}
            </React.Fragment>
        )
    }
}