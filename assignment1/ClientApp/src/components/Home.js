import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorSelector } from "../redux/slices/author";
import { booksSelector, fetchBook } from "../redux/slices/book";
import { genreSelector } from "../redux/slices/genre";
import { publisherSelector } from "../redux/slices/publisher";

export const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(booksSelector.selectAll);
  const booksState = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Books</h1>
        <a href="/book/create">Create book</a>
      </div>

      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
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
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <RenderBook key={book.id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RenderBook = ({ book }) => {
  const authors = useSelector((state) =>
    book?.authorsId?.map((author) =>
      authorSelector.selectById(state, author?.authorId)
    )
  );
  const genres = useSelector((state) =>
    book?.genresId?.map((genre) =>
      genreSelector.selectById(state, genre?.genreId)
    )
  );
  const publisher = useSelector((state) =>
    publisherSelector.selectById(state, book.publisherId)
  );

  return (
    <tr>
      <td>{book.title}</td>
      <td>
        <img
          style={{
            height: "200px",
            objectFit: "cover",
          }}
          src={book.image}
          alt={book.title}
        />
      </td>
      <td>
        {authors?.map((author) => {
          return (
            <a key={author?.id} href={`/author/${author.id}`}>
              {author?.firstName} {author.lastName}{" "}
            </a>
          );
        })}
      </td>
      <td>
        {genres?.map((genre) => {
          return (
            <a key={genre.id} href={`/genre/${genre.id}`}>
              {genre.name}
            </a>
          );
        })}
      </td>
      <td>
        <a href={`/publisher/${publisher?.id}`}>{publisher?.name}</a>
      </td>
      <td>{book.publishDate}</td>
      <td>
        <a href={`/book/${book.id}`}>Details</a>
      </td>
    </tr>
  );
};
