import React, { Component } from "react"
import GardenCard from "./GardenCard"

export default class GardenList extends Component {

componentDidMount() {
    console.log("GardenList componentDidMount")
}

    render() {
console.log("GardenList render")
        const gardens = this.props.gardens

        return (
            <section className="garden-list">
                <h2>My Gardens</h2>
                {gardens.map(garden => {
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