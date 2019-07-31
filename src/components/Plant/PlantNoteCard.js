import React, { Component } from "react"
import { Button, Modal } from "reactstrap"
import PlantNoteEdit from "./PlantNoteEdit"

export default class PlantNoteCard extends Component {

    state = {
        modal: false
    }

    toggleEditPlantNote = (evt) => {
        this.setState({ modal: !this.state.modal })
    }

    render() {
        return (
            this.props.plantNotes.map(note =>
                <React.Fragment key={note.id}>
                    <div className="note-card-text">
                        {note.note}
                        {/* don't show buttons if garden is closed */
                            (this.props.location.pathname.includes("history"))
                                ? null
                                : <div>
                                    <Button onClick={this.toggleEditPlantNote}
                                        color="link">
                                        edit
                            </Button>
                                    |
                            <Button onClick={() => this.props.deletePlantNote(note.id)}
                                        color="link">
                                        delete
                            </Button>
                                </div>
                        }
                    </div>

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