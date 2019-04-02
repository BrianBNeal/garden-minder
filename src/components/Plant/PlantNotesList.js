import React, { Component } from "react"
import { CardText, Button } from "reactstrap"
import PlantNoteCard from "./PlantNoteCard"

export default class PlantNotesList extends Component {
    render() {
        const activeUserId = parseInt(sessionStorage.getItem("credentials"))
        const plantNotesByThisUser = this.props.plantNotes.filter(pn =>
            (pn.plantId === this.props.plant.id) && (pn.userId === activeUserId)
        )
        return (
            <div className="plant-notes">
                <CardText>
                    Notes:
                    <Button onClick={this.props.toggleAddPlantNotes}
                        color="link">
                        add note
                    </Button>
                </CardText>
                {!plantNotesByThisUser.length
                    ? <CardText>You have no notes about this plant yet.</CardText>
                    : <PlantNoteCard
                        plantNotes={plantNotesByThisUser}
                        plant={this.props.plant}
                        updatePlantNote={this.props.updatePlantNote}
                        deletePlantNote={this.props.deletePlantNote}
                    />
                }
            </div>
        )
    }
}