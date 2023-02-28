import React from "react";

export const ViewOrders = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/Order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // {
  //     "id": 2,
  //     "name": "Anh Trinh",
  //     "email": "anh.trinh3189@gmail.com",
  //     "phone": "7783183031",
  //     "address": "1041 Davie Street",
  //     "cartItems": [
  //       {
  //         "itemId": "179c1619-4202-495a-a74f-f58e746699f6",
  //         "cartId": "72d246d7-2374-490c-9e5c-dbc242a92ace",
  //         "bookId": 2,
  //         "quantity": 1,
  //         "orderId": 2
  //       },
  //       {
  //         "itemId": "7f1322ab-d3ad-41cc-ab4e-33add3d7fc56",
  //         "cartId": "042bb247-df00-43b5-bb0f-a6ec959e1315",
  //         "bookId": 1,
  //         "quantity": 1,
  //         "orderId": 2
  //       }
  //     ],
  //     "total": 0
  //   },
  return (
    <div>
      <h1>View Orders</h1>
      {loading && <div>Loading...</div>}
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order #{order.id}</h2>
          <div>
            <div>Name: {order.name}</div>
            <div>Email: {order.email}</div>
            <div>Phone: {order.phone}</div>
            <div>Address: {order.address}</div>
            <div>Total: {order.total}</div>
          </div>
          <h3>Items</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Book</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => (
                <tr key={item.itemId}>
                  <td>
                    <a href={`/books/${item.bookId}`}>{item.bookId}</a>
                  </td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
