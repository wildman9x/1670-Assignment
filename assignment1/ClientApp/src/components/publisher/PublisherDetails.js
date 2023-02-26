import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublisher, publisherSelector } from "../../redux/slices/publisher";

export const PublisherDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const publisher = useSelector((state) =>
    publisherSelector.selectById(state, id)
  );
  const role = useSelector((state) => state.user.role);

  const [books, setBooks] = React.useState(null);
  const [loadingBooks, setLoadingBooks] = React.useState(true);

  useEffect(() => {
    dispatch(getPublisher(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetch("/api/Book/GetBooksByPublisher/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
        setLoadingBooks(false);
      })
      .catch((error) => {
        console.warn(error);
        setLoadingBooks(false);
      });
  }, [id]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h1>{publisher.name}</h1>
          {role === "Admin" && (
            <a href={"/publisher/update/" + publisher.id}>Update</a>
          )}
        </div>
        <p>
          Address:
          {publisher.address}
        </p>
        <p>
          Country:
          {publisher.country}
        </p>
        <p>
          Phone:
          {publisher.phone}
        </p>
        <img
          src={publisher.image}
          alt={publisher.name}
          style={{
            width: "200px",
            objectFit: "cover",
          }}
        />
      </div>

      {loadingBooks ? (
        <p>Loading books...</p>
      ) : (
        <div>
          <h2>Books</h2>
          <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>
                    <img
                      style={{
                        width: "200px",
                        objectFit: "cover",
                      }}
                      src={book.image}
                      alt={book.title}
                    />
                  </td>
                  <td>
                    <a href={"/book/" + book.id}>Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
