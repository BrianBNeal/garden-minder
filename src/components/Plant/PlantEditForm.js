import React, { Component } from "react"
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap"
import DataManager from "../../modules/DataManager"

export default class PlantEditForm extends Component {

    state = {
        plantName: "",
        startIndoors: "",
        measureUnit: "",
        daysUntilHarvest: "",
        plantingDepth: "",
        spacing: "",
        sunExposure: null,
        plantingDateStart: "",
        plantingDateEnd: "",
        plantId: "",
        gardenId: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editExistingPlant = (evt) => {
        evt.preventDefault();

        //if statement to make sure required fields are filled out

        const editedPlantObj = {
            daysUntilHarvest: this.state.daysUntilHarvest,
            harvestMeasureUnit: this.state.measureUnit,
            name: this.state.plantName,
            plantingDateEnd: this.state.plantingDateEnd,
            plantingDateStart: this.state.plantingDateStart,
            plantingDepth: this.state.plantingDepth,
            spacing: this.state.spacing,
            startIndoors: this.state.startIndoors,
            sunExposure: this.state.sunExposure,
            id: this.state.plantId
        }

        //send back to ApplicationViews for fetch and setState
        this.props.updatePlant(editedPlantObj)
            .then(() => this.props.history.push(`/gardens/${this.state.gardenId}`))
    }

    componentDidMount() {
        DataManager.get("gardenPlants", this.props.match.params.gardenPlantId)
            .then(gp => {

                const thisPlant = this.props.plants.find(plant => plant.id === gp.plantId) || {}

                this.setState({
                    plantName: thisPlant.name,
                    startIndoors: thisPlant.startIndoors,
                    measureUnit: thisPlant.harvestMeasureUnit,
                    daysUntilHarvest: thisPlant.daysUntilHarvest,
                    plantingDepth: thisPlant.plantingDepth,
                    spacing: thisPlant.spacing,
                    sunExposure: thisPlant.sunExposure,
                    plantingDateStart: thisPlant.plantingDateStart,
                    plantingDateEnd: thisPlant.plantingDateEnd,
                    plantId: thisPlant.id,
                    gardenId: gp.gardenId
                })
            })
    }


    render() {
        return (
            <React.Fragment>
                <h1>Edit this plant's information</h1>
                <Form>
                    <Row form>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="plantName">Plant Name</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="text"
                                    name="plantName"
                                    id="plantName"
                                    value={this.state.plantName}
                                    placeholder="e.g. Tomatoes" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="startIndoors">Start Indoors</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="select"
                                    name="startIndoors"
                                    id="startIndoors"
                                    value={this.state.startIndoors} >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="measureUnit">Measure Unit</Label>
                                <Input onChange={this.handleFieldChange}
                                type="text"
                                name="measureUnit"
                                id="measureUnit"
                                value={this.state.measureUnit}
                                placeholder='e.g. "pounds" or "pieces" ' />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="sunExposure">Sun Exposure</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="select"
                                    name="sunExposure"
                                    id="sunExposure"
                                    value={this.state.sunExposure}
                                    placeholder="45" >
                                    <option value="Full Sun">Full Sun</option>
                                    <option value="Partial Sun">Partial Sun</option>
                                    <option value="Partial Shade">Partial Shade</option>
                                    <option value="Full Shade">Full Shade</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="plantingDepth">Planting depth</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="text"
                                    name="plantingDepth"
                                    id="plantingDepth"
                                    value={this.state.plantingDepth}
                                    placeholder='e.g. 1"' />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="spacing">Spacing</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="text"
                                    name="spacing"
                                    id="spacing"
                                    value={this.state.spacing}
                                    placeholder="e.g. 2'" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="plantingDateStart">Start of Planting Season</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="select"
                                    name="plantingDateStart"
                                    id="plantingDateStart"
                                    value={this.state.plantingDateStart} >
                                    <option value="">-Select a month-</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="plantingDateEnd">End of Planting Season</Label>
                                <Input onChange={this.handleFieldChange}
                                    type="select"
                                    name="plantingDateEnd"
                                    id="plantingDateEnd"
                                    value={this.state.plantingDateEnd} >
                                    <option value="">-Select a month-</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="daysUntilHarvest">Days Until Harvest (estimated)</Label>
                                <Input onChange={this.handleFieldChange}
                                type="text"
                                name="daysUntilHarvest"
                                id="daysUntilHarvest"
                                placeholder="e.g. 45" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={this.editExistingPlant} color="primary">Update</Button>
                </Form>
            </React.Fragment>
        )
    }
}