import React, { Component } from "react"
import { Button, Modal } from 'reactstrap'
import PlantDetails from "./PlantDetails"
import PlantNoteForm from "./PlantNoteForm"
import PlantNotesList from "./PlantNotesList"

export default class PlantCard extends Component {

    state = {
        showPlantOptions: false,
        modal: false
    }

    remove = (evt, gardenPlant) => {
        evt.stopPropagation()
        this.props.deleteGardenPlant(gardenPlant.id)
    }

    toggleAddPlantNotes = (evt) => {
        this.setState({ modal: !this.state.modal })
    }

    togglePlantOptions = (evt) => {
        evt.stopPropagation()
        this.setState({ showPlantOptions: !this.state.showPlantOptions })
    }

    render() {
        const plant = this.props.plant
        const thisGardenPlant = this.props.gardenPlants.find(gp => gp.plantId === plant.id && gp.gardenId === this.props.garden.id)

        return (
            <React.Fragment>
                <div className="card" >
                    <div className="plant-card-top">
                        <h5 className="plant-card-title">
                            {plant.name}
                            <span>
                            <Button onClick={() => this.props.history.push(`/plants/edit/${thisGardenPlant.id}`)}
                                className="remove-button"
                                color="link" >
                                edit
                            </Button>
                            |
                            <Button onClick={(event) => this.remove(event, thisGardenPlant)}
                                className="remove-button"
                                color="link" >
                                remove
                            </Button>
                            </span>
                            <Modal isOpen={this.state.modal} toggle={this.toggleAddPlantNotes} >
                                <PlantNoteForm
                                    toggleAddPlantNotes={this.toggleAddPlantNotes}
                                    addPlantNote={this.props.addPlantNote}
                                    plant={plant} />

                            </Modal>
                        </h5>
                    </div>

                    <div className="plant-card-content">
                        {/* details about plant growth and care */}
                        <PlantDetails
                            plant={this.props.plant}
                        />

                        {/* notes about that plant created by user */}
                        <PlantNotesList
                            deletePlantNote={this.props.deletePlantNote}
                            plant={this.props.plant}
                            gardenPlant={thisGardenPlant}
                            plantNotes={this.props.plantNotes}
                            toggleAddPlantNotes={this.toggleAddPlantNotes}
                            updatePlantNote={this.props.updatePlantNote}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}