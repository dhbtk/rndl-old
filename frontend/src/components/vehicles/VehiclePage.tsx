import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import * as ol from 'openlayers';
import * as vehicleActions from '../../actions/vehicleActions';
import {colorForSpeed} from '../../colors';
import * as ActionCable from 'actioncable';
import {IEntry, IVehicle, IState} from "../../models";
import Component = React.Component;
import {loadVehicle} from "../../actions/vehicleActions";
import Channel = ActionCable.Channel;

function getCoordinatesFromEntry(entry: IEntry): ol.Coordinate {
    const latitude = entry.latitude;
    const longitude = entry.longitude;
    return ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');
}

const cable = ActionCable.createConsumer();

export interface IRealTimeVehicleInformationProps {
    id: number
}

export interface IRealTimeVehicleInformationState {
    speed: number,
    rpm: number
}

class RealTimeVehicleInformation extends Component<IRealTimeVehicleInformationProps, IRealTimeVehicleInformationState> {
    subscription: Channel;

    constructor(props: IRealTimeVehicleInformationProps) {
        super(props);

        this.state = {
            speed: 0,
            rpm: 0
        };
    }
    componentWillMount() {
        this.subscription = cable.subscriptions.create('VehicleChannel', {
            connected: () => {},
            disconnected: () => {},
            received: (data: Object) => {
                console.log(data);
                const id: number = (data as any).id;
                const entry: IEntry = (data as any).entry;
                if(id == this.props.id && !Number.isNaN(entry.speed)) {
                    this.setState({ speed: entry.speed, rpm: entry.rpm });
                }
            }
        });
    }

    componentWillUnmount() {
        if(this.subscription) {
            // cable.subscriptions.remove(this.subscription);
        }
    }

    render() {
        return (<div>
            <p>Velocidade: {this.state.speed} km/h</p>
            <p>Giro: {this.state.rpm} RPM</p>
        </div>);
    }
}

interface ConnectedProps {
    vehicle?: IVehicle,
    dispatch: Dispatch<IState>
}

export interface IVehiclePageProps {
    params: any
}

class VehiclePage extends Component<IVehiclePageProps & ConnectedProps, undefined> {
    subscription: Channel;
    point: ol.Feature;
    map: ol.Map;

    componentWillMount() {
        this.props.dispatch(loadVehicle(this.props.params.id));
        document.querySelector('html').classList.add('full-height');
    }

    componentWillUnmount() {
        if(this.subscription) {
            // cable.subscriptions.remove(this.subscription);
        }
        document.querySelector('html').classList.remove('full-height');
    }

    componentDidUpdate() {
        if(!this.props.vehicle.id) return;
        const coords = getCoordinatesFromEntry(this.props.vehicle.latest_gps_entry);
        this.point = new ol.Feature({
            geometry: new ol.geom.Point(coords)
        });
        this.point.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 1,
                    lineCap: 'butt',
                    lineJoin: 'bevel'
                }),
                fill: new ol.style.Fill({
                    color: colorForSpeed(this.props.vehicle.latest_gps_entry.speed)
                }),
            })
        }));
        const points = new ol.Collection<ol.Feature>();
        points.push(this.point);
        const pointLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: points
            })
        });
        this.map = new ol.Map({
            controls: [],
            interactions: ol.interaction.defaults({ doubleClickZoom: false }),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                pointLayer
            ],
            target: 'trip-map',
            view: new ol.View({
                center: ol.proj.transform([-54.56901, -25.53413], 'EPSG:4326', 'EPSG:3857'),
                zoom: 14
            })
        });
        this.map.getView().fit(pointLayer.getSource().getExtent(), {
            size: this.map.getSize(),
            maxZoom: 15
        });
        this.subscription = cable.subscriptions.create('VehicleChannel', {
            connected: () => {},
            disconnected: () => {},
            received: (data: Object) => {
                const id: number = (data as any).id;
                const entry: IEntry = (data as any).entry;
                if(id == this.props.vehicle.id && entry.longitude && entry.latitude && !Number.isNaN(entry.speed)) {
                    (this.point.getGeometry() as ol.geom.Point).setCoordinates(getCoordinatesFromEntry(entry));
                    this.point.setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 6,
                            stroke: new ol.style.Stroke({
                                color: [0, 0, 0, 1],
                                width: 1,
                                lineCap: 'butt',
                                lineJoin: 'bevel'
                            }),
                            fill: new ol.style.Fill({
                                color: colorForSpeed(entry.speed)
                            }),
                        }),
                        text: new ol.style.Text({
                            offsetX: 25,
                            offsetY: 25,
                            text: `${entry.speed.toFixed(0)} km/h
${entry.rpm.toFixed(0)} RPM`
                        })
                    }));
                    this.map.getView().animate({center: (this.point.getGeometry() as ol.geom.Point).getCoordinates(), duration: 150});
                }
            }
        });
    }

    render() {
        if(!this.props.vehicle.id) {
            return <span className="loading">Carregando...</span>;
        }

        return (
            <div className="container-fluid trip-container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>{this.props.vehicle.name}</h5>
                        <RealTimeVehicleInformation id={this.props.vehicle.id} />
                    </div>
                    <div className="col-md-9" id="trip-map">

                    </div>
                </div>
            </div>
        );
    }
}


export default connect(({vehicle}: {vehicle: IVehicle}) => ({vehicle}), (dispatch: Dispatch<IState>) => ({dispatch}))(VehiclePage as any);
