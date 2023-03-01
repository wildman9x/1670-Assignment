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
            <a href={"/publisher/update/" + publisher.id} className="button">Update</a>
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
<h1>PublisherDetails</h1>
      {books?.map((book) => (
        <div className="col-xxl-4">
          <a className="product-item rollover" href={`/book/${book.id}`}>
            <div className="product-item-container">
              <figure className="figure product-item-image-container">
                <img style={{
                  width: "300px",
                  objectFit: "cover",
                }}
                  className="img-fluid figure-img product-image"
                  src={book.image}
                  alt={book.title}
                />
                <div className="product-item-status">
                  <span>In stock</span>
                </div>
              </figure>
              <a href={"/book/" + book.id}>
                <div className="product-item-info">
                  <div className="product-item-info">
                    <div className="product-item-info-header">
                      <div className="product-item-info-name">
                        <span>{book.title}</span>
                      </div>
                      <div className="product-item-price">
                        <span className="currency-sign">$</span>
                        <span>{book.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
