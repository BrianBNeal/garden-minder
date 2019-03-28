import React, { Component } from "react"
import { Input, Label, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

export default class PlantNoteForm extends Component {

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

    createPlantNote = (evt) => {
        if (this.state.note) {
            const newPlantNoteObj = {
                note: this.state.note,
                plantId: this.state.plantId,
                userId: this.state.userId
            }

            this.props.addPlantNote(newPlantNoteObj)
            .then(() => this.props.toggleAddPlantNotes())
        } else {
            window.alert("please provide a note")
        }
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader toggle={this.props.toggleAddPlantNotes}>Make a note about {this.props.plant.name}</ModalHeader>
                <ModalBody>
                        <Label>Note:</Label>
                        <Input onChange={this.handleFieldChange}
                            id="note"
                            type="text"
                            placeholder="type a note here!"
                        ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.createPlantNote}>Add Note</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleAddPlantNotes}>Cancel</Button>
                </ModalFooter>
            </React.Fragment>
        )
    }
}