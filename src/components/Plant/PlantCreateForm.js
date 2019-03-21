import React, { Component } from "react"
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class PlantCreateForm extends Component {

    state = {
        plantName: "",
        startIndoors: "",
        measureUnit: "",
        daysUntilHarvest: "",
        plantingDepth: "",
        spacing: "",
        sunExposure: "",
        plantingDateStart: "",
        plantingDateEnd: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createNewPlant = (evt) => {
        evt.preventDefault();

        //if statement to make sure required fields are filled out

        const newPlantObj = {
            daysUntilHarvest: this.state.daysUntilHarvest,
            harvestMeasureUnit: this.state.measureUnit,
            name: this.state.plantName,
            plantingDateEnd: this.state.plantingDateEnd,
            plantingDateStart: this.state.plantingDateStart,
            plantingDepth: this.state.plantingDepth,
            spacing: this.state.spacing,
            startIndoors: this.state.startIndoors,
            sunExposure: this.state.sunExposure
        }

        //send back to ApplicationViews for fetch and setState
        this.props.addPlant(newPlantObj)
            .then(() => this.props.history.push(`/gardens/${this.props.match.params.gardenId}`))
    }

    render() {
        return (
            <React.Fragment>
                <h1>Create a new plant in the database</h1>
                <Form>
                    <Row form>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="plantName">Plant Name<span style={{ color: "red", fontWeight: "bolder"}}>*</span></Label>
                                <Input onChange={this.handleFieldChange} type="text" name="plantName" id="plantName" placeholder="San Marzano Tomatoes" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="startIndoors">Start Indoors</Label>
                                <Input onChange={this.handleFieldChange} type="select" name="startIndoors" id="startIndoors" >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="measureUnit">Measure Unit</Label>
                                <Input onChange={this.handleFieldChange} type="text" name="measureUnit" id="measureUnit" placeholder='e.g. "pounds" or "pieces" ' />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="sunExposure">Sun Exposure</Label>
                                <Input onChange={this.handleFieldChange} type="select" name="sunExposure" id="sunExposure" placeholder="45">
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
                                <Input onChange={this.handleFieldChange} type="text" name="plantingDepth" id="plantingDepth" placeholder='1"' />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="spacing">Spacing</Label>
                                <Input onChange={this.handleFieldChange} type="text" name="spacing" id="spacing" placeholder="2'" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="plantingDateStart">Start of Planting Season</Label>
                                <Input onChange={this.handleFieldChange} type="select" name="plantingDateStart" id="plantingDateStart" placeholder="45" >
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
                                <Input onChange={this.handleFieldChange} type="select" name="plantingDateEnd" id="plantingDateEnd" placeholder="45" >
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
                                <Input onChange={this.handleFieldChange} type="text" name="daysUntilHarvest" id="daysUntilHarvest" placeholder="45" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={this.createNewPlant} color="primary">Submit</Button>
                </Form>
            </React.Fragment>
        )
    }
}