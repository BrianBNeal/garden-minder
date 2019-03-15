import React, { Component } from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'


export default class PlantCard extends Component {
    render() {
        const plant = this.props.plant

        return (
            <React.Fragment>
                <Card onClick={() => this.props.history.push(`/plants/${plant.id}`)}>
                    <CardBody>
                        <CardTitle>{plant.name}</CardTitle>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}