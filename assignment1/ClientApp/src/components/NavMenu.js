import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    a,
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
        <div>
            <div className="sidebar">
                <div className="side-nav-section">
                    <div className="side-nav">
                        <a
                            role="button"
                        >
                            <button className="sidebar-nav-title btn-custom button">
                                Product
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="side-nav-section">
                <form action="" method="get">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                    ></input>
                </form>
                <nav className="pages-nav side-nav-section">
                    <ul className="list-unstyled pages-nav-items">
                        
                        <li>
                            <a href="{{path('app_login')}}">Login</a>
                        </li>
                        <li>
                            <a href="{{path ('home')}}">Home</a>
                        </li>
                        <li>
                            <a href="{{path ('cart')}}">Cart</a>
                        </li>

                        <div className="">
                            
                            <li>
                                <a href="{{path ('view_list_category')}}">
                                    Category
                                </a>
                            </li>
                            <li>
                                <a href="{{path ('view_list_product')}}">
                                    Product update
                                </a>
                            </li>
                            <li>
                                <a href="{{path ('view_list_customer')}}">
                                    Customer update
                                </a>
                            </li>
                            <li>
                                <a href="{{path ('view_list_employee')}}">
                                    Employee update
                                </a>
                            </li>
                            <li>
                                <a href="{{path ('image_index')}}">
                                    Image update
                                </a>
                            </li>
                            <li>
                                <a href="{{path ('user_index')}}">
                                    User update
                                </a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
