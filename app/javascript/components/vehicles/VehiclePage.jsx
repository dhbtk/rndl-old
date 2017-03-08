import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as vehicleActions from '../../actions/vehicleActions';

class VehiclePage extends React.Component {
    componentWillMount() {
        this.props.actions.loadVehicle(this.props.params.id);
        document.querySelector('html').classList.add('full-height');
    }

    componentWillUnmount() {
        document.querySelector('html').classList.remove('full-height');
    }

    render() {
        return (
            <div className="container-fluid trip-container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>{this.props.vehicle.name}</h5>
                    </div>
                    <div className="col-md-9">
                        Mapa em tempo real vai aqui
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
