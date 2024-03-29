import * as React from "react";
import * as moment from "moment";
import * as ol from "openlayers";
import {connect, Dispatch} from "react-redux";
import {loadTrip} from "../../ducks/trip";
import { ITrip, IState, IEntry } from '../../models';
import {colorForSpeedHsl, colorForSpeed} from "../../colors";
import Component = React.Component;

export interface ITripPageProps {
    params: any,
    trip?: ITrip,
    dispatch: Dispatch<IState>
}

class TripPage extends Component<ITripPageProps, undefined> {
    private map: ol.Map;
    private points: ol.Collection<ol.Feature> = new ol.Collection<ol.Feature>();
    private pointsLayer: ol.layer.Vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: this.segments
        })
    });
    private segments: ol.Collection<ol.Feature> = new ol.Collection<ol.Feature>();
    private segmentsLayer: ol.layer.Vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: this.segments
        })
    });

    componentWillMount() {
        this.props.dispatch(loadTrip(this.props.params.id));
        document.querySelector('html').classList.add('full-height');
    }

    componentWillUnmount() {
        document.querySelector('html').classList.remove('full-height');
    }
    
    componentDidMount() {
        this.map = new ol.Map({
            controls: [],
            interactions: ol.interaction.defaults({doubleClickZoom: false}),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                this.segmentsLayer,
                this.pointsLayer
            ],
            target: 'trip-map',
            view: new ol.View({
                center: ol.proj.transform([-54.56901, -25.53413], 'EPSG:4326', 'EPSG:3857'),
                zoom: 14
            })
        });
    }
    
    componentWillReceiveProps(newProps: ITripPageProps) {
        if(newProps.trip && newProps.trip != this.props.trip) {
            this.renderPoints(newProps.trip.map_points);
        }
    }
    
    renderPoints(mapPoints: IEntry[]) {
        let totalLength = 0;
        let lastSpeed: number = null;
        const actualPoints = mapPoints.filter(point => {
            if(lastSpeed === 0 && (+point.speed) === 0) {
                return false;
            }
            lastSpeed = +point.speed;
            return true;
        });
        const sphere = new ol.Sphere(6378137);
        for (let i = 0; i < actualPoints.length - 1; i++) {
            const p1 = actualPoints[i];
            const p2 = actualPoints[i + 1];
            const speedAvg = (+p1.speed + p2.speed) / 2;
            const color = colorForSpeed(speedAvg);
            const lineStringCoords: [number, number][] = [[parseFloat(p1.longitude as any), parseFloat(p1.latitude as any)], [parseFloat(p2.longitude as any), parseFloat(p2.latitude as any)]]
                .map((coords: [number, number]) => ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857'));
            const feature = new ol.Feature({
                id: p1.id,
                speed: speedAvg,
                gear: actualPoints[i].gear,
                geometry: new ol.geom.LineString(lineStringCoords)
            });
            feature.setStyle([new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 9,
                    lineCap: 'butt',
                    lineJoin: 'bevel'
                }),
                zIndex: 1
            }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: color as ol.Color,
                        width: 8,
                        lineCap: 'butt',
                        lineJoin: 'bevel'
                    }),
                    zIndex: 2
                })
            ]);
            this.segments.push(feature);

            const point = new ol.Feature({
                id: p1.id,
                speed: speedAvg,
                gear: actualPoints[i].gear,
                geometry: new ol.geom.Point(lineStringCoords[0])
            });
            const dx = lineStringCoords[1][0] - lineStringCoords[0][0];
            const dy = lineStringCoords[1][1] - lineStringCoords[0][1];
            const rotation = Math.atan2(dy, dx);
            point.setStyle(new ol.style.Style({
                image: new ol.style.RegularShape({
                    points: 3,
                    radius: 6,
                    angle: -rotation + Math.PI / 2,
                    stroke: new ol.style.Stroke({
                        color: [0, 0, 0, 1],
                        width: 1,
                        lineCap: 'butt',
                        lineJoin: 'bevel'
                    }),
                    fill: new ol.style.Fill({
                        color: color
                    })
                }),
                zIndex: 3
            }));

            const originalCoords = lineStringCoords.map(coords => ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326'));
            totalLength += sphere.haversineDistance(originalCoords[0], originalCoords[1]);

            if (totalLength > 100) {
                this.points.push(point);
                totalLength = 0;
            }
        }

        const tooltip = new ol.Overlay({
            element: document.getElementById('trip-tooltip'),
            offset: [10, 0],
            positioning: 'bottom-left'
        });

        this.map.addOverlay(tooltip);
        this.map.on('pointermove', (evt: ol.MapBrowserPointerEvent) => {
            const pixel = evt.pixel;
            const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
            document.getElementById('trip-tooltip').style.display = feature ? '' : 'none';
            if (feature) {
                tooltip.setPosition(evt.coordinate);
                document.getElementById('trip-tooltip').innerHTML = feature.get('speed').toFixed(0) + ' km/h<br>Marcha: ' + feature.get('gear');
            }
        });
        this.map.getView().fit(this.segmentsLayer.getSource().getExtent(), this.map.getSize());
    }

    render() {
        console.log('render');
        return (
                <div className="container-fluid trip-container">
                    <div className="row">
                        {this.props.trip ?
                            <div className="col-md-3">
                                <h5>Viagem de {moment(this.props.trip.start_time).format('DD [de] MMMM, HH:mm')}</h5>
                                <p>Distância: {(this.props.trip.distance / 1000).toFixed(2)} km</p>
                                <p>Média de consumo: {this.props.trip.economy.toFixed(1)} km/l</p>
                                <p>Velocidade média: {this.props.trip.average_speed.toFixed(0)} km/h</p>
                                <p>Velocidade máxima: {this.props.trip.max_speed.toFixed(0)} km/h</p>
                            </div> :
                            <div className="col-md-3">
                                <h5>Viagem</h5>
                                <p>Carregando...</p>
                            </div>}
                        <div className="col-md-9" id="trip-map">
                            <div id="trip-tooltip" className="trip-tooltip"/>
                            <div id="trip-legend">
                                <ul>
                                    {([120, 80, 60, 40, 0]).map(speed => <li key={speed}>
                                        <div className="legend-color" style={{background: colorForSpeedHsl(speed)}} />
                                        <span>{speed} km/h</span>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default connect(({trip}: {trip: ITrip}) => ({trip}), (dispatch: Dispatch<IState>) => ({dispatch}))(TripPage as any);
