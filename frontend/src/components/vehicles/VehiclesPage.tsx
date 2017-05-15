import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { loadVehicles } from '../../ducks/vehicle';
import { Link } from 'react-router';
import * as moment from 'moment';
import { IState, IVehicle } from '../../models';
import Component = React.Component;
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Vehicle extends React.Component<{vehicle: IVehicle}, {open: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = { open: false };
    }

    toggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const {vehicle} = this.props;
        return (
            <div className="col-sm-4">
                <div className="card card-inverse bg-primary" style={{minHeight: '165px', marginBottom: '30px'}}>
                    <div className="card-block">
                        <h4 className="card-title d-flex">
                            {vehicle.name}
                            <Dropdown className="ml-auto" isOpen={this.state.open} toggle={this.toggle.bind(this)}>
                                <DropdownToggle color="primary">
                                    <i className="fa fa-fw fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Editar</DropdownItem>
                                    <DropdownItem>Excluir</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </h4>
                        {vehicle.latest_gps_entry && <p className="card-text">
                            Última atualização: {moment.duration(new Date().valueOf() - new Date(vehicle.latest_gps_entry.device_time).valueOf()).humanize()} atrás
                        </p>}
                        <Link className="btn btn-secondary" to={'/vehicles/' + vehicle.id}>Detalhes</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export interface IVehiclesPageProps {
    vehicles: IVehicle[],
    dispatch: Dispatch<IState>
}

class VehiclesPage extends Component<IVehiclesPageProps, undefined> {
    componentDidMount() {
        this.props.dispatch(loadVehicles());
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>
                            Veículos
                            <Link to="/vehicles/new" className="btn btn-primary pull-right">Novo</Link>
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {this.props.vehicles.map((vehicle: IVehicle) => <Vehicle key={vehicle.id} vehicle={vehicle} />)}
                </div>
            </div>
        );
    }
}

export default connect(({vehicles}: {vehicles: IVehicle[]}) => ({vehicles}), (dispatch: Dispatch<IState>) => ({dispatch}))(VehiclesPage);


