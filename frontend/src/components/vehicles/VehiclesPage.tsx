import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { destroyVehicle, loadVehicles } from '../../ducks/vehicle';
import { Link } from 'react-router';
import * as moment from 'moment';
import { IState, IVehicle } from '../../models';
import Component = React.Component;
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { browserHistory } from 'react-router';

class Vehicle extends React.Component<{vehicle: IVehicle, onDelete: (vehicle: IVehicle) => void}, {dropdownOpen?: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    onDelete(event: React.MouseEvent<any>) {
        this.props.onDelete(this.props.vehicle);
    }

    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    goToEdit() {
        browserHistory.push(`/vehicles/${this.props.vehicle.id}/edit`)
    }

    render() {
        const {vehicle} = this.props;
        return (
            <div className="col-sm-4">
                <div className="card card-inverse bg-primary" style={{minHeight: '165px', marginBottom: '30px'}}>
                    <div className="card-block">
                        <h4 className="card-title d-flex">
                            {vehicle.name}
                            <Dropdown className="ml-auto" isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                                <DropdownToggle color="primary">
                                    <i className="fa fa-fw fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.goToEdit.bind(this)}>Editar</DropdownItem>
                                    <DropdownItem onClick={this.onDelete.bind(this)}>Excluir</DropdownItem>
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

class VehiclesPage extends Component<IVehiclesPageProps, {modalOpen?: boolean, vehicle?: IVehicle}> {
    constructor(props: any) {
        super(props);
        this.state = {
            modalOpen: false,
            vehicle: null
        };
    }

    componentDidMount() {
        this.props.dispatch(loadVehicles());
    }

    onDelete(vehicle: IVehicle) {
        this.setState({
            vehicle,
            modalOpen: true
        });
    }

    toggleModal() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    dispatchDelete() {
        this.setState({ modalOpen: false });
        this.props.dispatch(destroyVehicle(this.state.vehicle) as any);

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
                    {this.props.vehicles.map((vehicle: IVehicle) => <Vehicle key={vehicle.id} vehicle={vehicle} onDelete={this.onDelete.bind(this)} />)}
                </div>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal.bind(this)}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>Excluir veículo</ModalHeader>
                <ModalBody>
                    Realmente excluir o <strong>{this.state.vehicle && this.state.vehicle.name}? </strong>
                    Todas as viagens e abastecimentos associados serão perdidos.
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.dispatchDelete.bind(this)}>Excluir</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

export default connect(({vehicles}: {vehicles: IVehicle[]}) => ({vehicles}), (dispatch: Dispatch<IState>) => ({dispatch}))(VehiclesPage);


