import React, { Component, useEffect } from "react";

export const Home = () => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  console.log(books);

  useEffect(() => {
    fetch("/api/Book", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setLoading(false);
      });
  }, []);
  console.log("====================================");
  console.log(books);
  console.log("====================================");
  return (
    <div>
      <h1>Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <a href="/author">Authors</a>
              </th>
              <th>
                <a href="/genre">Genres</a>
              </th>
              <th>
                <a href="/publisher">Publisher</a>
              </th>
              <th>Publish Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>
                  {book?.authors?.map((author) => {
                    return (
                      <a key={author?.id} href={`/author/${author.id}`}>
                        {author?.firstName} {author.lastName}
                      </a>
                    );
                  })}
                </td>
                <td>
                  {book?.genres?.map((genre) => {
                    return (
                      <a key={genre.id} href={`/genre/${genre.id}`}>
                        {genre.name}
                      </a>
                    );
                  })}
                </td>
                <td>
                  <a href={`/publisher/${book?.publisher?.id}`}>
                    {book?.publisher?.name}
                  </a>
                </td>
                <td>{book.publishDate}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
