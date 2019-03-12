import React, { Component } from "react"
import GardenCard from "./GardenCard"

export default class GardenList extends Component {
    render() {
        return (
            <section className="garden-list">
                <h2>My Gardens</h2>
                {this.props.gardens.map(garden => {
                    return <GardenCard key={garden.id}
                        history={this.props.history}
                        garden={garden}
                        gardenPlants={this.props.gardenPlants}
                        plants={this.props.plants} />
                })}
            </section>
        )
    }
}