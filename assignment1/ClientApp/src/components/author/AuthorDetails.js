import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const AuthorDetails = () => {
  const id = useParams().id;
  const [author, setAuthor] = React.useState(null);
  const [books, setBooks] = React.useState(null);
  const [loadingAuthor, setLoadingAuthor] = React.useState(true);
  const [loadingBooks, setLoadingBooks] = React.useState(true);

  useEffect(() => {
    fetch("/api/Author/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAuthor(data);
        setLoadingAuthor(false);
      })
      .catch((error) => {
        console.warn(error);
        setLoadingAuthor(false);
      });
  }, [id]);

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
      {loadingAuthor ? (
        <p>Loading author...</p>
      ) : (
        <div>
          <h1>
            {author.firstName} {author.lastName}
          </h1>
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
      )}
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
              {books.map((book) => (
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
