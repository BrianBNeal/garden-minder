import DataManager from "./DataManager"
import Settings from "./Settings"

export default Object.create(DataManager, {
  database: {
    value: "locations"
  },
  getAll: {
    value: function (id) {
      return fetch(`${Settings.remoteURL}/${this.database}?userId=${id}`).then(res => res.json())
    }
  }
})