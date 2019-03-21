import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from "moment"


export default class GardenCreateForm extends Component {

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    state = {
        gardenLocation: "",
        gardenName: "",
        gardenNotes: "",
        createLocationMode: false,
        newLocationName: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createNewLocation = (evt) => {
        evt.preventDefault();
        if (this.state.newLocationName) {
            this.toggleLocationMode()
            const newLocationObj = {
                name: this.state.newLocationName,
                userId: this.activeUserId
            }
            this.props.addLocation(newLocationObj)
        } else {
            window.alert("Please provide a name")
        }
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
                userId: this.activeUserId
            }

            this.props.addGarden(newGardenObject)
                .then(newGardenId => this.props.history.push(`/gardens/${newGardenId}`))
        } else {
            window.alert("Please fill in both the name and location")
        }
    }

    toggleLocationMode = (evt) => {
        this.setState({ createLocationMode: !this.state.createLocationMode })
    }

    render() {
        return (

            <Form>
                <FormGroup>
                    <Label for="gardenName">Garden Name</Label>
                    <Input onChange={this.handleFieldChange} type="text" name="gardenName" id="gardenName" placeholder="Enter a name for this garden" />
                </FormGroup>

                {//conditional for showing input for new location
                    this.state.createLocationMode
                        ? <FormGroup>
                            <Label for="newLocation">Location</Label>
                            <Input onChange={this.handleFieldChange}
                                type="text"
                                name="newLocationName"
                                id="newLocationName"
                                placeholder="Enter the location name"
                                autoFocus />
                            <Button onClick={this.createNewLocation}
                                color="primary"
                                size="sm">
                                Create Location
                            </Button>
                            <Button onClick={this.toggleLocationMode}
                                color="secondary"
                                size="sm">
                                Cancel
                            </Button>
                        </FormGroup>
                        : <FormGroup>
                            <Label for="gardenLocation">
                                Location
                                <Button onClick={this.toggleLocationMode}
                                    size="sm"
                                    color="link">
                                    Create a new location
                                </Button>
                            </Label>
                            <Input onChange={this.handleFieldChange}
                                type="select"
                                name="gardenLocation"
                                id="gardenLocation">
                                <option value="">--Select a location--</option>
                                {this.props.locations.map(location =>
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                )}
                            </Input>
                        </FormGroup>
                }

                <FormGroup>
                    <Label for="gardenNotes">Notes</Label>
                    <Input onChange={this.handleFieldChange} type="textarea" name="gardenNotes" id="gardenNotes" />
                </FormGroup>
                {this.state.createLocationMode === false
                    ? <React.Fragment>
                        <Button onClick={this.createNewGarden}
                            color="primary" >
                            Submit
                        </Button>
                        <Button onClick={() => this.props.history.push("/")}
                            color="secondary" >
                            Cancel
                        </Button>
                    </React.Fragment>
                    : <React.Fragment>
                        <Button onClick={this.createNewGarden}
                            color="primary"
                            disabled >
                            Submit
                        </Button>
                        <Button onClick={() => this.props.history.push("/")}
                            color="secondary"
                            disabled >
                            Cancel
                        </Button>
                    </React.Fragment>
                }

            </Form>
        )
    }
}