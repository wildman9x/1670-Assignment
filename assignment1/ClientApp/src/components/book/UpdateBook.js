import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authorSelector } from "../../redux/slices/author";
import { booksSelector } from "../../redux/slices/book";
import { genreSelector } from "../../redux/slices/genre";
import { publisherSelector } from "../../redux/slices/publisher";
import { ImageUpload } from "../common/ImageUpload";

const inputs = [
  {
    label: "Title",
    type: "text",
    id: "title",
    placeholder: "Enter title",
  },
  {
    label: "Publish Date",
    type: "date",
    id: "publishDate",
    placeholder: "Enter publish date",
  },
  {
    label: "Price",
    type: "number",
    id: "price",
    placeholder: "Enter price",
  },
];

export const UpdateBook = () => {
  const id = useParams().id;
  const book = useSelector((state) => booksSelector.selectById(state, id));
  console.log(book);
  const authorsId = book?.authorsId?.map((author) => author?.authorId);
  const genresId = book?.genresId?.map((genre) => genre?.genreId);
  const publisherId = book?.publisherId;

  const authors = useSelector(authorSelector.selectAll);
  const genres = useSelector(genreSelector.selectAll);
  const publishers = useSelector(publisherSelector.selectAll);

  const [imageUri, setImageUri] = React.useState(book.image);
  const [form, setForm] = React.useState({
    title: book.title,
    publishDate: book.publishDate,
    price: book.price,
    authorsId: authorsId,
    genresId: genresId,
    publisherId: publisherId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorsId = form.authorsId.map((authorId) => ({ authorId }));
    const genresId = form.genresId.map((genreId) => ({ genreId }));

    const book = {
      ...form,
      image: imageUri,
      authorsId,
      genresId,
    };

    console.log(book);

    fetch(`/api/Book/${id}`, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          toast.success("Book Update successfully");
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`/api/Book/${id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      if (response.status === 204) {
        toast.success("Book Delete successfully");
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Create Book</h1>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <form>
        {inputs.map((input) => {
          let value = form[input.id];
          if (input.type === "date") {
            value = value?.split("T")[0];
          }
          return (
            <div key={input.id} className="form-group">
              <label htmlFor={input.id}>{input.label}</label>
              <input
                type={input.type}
                className="form-control"
                id={input.id}
                defaultValue={value}
                placeholder={input.placeholder}
                onChange={(e) =>
                  setForm({ ...form, [input.id]: e.target.value })
                }
              />
            </div>
          );
        })}
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <ImageUpload onImageUpload={setImageUri} imageUri={imageUri} />
        </div>
        <div className="form-group">
          <label htmlFor="authors">Authors</label>
          <select
            multiple
            className="form-control"
            id="authors"
            defaultValue={form.authorsId}
            onChange={(e) =>
              setForm({
                ...form,
                authorsId: Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                ),
              })
            }
          >
            {authors?.map(
              (author) =>
                author && (
                  <option key={author.id} value={author.id}>
                    {author.firstName} {author.lastName}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="genres">Genres</label>
          <select
            multiple
            className="form-control"
            id="genres"
            defaultValue={form.genresId}
            onChange={(e) =>
              setForm({
                ...form,
                genresId: Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                ),
              })
            }
          >
            {genres?.map(
              (genre) =>
                genre && (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="genres">Publisher</label>
          <select
            className="form-control"
            id="genres"
            defaultValue={form.publisherId}
            onChange={(e) =>
              setForm({
                ...form,
                publisherId: parseInt(e.target.value),
              })
            }
          >
            <option value="">Select publisher</option>
            {publishers?.map(
              (publisher) =>
                publisher && (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                )
            )}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
