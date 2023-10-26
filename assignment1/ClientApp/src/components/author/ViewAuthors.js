import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorSelector, fetchAuthors } from "../../redux/slices/author";

export const ViewAuthors = () => {
  const dispatch = useDispatch();
  const authors = useSelector(authorSelector.selectAll);
  const authorState = useSelector((state) => state.author);

  useEffect(() => {
    dispatch(fetchAuthors());
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
        <h1>View Authors</h1>
        <a href="/author/create" className="button">Create Author</a>
      </div>
      {authorState.loading ? (
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
