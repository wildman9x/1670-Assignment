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
            <a href={"/author/update/" + author.id}>Update</a>
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
