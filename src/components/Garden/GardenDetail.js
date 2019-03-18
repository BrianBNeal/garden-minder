import React, { Component } from "react"
import PlantCard from "../Plant/PlantCard"
import { Button, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon } from "reactstrap"
import moment from "moment"
import GardenManager from "../../modules/GardenManager";
// import PlantDetail from "../Plant/PlantDetail";

export default class GardenDetail extends Component {

    state = {
        plantSelect: "",
        plantDate: moment().format("YYYY-MM-DD"),
        editNotes: false,
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

        //check to see if the New Plant form should activate
        if (this.state.plantSelect === "new") {
            console.log("you want to create a new plant in the database")
            //check to make sure all fields are filled
        } else if ((this.state.plantSelect === "") || (this.state.plantDate === "")) {
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
    editNotes = () => {
        this.setState({ editNotes: !this.state.editNotes })
    }

    //function to apply updated notes to garden
    updateNotes = (thisGarden) => {
        this.setState({ editNotes: !this.state.editNotes })
        thisGarden.notes = this.state.gardenNotes
        this.props.updateGarden(thisGarden)
    }

    componentDidMount() {
        GardenManager.get(parseInt(this.props.match.params.gardenId))
            .then(garden => {
                this.setState({ gardenNotes: garden.notes })
            })
    }

    render() {

        const thisGarden = this.props.gardens.find(garden => (garden.id === parseInt(this.props.match.params.gardenId))) || {}

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                <h1>{thisGarden.name}</h1>

                {/* Add Plant Dropdown Form */}
                <h4>Add a plant to your garden!</h4>
                <h5>Select a plant and the date you want to plant it.</h5>
                <InputGroup id="addNewPlants">
                    <Input id="plantSelect" type="select" onChange={this.handleFieldChange} >
                        <option value="">--Select a plant to add--</option>
                        <option value="new">**Create a new plant**</option>
                        {this.props.plants.map(plant => <option key={plant.id} value={plant.id}>{plant.name}</option>)}
                    </Input>
                    <InputGroupAddon addonType="append">
                        <Input id="plantDate" type="date" defaultValue={moment().format("YYYY-MM-DD")} onChange={this.handleFieldChange} />
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.addPlantToGarden}>Add Plant To Garden</Button>
                    </InputGroupAddon>
                </InputGroup>

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

                {/* Notes for this garden */}
                <section>
                    <div>Garden Notes:</div>
                    {//if in editNotes mode, show the textarea input, otherwise just show the notes
                        this.state.editNotes
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
                                <Button color="secondary" size="sm" onClick={() => this.updateNotes(thisGarden)}>Done</Button>
                            </React.Fragment>
                            : <React.Fragment>
                                <div>{thisGarden.notes}</div>
                                <Button color="link" onClick={this.editNotes}>edit</Button>
                            </React.Fragment>
                    }

                </section>


                <Button color="warning" onClick={() => this.confirmClose(thisGarden)}>Close Garden</Button>
                <Button color="danger" onClick={() => this.confirmDelete(thisGarden.id)}>Delete Garden</Button>

            </React.Fragment>
        )
    }
}