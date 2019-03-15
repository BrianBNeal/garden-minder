import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from "moment"


export default class GardenCreateForm extends Component {

    state = {
        gardenLocation: "",
        gardenName: "",
        gardenNotes: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createNewGarden = (evt) => {
        evt.preventDefault();

        if (this.state.gardenName && this.state.gardenLocation) {

            const newGardenObject = {
                dateClosed: "",
                dateCreated: moment().format("YYYY-MM-DD"),
                locationId: parseInt(this.state.gardenLocation),
                name: this.state.gardenName,
                notes: this.state.gardenNotes,
                userId: parseInt(sessionStorage.getItem("credentials"))
            }

            this.props.addGarden(newGardenObject)
                .then(newGardenId => this.props.history.push(`/gardens/${newGardenId}`))
        } else {
            window.alert("Please fill in both the name and location")
        }
    }

    render() {
        return (

            <Form>
                <FormGroup>
                    <Label for="gardenName">Garden Name</Label>
                    <Input onChange={this.handleFieldChange} type="text" name="gardenName" id="gardenName" placeholder="Enter a name for this garden" />
                </FormGroup>
                <FormGroup>
                    <Label for="gardenLocation">Location   <Button color="link">Create a new location</Button></Label>
                    <Input onChange={this.handleFieldChange} type="select" name="gardenLocation" id="gardenLocation">
                        <option value="">--Select a location--</option>
                        {this.props.locations.map(location =>
                            <option key={location.id} value={location.id}>{location.name}</option>
                        )}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="gardenNotes">Notes</Label>
                    <Input onChange={this.handleFieldChange} type="textarea" name="gardenNotes" id="gardenNotes" />
                </FormGroup>
                <Button onClick={this.createNewGarden}>Submit</Button>
            </Form>
        )
    }
}