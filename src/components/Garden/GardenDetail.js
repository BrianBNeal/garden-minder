import React, { Component } from "react"
import PlantCard from "../Plant/PlantCard"
import { Button, InputGroup, Input, InputGroupAddon } from "reactstrap"
import moment from "moment"
import PlantDetail from "../Plant/PlantDetail";

export default class GardenDetail extends Component {

    state = {
        plantSelect: "",
        plantDate: moment().format("YYYY-MM-DD")
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
        const doubleCheck = window.confirm("Are you sure you want to close this garden? You won't be able to reopen it!")
        if (doubleCheck === true) {
            this.props.closeGarden(garden)
                .then(() => this.props.history.push("/"))
        }
    }

    render() {

        const thisGarden = this.props.gardens.find(garden => (garden.id === parseInt(this.props.match.params.gardenId)))

        const plantsInThisGarden = this.props.gardenPlants.filter(gp => gp.gardenId === thisGarden.id)
            .map(gp =>
                this.props.plants.find(
                    p => p.id === gp.plantId
                ))

        return (
            <React.Fragment>
                {/* ====== page title ======= */}
                <h1>{thisGarden.name}</h1>
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


                {plantsInThisGarden.map(plant =>
                    <PlantCard key={plant.id}
                        history={this.props.history}
                        plant={plant}
                    />
                )}
                <Button color="warning" onClick={() => this.confirmClose(thisGarden)}>Close Garden</Button>

            </React.Fragment>
        )
    }
}