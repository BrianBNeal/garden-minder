import React, { Component } from "react"
import { Button, InputGroupText, InputGroup, Input, InputGroupAddon } from "reactstrap"
import moment from "moment"

export default class Reminder extends Component {

    completeReminder = () => {
        this.props.reminder.completed = !this.props.reminder.completed
        this.props.updateReminder(this.props.reminder)
    }

    render() {
        const reminder = this.props.reminder

        return (
            <React.Fragment>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <Input onChange={this.completeReminder}
                                addon
                                type="checkbox"
                                aria-label="Checkbox for following reminder text" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupText className="reminderDetails">
                        <section>
                            <div className="reminderText">{reminder.text}</div>
                            <div className="reminderDate">{(reminder.date) ? moment(reminder.date).format("MMMM D, YYYY") : "no date set"}</div>
                        </section>
                    </InputGroupText>
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => this.props.history.push(`/reminders/edit/${reminder.id}`)}
                            color="link">
                            edit
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </React.Fragment>
        )
    }
}