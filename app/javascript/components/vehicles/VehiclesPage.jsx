import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as vehicleActions from '../../actions/vehicleActions';
import {Card, CardBlock, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router';

function Vehicle({vehicle}) {
    return (
        <div className="col-sm-4">
            <Card color="primary" inverse>
                <CardBlock>
                    <CardTitle>{vehicle.name}</CardTitle>
                    <CardText>
                        <p>
                            ID: {vehicle.torque_id}
                        </p>
                    </CardText>
                    <Link className="btn btn-secondary" to={'/vehicles/' + vehicle.id}>Detalhes</Link>
                </CardBlock>
            </Card>
        </div>);
}

class VehiclesPage extends React.Component {
    componentWillMount() {
        this.props.actions.loadVehicles();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Veículos</h3>
                    </div>
                </div>
                <div className="row">
                    {this.props.vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} />)}
                </div>
            </div>
        );
    }
}

VehiclesPage.propTypes = {
    vehicles: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        vehicles: state.vehicles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(vehicleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage);
