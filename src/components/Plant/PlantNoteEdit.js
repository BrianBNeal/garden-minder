import React, { Component } from "react"
import { Input, Label, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import DataManager from "../../modules/DataManager";

export default class PlantNoteEdit extends Component {

    state = {
        note: "",
        plantId: this.props.plant.id,
        userId: parseInt(sessionStorage.getItem("credentials")),
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingPlantNote = (evt) => {
        if (this.state.note) {
            const editedPlantNoteObj = {
                note: this.state.note,
                plantId: this.state.plantId,
                userId: this.state.userId
            }

            this.props.addPlantNote(editedPlantNoteObj)
            .then(() => this.props.toggleAddPlantNotes())
        } else {
            window.alert("please provide a note")
        }
    }

    componentDidMount() {
        DataManager.get("plantNotes", this.props.match.params.plantNoteId)
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader toggle={this.props.toggleAddPlantNotes}>Make a note about {this.props.plantName}</ModalHeader>
                <ModalBody>
                        <Label>Note about this plant:</Label>
                        <Input onChange={this.handleFieldChange}
                            id="note"
                            type="text"
                            placeholder="type a note here!"
                        ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateExistingPlantNote}>Update Note</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleAddPlantNotes}>Cancel</Button>
                </ModalFooter>
            </React.Fragment>
        )
    }
}