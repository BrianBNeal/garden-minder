import React, { Component } from "react"
import { Button } from "reactstrap"
import Reminder from "./Reminder"


export default class ReminderList extends Component {

    render() {
        return (
            <section id="garden-reminders">
                <div>
                    Reminders (check to mark completed)
                { /* hide "add reminder" button if in history view */
                        (this.props.location.pathname.includes("history"))
                            ? null
                            : <Button onClick={() => this.props.history.push(`/reminders/new/${this.props.garden.id}`)}
                                color="link"
                            >
                                add reminder
                            </Button>
                    }
                </div>
                {this.props.reminders.filter(reminder => reminder.gardenId === this.props.garden.id).map(reminder =>
                    <Reminder key={reminder.id}
                        location={this.props.location}
                        updateReminder={this.props.updateReminder}
                        reminder={reminder}
                        history={this.props.history}
                    />
                )}
            </section>
        )
    }
}