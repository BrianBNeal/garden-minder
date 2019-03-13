import React, { Component } from "react"

export default class GardenDetail extends Component {
    render() {
        const garden = this.props.gardens.filter(garden => garden.id === this.props.match.params.gardenId)
        const plants = this.props.gardenPlants.filter(gp => gp.gardenId === garden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                "GARDEN DETAIL"
            </React.Fragment>
        )
    }
}