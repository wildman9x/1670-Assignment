import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import { cartSelector } from "../redux/slices/cart";
import { NavMenu } from "./NavMenu";

export const Layout = ({ children }) => {
  const carts = useSelector(cartSelector.selectAll);
  const total = carts.reduce(
    (acc, cur) => acc + cur.book.price * cur.quantity,
    0
  );

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lexend+Exa&amp;display=swap"
      />

      {/* stickyCart */}
      <div
        className="desktop-cart"
        style={{
          width: "100%",
          maxWidth: "1500px",
          position: "fixed",
          top: "0px",
          zIndex: "200",
        }}
      >
        <div>
          <button
            className="cart-info btn-custom"
            type="button"
            title="View cart"
            onClick={() => {
              window.location.href = "/cart";
            }}
          >
            <span className="cart-count button">{carts.length}</span>
            <span className="cart-total-amount">
              <span className="currency-sign">$</span>
              <span>{total}</span>
            </span>
          </button>
        </div>
      </div>
      <div className="wrap">
        <div className="main">
          <NavMenu />
          <Container>{children}</Container>
        </div>
      </div>
    </div>
  );
};
