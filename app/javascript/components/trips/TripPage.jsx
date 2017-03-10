import React, {PropTypes} from "react";
import moment from "moment";
import ol from "openlayers";
import Color from "color";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tripActions from '../../actions/tripActions';

class TripPage extends React.Component {
    colorForSpeedHsl(speed) {
        const max = 120;
        const actualSpeed = speed > max ? max : speed;
        const h = (1.0 - speed/max) * 240;
        return `hsl(${h}, 100%, 50%)`;
    }

    colorForSpeed(speed) {
        const hsl = this.colorForSpeedHsl(speed);
        const rgbArray = Color(hsl).rgb().array();
        rgbArray.push(1); // opacity
        return rgbArray;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        // here we render the map
        const points = new ol.Collection();
        const segments = new ol.Collection();

        const segmentsLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: segments
            })
        });

        // creating map
        const map = new ol.Map({
            controls: [],
            interactions: ol.interaction.defaults({doubleClickZoom: false}),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                segmentsLayer,
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: points
                    })
                })
            ],
            target: 'trip-map',
            view: new ol.View({
                center: ol.proj.transform([-54.56901, -25.53413], 'EPSG:4326', 'EPSG:3857'),
                zoom: 14
            })
        });

        let totalLength = 0;
        for(let i = 0; i < this.props.trip.map_points.length - 1; i++) {
            const p1 = this.props.trip.map_points[i];
            const p2 = this.props.trip.map_points[i + 1];
            const speedAvg = (parseFloat(p1.speed) + parseFloat(p2.speed))/2;
            const color = this.colorForSpeed(speedAvg);
            const lineStringCoords = [[parseFloat(p1.longitude), parseFloat(p1.latitude)], [parseFloat(p2.longitude), parseFloat(p2.latitude)]]
                .map(coords => ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857'));
            const feature = new ol.Feature({
                id: p1.id,
                speed: speedAvg,
                geometry: new ol.geom.LineString(lineStringCoords)
            });
            feature.setStyle([new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [0,0,0,1],
                    width: 9,
                    lineCap: 'butt',
                    lineJoin: 'bevel'
                }),
                zIndex: 1
            }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: color,
                        width: 8,
                        lineCap: 'butt',
                        lineJoin: 'bevel'
                    }),
                    zIndex: 2
                })
            ]);
            segments.push(feature);

            const point = new ol.Feature({
                id: p1.id,
                speed: speedAvg,
                geometry: new ol.geom.Point(lineStringCoords[0])
            });
            const dx = lineStringCoords[1][0] - lineStringCoords[0][0];
            const dy = lineStringCoords[1][1] - lineStringCoords[0][1];
            const rotation = Math.atan2(dy, dx);
            point.setStyle(new ol.style.Style({
                image: new ol.style.RegularShape({
                    points: 3,
                    radius: 6,
                    rotation: -rotation + Math.PI/2,
                    stroke: new ol.style.Stroke({
                        color: [0,0,0,1],
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

            const sphere = new ol.Sphere(6378137);
            const originalCoords = lineStringCoords.map(coords => ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326'));
            totalLength += sphere.haversineDistance(originalCoords[0], originalCoords[1]);

            if(totalLength > 100) {
                points.push(point);
                totalLength = 0;
            }
        }

        const tooltip = new ol.Overlay({
            element: document.getElementById('trip-tooltip'),
            offset: [10, 0],
            positioning: 'bottom-left'
        });

        map.addOverlay(tooltip);
        map.on('pointermove', evt => {
            const pixel = evt.pixel;
            const feature = map.forEachFeatureAtPixel(pixel, feature => feature);
            document.getElementById('trip-tooltip').style.display = feature ? '' : 'none';
            if (feature) {
                tooltip.setPosition(evt.coordinate);
                document.getElementById('trip-tooltip').innerHTML = feature.get('speed').toFixed(0) + ' km/h';
            }
        });
        map.getView().fit(segmentsLayer.getSource().getExtent(), map.getSize());
    }

    componentWillMount() {
        this.props.actions.loadTrip(this.props.params.id);
        document.querySelector('html').classList.add('full-height');
    }

    componentWillUnmount() {
        document.querySelector('html').classList.remove('full-height');
    }

    render() {
        console.log('render');
        return !this.props.trip.id ? <div>Carregando...</div> : (
            <div className="container-fluid trip-container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Viagem de {moment(this.props.trip.start_time).format('DD [de] MMMM, HH:mm')}</h5>
                        <p>Distância: {(parseFloat(this.props.trip.distance) / 1000).toFixed(2)} km</p>
                        <p>Média de consumo: {parseFloat(this.props.trip.economy).toFixed(1)} km/l</p>
                        <p>Velocidade média: {parseFloat(this.props.trip.average_speed).toFixed(0)} km/h</p>
                        <p>Velocidade máxima: {parseFloat(this.props.trip.max_speed).toFixed(0)} km/h</p>
                    </div>
                    <div className="col-md-9" id="trip-map">
                        <div id="trip-tooltip" className="trip-tooltip"/>
                        <div id="trip-legend">
                            <ul>
                                {([120, 80, 60, 40, 0]).map(speed => <li key={speed}>
                                    <div className="legend-color" style={{background: this.colorForSpeedHsl(speed)}}></div>
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

TripPage.propTypes = {
    trip: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trip
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tripActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripPage);