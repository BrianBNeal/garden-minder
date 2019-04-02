import React, { Component } from "react"
import { Form, Label, Input, FormGroup, Button } from "reactstrap"
import DataManager from "../../modules/DataManager"

export default class ReminderCreateForm extends Component {

    state = {
        reminderDate: "",
        gardenId: "",
        reminderText: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingReminder = (evt) => {
        evt.preventDefault();

        if (this.state.reminderText && this.state.reminderDate) {

            const editedReminderObj = {
                completed: false,
                date: this.state.reminderDate,
                gardenId: this.state.gardenId,
                text: this.state.reminderText,
                id: this.props.match.params.reminderId
            }

            this.props.updateReminder(editedReminderObj)
                .then(() => this.props.history.push(`/gardens/${editedReminderObj.gardenId}`))

        } else {
            window.alert("Please fill in both fields")
        }
    }

    componentDidMount() {
        DataManager.get("reminders", this.props.match.params.reminderId)
            .then(reminder => {
                this.setState({
                    reminderDate: reminder.date,
                    gardenId: reminder.gardenId,
                    reminderText: reminder.text
                })
            })
    }

    render() {
        return (
            <Form>

                {/* input for reminder text */}
                <FormGroup>
                    <Label for="reminderText">What do you need to be reminded about?</Label>
                    <Input onChange={this.handleFieldChange}
                        type="text"
                        name="reminderText"
                        id="reminderText"
                        placeholder="remind me to do this!"
                        value={this.state.reminderText}
                    />
                </FormGroup>

                {/* Input for reminder date */}
                <FormGroup>
                    <Label for="reminderDate">Date</Label>
                    <Input onChange={this.handleFieldChange}
                        type="date"
                        name="reminderDate"
                        id="reminderDate"
                        value={this.state.reminderDate}
                    />
                </FormGroup>

                {/* Submit and Cancel buttons */}
                <Button onClick={this.updateExistingReminder}
                    color="primary" >
                    Submit
                </Button>
                <Button onClick={() => this.props.history.push(`/gardens/${this.state.gardenId}`)}
                    color="secondary" >
                    Cancel
                </Button>
            </Form>
        )
    }
}