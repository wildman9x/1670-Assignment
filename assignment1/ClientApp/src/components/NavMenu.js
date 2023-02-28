import React from "react";
import { useSelector } from "react-redux";
import "./NavMenu.css";

export const NavMenu = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="sidebar">
        <div className="side-nav-section">
          <div className="side-nav">
            <button
              className="sidebar-nav-title btn-custom button"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Product
            </button>
          </div>
        </div>
      </div>
      <div className="side-nav-section">
        <form action="" method="get">
          <input type="text" name="search" placeholder="Search"></input>
        </form>
        <nav className="pages-nav side-nav-section">
          <ul className="list-unstyled pages-nav-items">
            <li>
              {user.email ? (
                <a href="/logout">Logout</a>
              ) : (
                <a href="/login">Login</a>
              )}
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>{user.role === "Admin" && <a href="/orders">Orders</a>}</li>
            <li>
              {user.role === "User" && <a href="/my-orders">My Orders</a>}
            </li>

            {user.role === "Admin" && (
              <>
                <li>
                  <a href="/author">Authors</a>
                </li>
                <li>
                  <a href="/publisher">Publishers</a>
                </li>
                <li>
                  <a href="/genre">Genres</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
