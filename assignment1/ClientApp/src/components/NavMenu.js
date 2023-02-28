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
      <div className="sidebar">
		<div className="side-nav-section">
			<div className="side-nav">
				<a data-bs-toggle="collapse" aria-expended="false" aria-controls="collapse-1" onclick="location.href='#collapse-1'" role="button">
					<button className="sidebar-nav-title btn-custom button">Product</button>
				</a>
				<div id="collapse-1" className="collapse">
					<ul
						className="list-unstyled">
						
					</ul>
				</div>
			</div>
		</div>
		<div
			className="side-nav-section">
			

			<form action="" method="GET">
				<input
				type="text" name="search" placeholder="Search">
          </input>
			
			</form>

			<nav className="pages-nav side-nav-section">
				<ul className="list-unstyled pages-nav-items">
					<option selected disabled>Customer</option>
					<li>
						<a href="">Login</a>
					</li>
					<li>
						<a href="">Home</a>
					</li>
					<li>
						<a href="">Cart</a>
					</li>
					
				</ul>
			</nav>
		</div>
	</div>
    </header>
  );
};
