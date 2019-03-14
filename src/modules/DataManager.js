import Settings from "./Settings"

export default Object.create(null, {
    get: {
        value: function (id) {
            return fetch(`${Settings.remoteURL}/${this.database}/${id}`).then(res => res.json())
        }
    },
    delete: {
        value: function (id) {
            return fetch(`${Settings.remoteURL}/${this.database}/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${Settings.remoteURL}/${this.database}`).then(res => res.json())
        }
    },
    add: {
        value: function (obj) {
            return fetch(`${Settings.remoteURL}/${this.database}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(res => res.json())
        }
    },
    edit: {
        value: function (obj) {
            return fetch(`${Settings.remoteURL}/${this.database}/${obj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(res => res.json())
        }
    }
})