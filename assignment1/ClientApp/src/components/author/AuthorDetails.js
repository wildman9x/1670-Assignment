import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authorSelector, getAuthor } from "../../redux/slices/author";

export const AuthorDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const author = useSelector((state) => authorSelector.selectById(state, id));
  const role = useSelector((state) => state.user.role);

  const [books, setBooks] = React.useState(null);
  // const [loadingAuthor, setLoadingAuthor] = React.useState(true);
  const [loadingBooks, setLoadingBooks] = React.useState(true);

  useEffect(() => {
    dispatch(getAuthor(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetch("/api/Book/GetBooksByAuthor/" + id, {
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
          <h1>
            {author.firstName} {author.lastName}
          </h1>
          {role === "Admin" && (
            <a href={"/author/update/" + author.id} className="button">Update</a>
          )}
        </div>
        <p>Birth Date: {author.birthDate}</p>
        <p>Birth Place: {author.birthPlace}</p>
        <p>Death Date: {author.deathDate}</p>
        <p>Death Place: {author.deathPlace}</p>
        <p>Biography: {author.biography}</p>
        <img
          src={author.image}
          alt={author.firstName}
          style={{
            width: "200px",
            objectFit: "cover",
          }}
        />
      </div>

<h1>AuthorDetails</h1>
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
