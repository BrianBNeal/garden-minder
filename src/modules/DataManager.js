import Settings from "./Settings"

export default Object.create(null, {
    add: {
        value: function (database, obj) {
            return fetch(`${Settings.remoteURL}/${database}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(res => res.json())
        }
    },
    delete: {
        value: function (database, id) {
            return fetch(`${Settings.remoteURL}/${database}/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
        }
    },
    edit: {
        value: function (database, obj) {
            return fetch(`${Settings.remoteURL}/${database}/${obj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(res => res.json())
        }
    },
    get: {
        value: function (database, id) {
            return fetch(`${Settings.remoteURL}/${database}/${id}`).then(res => res.json())
        }
    },
    //gardens and locations are getAllByUser
    getAll: {
        value: function (database) {
            return fetch(`${Settings.remoteURL}/${database}`).then(res => res.json())
        }
    },
    //gardens and locations are getAllByUser
    getAllByUser: {
        value: function (database, id) {
            return fetch(`${Settings.remoteURL}/${database}?userId=${id}`).then(res => res.json())
        }
    },
    getAllSortedByDate: {
        value: function (database) {
            return fetch(`${Settings.remoteURL}/${database}?completed=false&_sort=date&_order=asc`).then(res => res.json())
        }
    },
    getAllSortedByName: {
        value: function (database) {
            return fetch(`${Settings.remoteURL}/${database}?_sort=name&_order=asc`).then(res => res.json())
        }
    },
    searchUsername: {
        value: function (username) {
            return fetch(`${Settings.remoteURL}/users?username=${username}`).then(e =>
                e.json()
            )
        }
    },
    searchUP: {
        value: function (username, password) {
            return fetch(
                `${Settings.remoteURL}/users?username=${username}&password=${password}`
            ).then(e => e.json())
        }
    }
})