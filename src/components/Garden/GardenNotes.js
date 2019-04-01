import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import DataManager from "../../modules/DataManager"

export default class GardenNotes extends Component {

    state = {
        editNotesMode: false,
        gardenNotes: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //function to go into edit mode for notes on the garden
    toggleEditNotesMode = () => {
        this.setState({ editNotesMode: !this.state.editNotesMode })
    }

    //function to apply updated notes to garden
    updateNotes = (thisGarden) => {
        this.setState({ editNotesMode: !this.state.editNotesMode })
        thisGarden.notes = this.state.gardenNotes
        this.props.updateGarden(thisGarden)
    }

    componentDidMount() {
        DataManager.get("gardens", this.props.garden.id)
            .then(garden => {
                this.setState({ gardenNotes: garden.notes })
            })
    }

    render() {


        return (
            <section id="garden-notes">
                <div>Garden Notes:</div>
                {//if in editNotes mode, show the textarea input, otherwise just show the notes
                    this.state.editNotesMode
                        ? <React.Fragment>
                            <Form id="garden-notes-form">
                                <FormGroup>
                                    <Label for="gardenNotes">Notes</Label>
                                    <Input onChange={this.handleFieldChange}
                                        type="textarea"
                                        name="gardenNotes"
                                        id="gardenNotes"
                                        value={this.state.gardenNotes} />
                                </FormGroup>
                            </Form>
                            <Button onClick={() => this.updateNotes(this.props.garden)}
                                color="secondary"
                                 >
                                Done
                                </Button>
                        </React.Fragment>
                        : <React.Fragment>
                            <pre>{this.props.garden.notes}</pre>
                            {(this.props.location.pathname.includes("history"))
                                ? null
                                : this.props.hasOwnProperty("updateGarden")
                                ? <Button onClick={this.toggleEditNotesMode}
                                    color="link"
                                     >
                                    edit notes
                                </Button>
                                : null
                            }
                        </React.Fragment>
                }
            </section>
        )
    }
}