import React, { Component } from "react"
import moment from "moment"
import "./GardenCard.css"

export default class GardenCard extends Component {
    render() {
        const garden = this.props.garden
        //return only this garden's plants
        const plants = this.props.gardenPlants.filter(gp => gp.gardenId === garden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                <section className="card" onClick={() => this.props.history.push(`/gardens/${garden.id}`)}>
                    <h4 className="card-title">{garden.name}</h4>
                    <section className="plant-list">
                        {plants.map(plant => <div key={plant.id}>{plant.name}</div>)}
                        Created on {moment(garden.dateCreated).format("MMMM DD, YYYY")}
                    </section>
                </section>
            </React.Fragment>
        )
    }
}