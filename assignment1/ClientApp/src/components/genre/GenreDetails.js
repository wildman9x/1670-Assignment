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
          {role === "Admin" && <a href={"/genre/update/" + genre.id}>Update</a>}
        </div>
        <p>Description: {genre.description}</p>
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
