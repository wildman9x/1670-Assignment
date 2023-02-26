import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authorSelector } from "../../redux/slices/author";
import { booksSelector, getBook } from "../../redux/slices/book";
import { genreSelector } from "../../redux/slices/genre";
import { publisherSelector } from "../../redux/slices/publisher";

export const BookDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const book = useSelector((state) => booksSelector.selectById(state, id));
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

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h1>{book.title}</h1>

          <a href={"/book/update/" + book.id}>Update</a>
        </div>
        <div className="d-flex justify-content-center">
          <img src={book.image} alt={book.title} style={{ height: "400px" }} />
          <div className="d-flex flex-column m-5">
            <p>
              <strong>Price: </strong>
              {book.price}
            </p>
            <p>
              Authors:{" "}
              {authors?.map((author) => {
                return (
                  <a key={author?.id} href={`/author/${author.id}`}>
                    {author?.firstName} {author.lastName}{" "}
                  </a>
                );
              })}
            </p>
            <p>
              Genres:{" "}
              {genres?.map((genre) => {
                return (
                  <a key={genre.id} href={`/genre/${genre.id}`}>
                    {genre.name}
                  </a>
                );
              })}
            </p>
            <p>
              Publisher:{" "}
              <a href={`/publisher/${publisher?.id}`}>{publisher?.name}</a>
            </p>
            <p>Publish Date: {book.publishDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
