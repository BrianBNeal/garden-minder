import React, { Component } from "react"
import { Button, Card, CardText, CardBody, CardFooter, CardTitle } from 'reactstrap'


export default class PlantCard extends Component {

    state = {
        showPlantOptions: false
    }

    remove = (evt, gardenPlant) => {
        evt.stopPropagation()
        this.props.deleteGardenPlant(gardenPlant.id)
    }

    togglePlantOptions = (evt) => {
        evt.stopPropagation()
        this.setState({ showPlantOptions: !this.state.showPlantOptions })
    }

    render() {
        const plant = this.props.plant
        const thisGardenPlant = this.props.gardenPlants.find(gp => gp.plantId === plant.id && gp.gardenId === this.props.thisGarden.id)

        return (
            <React.Fragment>
                <Card >
                    <CardBody>
                        <CardTitle>
                            {plant.name}
                        </CardTitle>
                        <CardText>
                            {plant.startIndoors ? "Start indoors" : "Direct sow outdoors"}
                        </CardText>
                        <CardText >
                            {plant.daysUntilHarvest} Days To Maturity
                        </CardText>
                        <CardText >
                            Plant from {plant.plantingDateStart} until {plant.plantingDateEnd}
                        </CardText>
                        <CardText >
                            Planting depth {plant.plantingDepth}
                        </CardText>
                        <CardText >
                            Spacing {plant.spacing}
                        </CardText>
                    </CardBody>
                    {(this.state.showPlantOptions)
                        ? <React.Fragment>
                            <Button onClick={this.togglePlantOptions}
                                color="link"
                                size="sm" >
                                hide options
                            </Button>
                            <CardFooter>
                                <Button onClick={(event) => this.remove(event, thisGardenPlant)}
                                    className="remove-button"
                                    color="primary"
                                    size="sm" >
                                    add a note
                            </Button>
                                <Button onClick={(event) => this.remove(event, thisGardenPlant)}
                                    className="remove-button"
                                    color="danger"
                                    size="sm" >
                                    remove from garden
                            </Button>
                            </CardFooter>
                        </React.Fragment>
                        : <Button onClick={this.togglePlantOptions}
                            color="link"
                            size="sm" >
                            show options
                        </Button>
                    }

                </Card>
            </React.Fragment>
        )
    }
}