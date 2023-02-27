import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authorSelector } from "../../redux/slices/author";
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

export const CreateBook = () => {
  const authors = useSelector(authorSelector.selectAll);
  const genres = useSelector(genreSelector.selectAll);
  const publishers = useSelector(publisherSelector.selectAll);

  const [imageUri, setImageUri] = React.useState("");
  const [form, setForm] = React.useState({
    title: "",
    publishDate: "",
    price: "",
    authorsId: [],
    genresId: [],
    publisherId: "",
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

    fetch("/api/Book", {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          toast.success("Book created successfully");
        } else {
          toast.error("Error creating book");
        }
      });
  };

  return (
    <div>
      <h1>Create Book</h1>
      <form>
        {inputs.map((input) => (
          <div key={input.id} className="form-group">
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              id={input.id}
              placeholder={input.placeholder}
              onChange={(e) => setForm({ ...form, [input.id]: e.target.value })}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <ImageUpload onImageUpload={setImageUri} />
        </div>
        <div className="form-group">
          <label htmlFor="authors">Authors</label>
          <select
            multiple
            className="form-control"
            id="authors"
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
