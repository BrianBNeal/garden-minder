import React from "react"
import GardenCard from "./GardenCard"
import "./GardenList.css"

const GardenList = (props) => {

    const { location, gardens, history, gardenPlants, plants, reminders } = props
    const openGardens = gardens.filter(garden => !garden.dateClosed)
    const closedGardens = gardens.filter(garden => garden.dateClosed)

    return (
        <React.Fragment>
            <div id="app-title">Garden Minder</div>
            {//show only open gardens in main Route "/"
                (location.pathname === "/")
                    ? <section className="garden-list">
                        <h2>My Gardens</h2>

                        {openGardens.map(garden => {
                            return <GardenCard key={garden.id}
                                location={location}
                                history={history}
                                garden={garden}
                                gardenPlants={gardenPlants}
                                plants={plants}
                                reminders={reminders} />
                        })}
                    </section>
                    : null
            }
            {//show only closed gardens in Route "/gardens/history"
                (location.pathname === "/gardens/history")
                    ? <section className="garden-list">
                        <h2>My Past Gardens</h2>

                        {closedGardens.map(garden => {
                            return <GardenCard key={garden.id}
                                location={location}
                                history={history}
                                garden={garden}
                                gardenPlants={gardenPlants}
                                plants={plants}
                                reminders={reminders} />
                        })}
                    </section>
                    : null
            }
        </React.Fragment>
    )
}

export default GardenList