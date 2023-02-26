import React, { useEffect } from "react";

export const ViewAuthors = () => {
  const [authors, setAuthors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("/api/Author", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAuthors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>View Authors</h1>
        <a href="/author/create">Create Author</a>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Birth Place</th>
              <th>Death Date</th>
              <th>Death Place</th>
              <th>Biography</th>
              <th>Image</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.firstName}</td>
                <td>{author.lastName}</td>
                <td>{author.birthDate}</td>
                <td>{author.birthPlace}</td>
                <td>{author.deathDate}</td>
                <td>{author.deathPlace}</td>
                <td>{author.biography}</td>
                <td>
                  <img
                    style={{
                      width: "200px",
                      objectFit: "cover",
                    }}
                    src={author.image}
                    alt={author.firstName}
                  />
                </td>
                <td>
                  <a href={"/author/" + author.id}>Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
