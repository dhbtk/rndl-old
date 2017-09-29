export interface IApplicationRecord {
    id?: number,
    created_at?: string,
    updated_at?: string
}

export interface IVehicle extends IApplicationRecord {
    name: string,
    torque_id: string
    latest_gps_entry?: IEntry,
    final_drive: number,
    tire_diameter: number,
    gear_ratios: number[]
}

export interface IRefueling extends IApplicationRecord {
    vehicle_id: number,
    date: Date,
    liter_price: string,
    liters: string,
    total_cost: string,
    odometer: string,
    economy?: string,
    km_cost?: string,
    tracked_distance?: string
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
    instant_kml: number,
    gear: number
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

    refuelings: Page<IRefueling>,

    trips: IDate[],
    trip: ITrip,

    form: any,

    flash: IFlash,

    token: any,
    user: any
}

export interface Page<T> {
    page: number,
    total_pages: number,
    total_count: number,
    content: T[]
}