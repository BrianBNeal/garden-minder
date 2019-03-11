import Settings from "./Settings"

export default Object.create(null, {
  database: {
      value: "users"
  },
  addUser: {
    value: function (obj) {
      return fetch(`${Settings.remoteURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(data => data.json())
    }
},
searchUP: {
    value: function (username, password) {
      return fetch(
        `${Settings.remoteURL}/users?username=${username}&password=${password}`
      ).then(e => e.json())
    }
},
searchUsername: {
    value: function (username) {
      return fetch(`${Settings.remoteURL}/users?username=${username}`).then(e =>
        e.json()
      )
    }
}
})