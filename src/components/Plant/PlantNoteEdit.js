import React, { Component } from "react"
import { Input, Label, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

export default class PlantNoteEdit extends Component {

    state = {
        noteEdit: "",
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editExistingPlantNote = (evt) => {
        if (this.state.noteEdit) {
            const editedPlantNoteObj = {
                note: this.state.noteEdit,
                plantId: this.props.note.plantId,
                userId: this.props.note.userId,
                id: this.props.note.id
            }

            this.props.updatePlantNote(editedPlantNoteObj)
            .then(() => this.props.toggleEditPlantNote())
        } else {
            window.alert("please provide a note")
        }
    }

    componentDidMount () {
        this.setState({noteEdit: this.props.note.note})
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader toggle={this.props.toggleEditPlantNote}>Edit this note about {this.props.plant.name}</ModalHeader>
                <ModalBody>
                        <Label>Note:</Label>
                        <Input onChange={this.handleFieldChange}
                            type="text"
                            id="noteEdit"
                            value={this.state.noteEdit}
                            placeholder="type a note here!"
                        ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.editExistingPlantNote}>Update Note</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleEditPlantNote}>Cancel</Button>
                </ModalFooter>
            </React.Fragment>
        )
    }
}