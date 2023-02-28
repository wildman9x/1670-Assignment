import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Lexend+Exa&amp;display=swap"
                ></link>

                <div className="wrap">
                    <section className="welcome gradient home-welcome">
                        <div className="welcome-messaging">
                            <h2>Hand-made</h2>
                            <a
                                data-bss-hover-animate="pulse"
                                className="button"
                                style={{ width: "255px" }}
                                href="/"
                            >
                                Shop with us
                            </a>
                        </div>
                        <div className="diagonal-line pattern">
                            <svg
                                width="4"
                                height="4"
                                viewBox="0 0 6 6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    fill="##212121"
                                    fillOpacity="0.7"
                                    fillRule="evenodd"
                                >
                                    <path d="M5 0h1L0 6V5zM6 5v1H5z" />
                                </g>
                            </svg>
                        </div>
                        <div className="welcome-image">
                            <img src=""></img>
                        </div>
                    </section>
                    <div className="main">
                    <NavMenu />
                    <Container>{this.props.children}</Container>
                    </div>
                </div>
            </div>
        );
    }
}
