import React from "react"
import Login from "./Login"
import UserAccessLayer from "../UserAccessLayer"

const IsAuth = (props) => {

  return (
    <React.Fragment>
      {props.isAuthenticated()
      ? <UserAccessLayer {...props} />
      : <Login {...props} />}
    </React.Fragment>
    )
  }

export default IsAuth
