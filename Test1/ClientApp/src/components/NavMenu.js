import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/CharmLogo.jpg';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><img src={logo} alt="Charm" height="100px" width="200px"></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <NavbarText><h1>Truck Run Schedule </h1></NavbarText>
              
          </Container>
        </Navbar>
      </header>
    );
  }
}
