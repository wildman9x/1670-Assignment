import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { genreSelector, getGenre } from "../../redux/slices/genre";

export const GenreDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const genre = useSelector((state) => genreSelector.selectById(state, id));
  const role = useSelector((state) => state.user.role);

  const [books, setBooks] = React.useState(null);
  const [loadingBooks, setLoadingBooks] = React.useState(true);

  useEffect(() => {
    dispatch(getGenre(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetch("/api/Book/GetBooksByGenre/" + id, {
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
          <h1>{genre.name}</h1>
          {role === "Admin" && <a href={"/genre/update/" + genre.id} className="button">Update</a>}
        </div>
        <p>Description: {genre.description}</p>
      </div>

      <h1>GenreDetails</h1>
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
