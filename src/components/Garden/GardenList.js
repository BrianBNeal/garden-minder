import React, { Component } from "react"
import GardenCard from "./GardenCard"
import "./GardenList.css"

export default class GardenList extends Component {

    render() {
        const gardens = this.props.gardens

        return (
            <React.Fragment>
                <div id="app-title">Garden Minder</div>
                {//show only open gardens in main Route "/"
                    (this.props.location.pathname === "/")
                        ? <section className="garden-list">
                            <h2>My Gardens</h2>

                            {/* filter to get only gardens with no dateClosed */}
                            {gardens.filter(garden => !garden.dateClosed).map(garden => {
                                return <GardenCard key={garden.id}
                                    history={this.props.history}
                                    garden={garden}
                                    gardenPlants={this.props.gardenPlants}
                                    plants={this.props.plants}
                                    reminders={this.props.reminders} />
                            })}
                        </section>
                        : null
                }
                {//show only closed gardens in Route "/gardens/history"
                    (this.props.location.pathname === "/gardens/history")
                        ? <section className="garden-list">
                            <h2>My Past Gardens</h2>

                            {/* filter to get only gardens WITH dateClosed */}
                            {gardens.filter(garden => garden.dateClosed).map(garden => {
                                return <GardenCard key={garden.id}
                                    history={this.props.history}
                                    garden={garden}
                                    gardenPlants={this.props.gardenPlants}
                                    plants={this.props.plants}
                                    reminders={this.props.reminders} />
                            })}
                        </section>
                        : null
                }
            </React.Fragment>
        )
    }
}