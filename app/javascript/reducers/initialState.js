export default {
    loading: false,

    vehicles: [],
    vehicle: {},

    trips: [],
    trip: {},

    token: {
        uid: localStorage.getItem("uid"),
        client: localStorage.getItem("client"),
        token: localStorage.getItem("token"),
        validated: false
    },
    user: {}
}
