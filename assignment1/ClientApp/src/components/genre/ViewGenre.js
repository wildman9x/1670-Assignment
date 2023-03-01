import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, genreSelector } from "../../redux/slices/genre";

export const ViewGenre = () => {
  const dispatch = useDispatch();
  const genres = useSelector(genreSelector.selectAll);
  const genreState = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchGenres());
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
        <h1>View Genres</h1>
        <a href="/genre/create" className="button">Create Genre</a>
      </div>
      {genreState.loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td>{genre.description}</td>
                <td>
                  <a href={"/genre/" + genre.id}>Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
