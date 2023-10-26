import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPublishers,
  publisherSelector,
} from "../../redux/slices/publisher";

export const ViewPublisher = () => {
  const dispatch = useDispatch();
  const publishers = useSelector(publisherSelector.selectAll);
  const publisherState = useSelector((state) => state.publisher);

  useEffect(() => {
    dispatch(fetchPublishers());
  }, [dispatch]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>View Publisher</h1>
        <a href="/publisher/create" className="button">Create publisher</a>
      </div>
      {publisherState.loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Image</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => (
              <tr key={publisher.id}>
                <td>{publisher.name}</td>
                <td>{publisher.address}</td>
                <td>{publisher.country}</td>
                <td>{publisher.phone}</td>
                <td>
                  <img
                    style={{
                      width: "200px",
                      objectFit: "cover",
                    }}
                    src={publisher.image}
                    alt={publisher.name}
                  />
                </td>
                <td>
                  <a href={"/publisher/" + publisher.id}>Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
