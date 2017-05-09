import {IndexLink, Link} from "react-router";

export default function(props: any) {
    return (
        <div>
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <IndexLink to={`/vehicles/${props.params.id}`} className="nav-link" activeClassName="active">Tempo Real</IndexLink>
                    </li>
                    <li className="nav-item">
                        <Link to={`/vehicles/${props.params.id}/averages`} className="nav-link" activeClassName="active">Médias</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/vehicles/${props.params.id}/refuelings`} className="nav-link" activeClassName="active">Abastecimentos</Link>
                    </li>
                </ul>
            </div>
            {props.children}
        </div>
    )
}
