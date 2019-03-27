import React, { Component } from "react"
import PlantCard from "./PlantCard"

export default class PlantList extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Plants in this garden:</div>
                {this.props.plants.map(plant =>
                    <PlantCard key={plant.id}
                        addPlantNote={this.props.addPlantNote}
                        deleteGardenPlant={this.props.deleteGardenPlant}
                        deletePlantNote={this.props.deletePlantNote}
                        garden={this.props.garden}
                        gardenPlants={this.props.gardenPlants}
                        history={this.props.history}
                        plant={plant}
                        plantNotes={this.props.plantNotes   }
                    />
                )}
            </React.Fragment>
        )
    }
}