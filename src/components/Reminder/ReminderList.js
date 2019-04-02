import React, { Component } from "react"
import { Button } from "reactstrap"
import Reminder from "./Reminder"


export default class ReminderList extends Component {

    render() {
        return (
            <section id="garden-reminders">
                <div>
                    Reminders (check to mark completed)
                    <Button onClick={() => this.props.history.push(`/reminders/new/${this.props.garden.id}`)}
                        color="link"
                        >
                        add reminder
                    </Button>
                </div>
                {this.props.reminders.filter(reminder => reminder.gardenId === this.props.garden.id).map(reminder =>
                    (reminder.completed === false)
                        ? <Reminder key={reminder.id}
                            updateReminder={this.props.updateReminder}
                            reminder={reminder}
                            history={this.props.history}
                        />
                        : null
                )}
            </section>
        )
    }
}