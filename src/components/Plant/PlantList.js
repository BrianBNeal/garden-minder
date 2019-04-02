import React, { Component } from "react"
import PlantCard from "./PlantCard"
import "./PlantCard.css"


export default class PlantList extends Component {
    render() {
        return (
            <section id="garden-plant-list">
                <div>Plants in this garden:</div>
                {this.props.plants.map(plant =>
                    <PlantCard key={plant.id}
                        addPlantNote={this.props.addPlantNote}
                        deleteGardenPlant={this.props.deleteGardenPlant}
                        deletePlantNote={this.props.deletePlantNote}
                        garden={this.props.garden}
                        gardenPlants={this.props.gardenPlants}
                        history={this.props.history}
                        location={this.props.location}
                        plant={plant}
                        plantNotes={this.props.plantNotes}
                        updatePlantNote={this.props.updatePlantNote}
                    />
                )}
            </section>
        )
    }
}