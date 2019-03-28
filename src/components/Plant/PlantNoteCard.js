import React, { Component } from "react"
import { CardText, Button, Modal } from "reactstrap"
import PlantNoteEdit from "./PlantNoteEdit"

export default class PlantNoteCard extends Component {

state = {
    modal: false
}

toggleEditPlantNote = (evt) => {
    this.setState({modal: !this.state.modal})
}

    render() {
        return (
            this.props.plantNotes.map(note =>
                <React.Fragment key={note.id}>
                    <CardText className="card-text">{note.note}</CardText>
                    <Button onClick={this.toggleEditPlantNote}
                        color="link">
                        edit
                    </Button>
                    |
                    <Button onClick={() => this.props.deletePlantNote(note.id)}
                        color="link">
                        delete
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggleEditPlantNote} >
                                <PlantNoteEdit
                                note={note}
                                    toggleEditPlantNote={this.toggleEditPlantNote}
                                    updatePlantNote={this.props.updatePlantNote}
                                    plant={this.props.plant} />

                            </Modal>

                </React.Fragment>
            )
        )
    }
}