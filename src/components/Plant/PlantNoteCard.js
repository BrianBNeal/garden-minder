import React, { Component } from "react"
import { CardText, Button, Modal } from "reactstrap"
import PlantNoteForm from "reactstrap"

export default class PlantNoteCard extends Component {
    render() {
        return (
            this.props.plantNotes.map(note =>
                <React.Fragment key={note.id}>
                    <CardText className="card-text">{note.note}</CardText>
                    <Button onClick={this.editNote}
                        color="link">
                        edit
                    </Button>
                    |
                    <Button onClick={() => this.props.deletePlantNote(note.id)}
                        color="link">
                        delete
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggleAddPlantNotes} >
                                <PlantNoteForm
                                    toggleAddPlantNotes={this.toggleAddPlantNotes}
                                    addPlantNote={this.props.addPlantNote}
                                    plant={plant} />

                            </Modal>

                </React.Fragment>
            )
        )
    }
}