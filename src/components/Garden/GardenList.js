import React, { Component } from "react"
import GardenCard from "./GardenCard"

export default class GardenList extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Garden List</h2>
                <section>
                    {this.props.gardens.map(garden => {
                        return <GardenCard key={garden.id}
                            garden={garden} />
                    })}
                </section>
            </React.Fragment>
        )
    }
}