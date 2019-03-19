import React, { Component } from "react"
import { Form, Label, Input, FormGroup, Button } from "reactstrap"

export default class ReminderCreateForm extends Component {

    state = {
        reminderDate: "",
        reminderText: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createReminder = (evt) => {
        evt.preventDefault();

        if (this.state.reminderText) {

            const newReminderObj = {
                "completed": false,
                "date": this.state.reminderDate,
                "gardenId": parseInt(this.props.match.params.gardenId),
                "text": this.state.reminderText,
            }

            this.props.addReminder(newReminderObj)
                .then(() => this.props.history.push(`/gardens/${this.props.match.params.gardenId}`))

        } else {
            window.alert("Please provide some text for the reminder")
        }
    }

    render() {
        return (
            <Form>

                {/* input for reminder text, along with tag to let user know it's required */}
                <FormGroup>
                    <Label for="reminderText">What do you need to be reminded about? <span style={{color: "red", fontWeight: "bolder", fontSize: "1.4em"}}>*</span></Label>
                    <Input onChange={this.handleFieldChange}
                        type="text"
                        name="reminderText"
                        id="reminderText"
                        placeholder="remind me to do this!"
                    />
                    <div style={{color: "red", fontSize: ".9em"}}>*Required</div>
                </FormGroup>

                {/* Input for reminder date, not required */}
                <FormGroup>
                    <Label for="reminderDate">Date</Label>
                    <Input onChange={this.handleFieldChange}
                        type="date"
                        name="reminderDate"
                        id="reminderDate"
                    />
                </FormGroup>

                {/* Submit and Cancel buttons */}
                <Button onClick={this.createReminder}
                    color="primary" >
                    Submit
                </Button>
                <Button onClick={() => this.props.history.push(`/gardens/${this.props.match.params.gardenId}`)}
                    color="secondary" >
                    Cancel
                </Button>
            </Form>
        )
    }
}