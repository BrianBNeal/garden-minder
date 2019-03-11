import Settings from "./Settings"

export default Object.create(null, {
    get: {
        value: function (id) {
            return fetch(`${Settings.remoteURL}/${database}/${id}`).then(res => res.json())
        }
    },
    delete: {
        value: function (id) {
            return fetch(`${Settings.remoteURL}/${database}/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    }
})




export default {
    getAll() {
        return fetch(`${Settings.remoteURL}/users`).then(e => e.json())
    },
    addUser(obj) {
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    searchUP(username, password) {
        return fetch(
            `${Settings.remoteURL}/users?username=${username}&password=${password}`
        ).then(e => e.json())
    },
    searchUsername(username) {
        return fetch(`${Settings.remoteURL}/users?username=${username}`).then(e =>
            e.json()
        )
    }
}
