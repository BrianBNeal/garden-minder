import React, { Component } from "react"
import PlantCard from "../Plant/PlantCard"
import { Button, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon } from "reactstrap"
import moment from "moment"
import DataManager from "../../modules/DataManager"
import ReminderList from "../Reminder/ReminderList"
// import PlantDetail from "../Plant/PlantDetail";

export default class GardenDetail extends Component {

    state = {
        plantSelect: "",
        plantDate: moment().format("YYYY-MM-DD"),
        editNotesMode: false,
        gardenNotes: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    addPlantToGarden = evt => {

        const thisGarden = this.props.gardens.find(garden => (garden.id === parseInt(this.props.match.params.gardenId)))

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        //make sure they selected something
        if ((this.state.plantSelect === "") || (this.state.plantDate === "")) {
            return null
        } else {
            //make sure plant isn't already in the garden
            if (plantsInThisGarden.find(plant => plant.id === parseInt(this.state.plantSelect))) {
                window.alert("This plant is already in your garden!")
            } else {
                const newGardenPlant = {
                    gardenId: parseInt(this.props.match.params.gardenId),
                    plantId: parseInt(this.state.plantSelect),
                    plantedWhen: this.state.plantDate
                }
                this.props.addGardenPlant(newGardenPlant)
            }
        }
    }

    confirmClose = (garden) => {
        const doubleCheck = window.confirm("Are you sure? This garden will be available in your history but can no longer be edited in any way.")
        if (doubleCheck === true) {
            this.props.closeGarden(garden)
                .then(() => this.props.history.push("/"))
        }
    }

    confirmDelete = (gardenId) => {
        const doubleCheck = window.confirm("Are you sure? This will permanently delete this garden and all of its information.")
        if (doubleCheck === true) {
            this.props.deleteGarden(gardenId)
                .then(() => this.props.history.push("/"))
        }
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
        DataManager.get("gardens", parseInt(this.props.match.params.gardenId))
            .then(garden => {
                this.setState({ gardenNotes: garden.notes })
            })
    }

    render() {

        const thisGarden = this.props.gardens.find(
            garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        const remindersForThisGarden = this.props.reminders.filter(r => r.gardenId === thisGarden.id)

        return (
            <React.Fragment>
                <section>
                    <h1>{thisGarden.name}</h1>
                    <Button onClick={() => this.props.history.push(`/gardens/edit/${thisGarden.id}`)}
                        color="link"
                        size="sm">
                        edit garden info
                    </Button>
                </section>

                {/* Notes */}
                <section>
                    <div>Garden Notes:</div>
                    {//if in editNotes mode, show the textarea input, otherwise just show the notes
                        this.state.editNotesMode
                            ? <React.Fragment>
                                <Form>
                                    <FormGroup>
                                        <Label for="gardenNotes">Notes</Label>
                                        <Input onChange={this.handleFieldChange}
                                            type="textarea"
                                            name="gardenNotes"
                                            id="gardenNotes"
                                            value={this.state.gardenNotes} />
                                    </FormGroup>
                                </Form>
                                <Button onClick={() => this.updateNotes(thisGarden)}
                                    color="secondary"
                                    size="sm" >
                                    Done
                                </Button>
                            </React.Fragment>
                            : <React.Fragment>
                                <pre>{thisGarden.notes}</pre>
                                <Button onClick={this.toggleEditNotesMode}
                                    color="link"
                                    size="sm" >
                                    edit notes
                                </Button>
                            </React.Fragment>
                    }
                </section>

                {/* Reminders */}
                <section className="gardenReminders">
                    <div>
                        Reminders (check to mark completed)
                        <Button onClick={() => this.props.history.push(`/reminders/new/${thisGarden.id}`)}
                            color="link"
                            size="sm">
                            add reminder
                        </Button>
                    </div>
                    {remindersForThisGarden.map(reminder =>
                        (reminder.completed === false)
                            ? <ReminderList key={reminder.id}
                                updateReminder={this.props.updateReminder}
                                reminder={reminder}
                                history={this.props.history}
                            />
                            : null
                    )}
                </section>

                {/* List of plants in garden */}
                <section className="detailPlantList">
                    <div>Plants in this garden:</div>
                    {plantsInThisGarden.map(plant =>
                        <PlantCard key={plant.id}
                            deleteGardenPlant={this.props.deleteGardenPlant}
                            thisGarden={thisGarden}
                            gardenPlants={this.props.gardenPlants}
                            history={this.props.history}
                            plant={plant}
                        />
                    )}
                </section>

                {/* Add Plant Dropdown Form */}
                <h4>Add a plant to your garden!</h4>
                <h5>Select a plant and the date you want to plant it.</h5>
                <InputGroup id="addNewPlants">
                    <Input onChange={this.handleFieldChange}
                        id="plantSelect"
                        type="select" >
                        <option value="">--Select a plant to add--</option>
                        <option value="new">**Create a new plant**</option>
                        {this.props.plants.map(plant =>
                            <option key={plant.id}
                                value={plant.id}>
                                {plant.name}
                            </option>)}
                    </Input>
                    {this.state.plantSelect === "new"
                        ? <InputGroupAddon addonType="append">
                            <Button onClick={this.props.history.push(`/plants/new/${thisGarden.id}`)}
                                color="success" >
                                Create a New Plant
                            </Button>
                        </InputGroupAddon>
                        : <React.Fragment>
                            <InputGroupAddon addonType="append">
                                <Input onChange={this.handleFieldChange}
                                    id="plantDate"
                                    type="date"
                                    defaultValue={moment().format("YYYY-MM-DD")}
                                />
                            </InputGroupAddon>
                            <InputGroupAddon addonType="append">
                                <Button onClick={this.addPlantToGarden}
                                    color="primary" >
                                    Add Plant to Garden
                            </Button>
                            </InputGroupAddon>
                        </React.Fragment>
                    }
                </InputGroup>




                <Button onClick={() => this.confirmClose(thisGarden)}
                    color="warning" >
                    Close Garden
                </Button>
                <Button onClick={() => this.confirmDelete(thisGarden.id)}
                    color="danger" >
                    Delete Garden
                </Button>

            </React.Fragment>
        )
    }
}