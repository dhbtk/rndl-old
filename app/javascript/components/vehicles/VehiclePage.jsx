import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ol from 'openlayers';
import * as vehicleActions from '../../actions/vehicleActions';
import {colorForSpeed} from '../../colors';
import ActionCable from 'actioncable';

function getCoordinatesFromEntry(entry) {
    const latitude = parseFloat(entry.latitude);
    const longitude = parseFloat(entry.longitude);
    return ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');
}

const cable = ActionCable.createConsumer();

class RealTimeVehicleInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0,
            rpm: 0
        };
    }
    componentWillMount() {
        this.subscription = cable.subscriptions.create('VehicleChannel', {
            received: data => {
                console.log(data);
                if(data.id == this.props.id) {
                    this.setState({ speed: data.entry.speed, rpm: data.entry.rpm });
                }
            }
        });
    }

    componentWillUnmount() {
        if(this.subscription) {
            cable.subscriptions.remove(this.subscription);
        }
    }

    render() {
        return (<div>
            <p>Velocidade: {this.state.speed} km/h</p>
            <p>Giro: {this.state.rpm} RPM</p>
        </div>);
    }
}

class VehiclePage extends React.Component {
    componentWillMount() {
        this.props.actions.loadVehicle(this.props.params.id);
        document.querySelector('html').classList.add('full-height');
    }

    componentWillUnmount() {
        cable.subscriptions.remove(this.subscription);
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
        const points = new ol.Collection();
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
            received: data => {
                if(data.id == this.props.vehicle.id && data.entry.longitude && data.entry.latitude) {
                    this.point.getGeometry().setCoordinates(getCoordinatesFromEntry(data.entry));
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
                                color: colorForSpeed(data.entry.speed)
                            }),
                        }),
                        text: new ol.style.Text({
                            offsetX: 25,
                            offsetY: 25,
                            text: `${parseFloat(data.entry.speed).toFixed(0)} km/h
${parseFloat(data.entry.rpm).toFixed(0)} RPM`
                        })
                    }));
                    this.map.getView().animate({center: this.point.getGeometry().getCoordinates(), duration: 150});
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

VehiclePage.propTypes = {
    vehicle: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        vehicle: state.vehicle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(vehicleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclePage);
