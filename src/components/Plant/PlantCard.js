import React, { Component } from "react"
import { Button, Card, CardBody, CardFooter, CardTitle, Modal } from 'reactstrap'
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
        this.setState({modal: !this.state.modal})
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
                <Card >
                    <CardBody>
                        <CardTitle>
                            {plant.name}
                            <Button onClick={this.toggleAddPlantNotes}
                                color="link">
                                add note
                            </Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggleAddPlantNotes} >
                                <PlantNoteForm
                                    toggleAddPlantNotes={this.toggleAddPlantNotes}
                                    addPlantNote={this.props.addPlantNote}
                                    plant={plant} />

                            </Modal>
                        </CardTitle>

                        {/* details about plant growth and care */}
                        <PlantDetails
                            plant={this.props.plant}
                        />

                        {/* notes about that plant created by user */}
                        <PlantNotesList
                            deletePlantNote={this.props.deletePlantNote}
                            updatePlantNote={this.props.updatePlantNote}
                            plant={this.props.plant}
                            plantNotes={this.props.plantNotes}
                        />

                    </CardBody>

                    {/* hidden footer with buttons */}
                    {(this.state.showPlantOptions)
                        ? <React.Fragment>
                            <Button onClick={this.togglePlantOptions}
                                color="link"
                                size="sm" >
                                hide options
                            </Button>
                            <CardFooter>
                                <Button
                                    className="remove-button"
                                    color="primary"
                                    size="sm" >
                                    add a note
                                </Button>
                                <Button onClick={() => this.props.history.push(`/plants/edit/${thisGardenPlant.id}`)}
                                    className="remove-button"
                                    color="primary"
                                    size="sm" >
                                    edit plant information
                                </Button>
                                <Button onClick={(event) => this.remove(event, thisGardenPlant)}
                                    className="remove-button"
                                    color="danger"
                                    size="sm" >
                                    remove from garden
                            </Button>
                            </CardFooter>
                        </React.Fragment>
                        : <Button onClick={this.togglePlantOptions}
                            color="link"
                            size="sm" >
                            show options
                        </Button>
                    }

                </Card>
            </React.Fragment>
        )
    }
}