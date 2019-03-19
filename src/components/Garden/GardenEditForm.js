import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import GardenManager from "../../modules/GardenManager";

export default class GardenEditForm extends Component {

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    state = {
        dateCreated: "",
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

    toggleLocationMode = (evt) => {
        this.setState({ createLocationMode: !this.state.createLocationMode })
    }

    updateExistingGarden = (evt) => {
        evt.preventDefault();

        if (this.state.gardenName && this.state.gardenLocation) {

            const editedGardenObject = {
                dateClosed: "",
                dateCreated: this.state.dateCreated,
                locationId: parseInt(this.state.gardenLocation),
                name: this.state.gardenName,
                notes: this.state.gardenNotes,
                userId: this.activeUserId,
                id: this.props.match.params.gardenId
            }

            this.props.updateGarden(editedGardenObject)
                .then(() => this.props.history.push(`/gardens/${editedGardenObject.id}`))
        } else {
            window.alert("Please fill in both the name and location")
        }
    }

    componentDidMount() {
        GardenManager.get(this.props.match.params.gardenId)
            .then(garden => {

                this.setState({
                    gardenLocation: garden.locationId,
                    gardenName: garden.name,
                    gardenNotes: garden.notes,
                    dateCreated: garden.dateCreated
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup>
                        <Label for="gardenName">Garden Name</Label>
                        <Input onChange={this.handleFieldChange}
                            type="text"
                            name="gardenName"
                            id="gardenName"
                            value={this.state.gardenName}
                            placeholder="Enter a name for this garden" />
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
                                    Submit
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
                                        color="link"
                                        size="sm">
                                        Create a new location
                                    </Button>
                                </Label>
                                <Input onChange={this.handleFieldChange}
                                    type="select"
                                    name="gardenLocation"
                                    id="gardenLocation"
                                    value={this.state.gardenLocation}>
                                    <option value="">--Select a location--</option>
                                    {this.props.locations.map(location =>
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                    }

                    <FormGroup>
                        <Label for="gardenNotes">Notes</Label>
                        <Input onChange={this.handleFieldChange}
                            type="textarea"
                            name="gardenNotes"
                            id="gardenNotes"
                            value={this.state.gardenNotes} />
                    </FormGroup>
                    <Button onClick={this.updateExistingGarden}
                        color="primary" >
                        Submit
                    </Button>
                    <Button onClick={() => this.props.history.push(`/gardens/${this.props.match.params.gardenId}`)}
                        color="secondary" >
                        Cancel
                    </Button>
                </Form>

            </React.Fragment>
        )
    }
}