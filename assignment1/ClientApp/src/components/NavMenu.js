import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { cartSelector } from "../redux/slices/cart";
import "./NavMenu.css";

const navPaths = [{ path: "/", name: "Home" }];

export const NavMenu = () => {
  const user = useSelector((state) => state.user);
  const carts = useSelector(cartSelector.selectAll);

  const [state, setState] = useState({
    collapsed: true,
  });

  function toggleNavbar() {
    setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  }
  console.log(carts.length);
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
          className="d-sm-inline-flex flex-sm-row justify-content-sm-between"
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
            {user?.role === "Admin" && (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/orders">
                    Orders
                  </NavLink>
                </NavItem>
              </>
            )}
            {user?.role === "User" && (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/cart">
                    Cart ({carts.length})
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/my-orders">
                    My Orders
                  </NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              {user?.email ? (
                <NavLink tag={Link} className="text-dark" to="/logout">
                  Logout
                </NavLink>
              ) : (
                <NavLink tag={Link} className="text-dark" to="/login">
                  Login
                </NavLink>
              )}
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};
