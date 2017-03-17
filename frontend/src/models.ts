export interface IApplicationRecord {
    id: number,
    created_at: string,
    updated_at: string
}

export interface IVehicle extends IApplicationRecord {
    name: string,
    torque_id: string
    latest_gps_entry: IEntry
}

export interface IEntry extends IApplicationRecord {
    trip_id: number,
    device_time: string,
    longitude: number,
    latitude: number,
    gps_speed: number,
    altitude: number,
    rpm: number,
    kml: number,
    speed: number,
    fuel_flow: number,
    fuel_used: number,
    throttle_percent: number,
    instant_kml: number
}

export interface ITrip extends IApplicationRecord {
    start_time: string,
    distance: number,
    average_speed: number,
    max_speed: number,
    economy: number,
    duration: string,
    vehicle: IVehicle,
    fuel_used: number,
    timestamp_ms: string,
    map_points: IEntry[]
}

export interface IDate {
    trip_date: string,
    count: number,
    trips: ITrip[]
}

export interface IFlash {
    type: string,
    text: string
}

export interface IState {
    loading: boolean,

    vehicles: IVehicle[],
    vehicle: IVehicle,

    trips: IDate[],
    trip: ITrip,

    flash: IFlash

    token: any,
    user: any
}