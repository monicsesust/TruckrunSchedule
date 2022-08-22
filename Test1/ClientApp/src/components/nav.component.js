import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, NavbarText } from 'reactstrap';
import './NavMenu.css';

import logo from '../img/CharmLogo.jpg';

export default class Nav extends Component {
     

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand navbar-light fixed-top">
                    <div className="container">
                       {/* <Link className="navbar-brand" to={'/'}> Home</Link>*/}
                        <NavbarBrand tag={Link} to="/"><img src={logo} alt="Charm" height="100px" width="200px"></img></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <NavbarText><h1 className="navname">Truck Run Schedule </h1></NavbarText>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={'./Login'} className="nav-link"> login  </Link>
                                   {/* <Link to={'./Login'} className="nav-link"> login  </Link>*/}
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <Link to={'./components/Calendar/TruckRunSchedule'} className="nav-link"> Schedule  </Link>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    <Link to={'/register'} className="nav-link"> Sign up  </Link>

                                </li>

                            </ul>

                        </div>

                    </div>
                     
                </nav>
            </header>
        );
    }
}