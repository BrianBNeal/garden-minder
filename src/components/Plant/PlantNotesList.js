import React, { Component } from "react"
import { CardText } from "reactstrap"
import PlatNoteCard from "./PlantNoteCard"

export default class PlantNotesList extends Component {
    render() {
        const activeUserId = parseInt(sessionStorage.getItem("credentials"))
        const plantNotesByThisUser = this.props.plantNotes.filter(pn =>
            (pn.plantId === this.props.plant.id) && (pn.userId === activeUserId)
        )
        return (
            <div id="plant-notes">
                <CardText>Notes:</CardText>
                {!plantNotesByThisUser.length
                    ? <CardText>You have no notes about this plant yet.</CardText>
                    : <PlatNoteCard
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