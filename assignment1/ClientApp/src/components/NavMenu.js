import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import "./NavMenu.css";

const navPaths = [
  { path: "/", name: "Home" },
  { path: "/upload-image", name: "Upload Image" },
  { path: "/display-image", name: "Display Image" },
];

export const NavMenu = () => {
  const [state, setState] = useState({
    collapsed: true,
  });

  function toggleNavbar() {
    setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  }

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand tag={Link} to="/">
          assignment1
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!state.collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            {navPaths.map((path) => (
              <NavItem key={path.path}>
                <NavLink tag={Link} className="text-dark" to={path.path}>
                  {path.name}
                </NavLink>
              </NavItem>
            ))}
          </ul>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/user/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/user/login">
                Login
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};
