import React from "react";
import { useDispatch } from "react-redux";

const inputs = [
  {
    label: "Phone",
    type: "text",
    id: "phone",
    placeholder: "Enter phone number to find order",
  },
];

export const FindOrders = () => {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    phone: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/Order/search/${form.phone}`);
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <form onSubmit={handleSubmit} className="flex ">
              <h1 className="text-center mb-3">View Orders</h1>
              {inputs.map((input) => (
                <div key={input.id} className="form-group">
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    type={input.type}
                    className="form-control"
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      setForm({ ...form, [input.id]: e.target.value })
                    }
                  />
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-primary btn-block justify-content-center"
              >
                Find
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="card card-body mt-5">
        <h1 className="text-center mb-3">Orders</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const total = order.cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              );
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>
                    {order.cartItems.map((order) => (
                      <div key={order.itemId}>
                        BookId: {order.bookId}({order.quantity})
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
