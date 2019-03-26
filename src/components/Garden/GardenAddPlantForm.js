import React, { Component } from "react"
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap"
import moment from "moment"

export default class GardenAddPlantForm extends Component {

    state = {
        plantSelect: "",
        plantDate: moment().format("YYYY-MM-DD"),
    }

    addPlantToGarden = evt => {

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === this.props.garden.id)
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
                    gardenId: this.props.garden.id,
                    plantId: parseInt(this.state.plantSelect),
                    plantedWhen: this.state.plantDate
                }
                this.props.addGardenPlant(newGardenPlant)
            }
        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    render() {
        return (
            <React.Fragment>
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
                            <Button onClick={() => this.props.history.push(`/plants/new/${this.props.garden.id}`)}
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
            </React.Fragment>
        )
    }
}