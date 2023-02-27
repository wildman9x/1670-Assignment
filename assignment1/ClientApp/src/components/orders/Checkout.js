import React from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cart";

const inputs = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
  },
  // {
  //   name: "email",
  //   label: "Email",
  //   type: "email",
  //   placeholder: "Enter your email",
  // },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter your phone",
  },
];

export const Checkout = () => {
  const carts = useSelector(cartSelector.selectAll);
  const user = useSelector((state) => state.user);
  const total = carts?.reduce((acc, cart) => {
    return acc + cart.book?.price * cart.quantity;
  }, 0);
  const [form, setForm] = React.useState({
    name: "",
    email: user.email,
    address: "",
    phone: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // const cartItems = carts.map((cart) => ({
    //   bookId: cart.book.id,
    //   quantity: cart.quantity,
    // }));

    fetch("/api/Order/checkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Checkout</h1>
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
              <td>{cart.quantity}</td>
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
      <form>
        {inputs.map((input) => (
          <div key={input.name} className="form-group">
            <label htmlFor={input.name}>{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              id={input.name}
              placeholder={input.placeholder}
              value={form[input.name]}
              onChange={(e) =>
                setForm({ ...form, [input.name]: e.target.value })
              }
            />
          </div>
        ))}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
