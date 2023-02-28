import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSelector, minusToCart } from "../../redux/slices/cart";

export const ViewCart = () => {
  const dispatch = useDispatch();
  const carts = useSelector(cartSelector.selectAll);
  const total = carts?.reduce((acc, cart) => {
    return acc + cart.book?.price * cart.quantity;
  }, 0);

  const addQuantity = (cart) => {
    dispatch(addToCart(cart));
  };

  const minusQuantity = (cart) => {
    dispatch(minusToCart(cart));
  };

  useEffect(() => {
    fetch("/api/Home/ListCart")
      .then((data) => {
        console.log(data.body);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <div>
      <h1>View Cart</h1>
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Book</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {carts?.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.book?.title}</td>

              <td className="d-flex justify-content-between align-content-lg-center">
                <button onClick={() => minusQuantity(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => addQuantity(cart)}>+</button>
              </td>
              <td>{cart.book?.price}</td>
              <td>{cart.book?.price * cart.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = "/order/checkout";
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
