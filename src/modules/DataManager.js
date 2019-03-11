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
    }
})