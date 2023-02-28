import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { genreSelector } from "../../redux/slices/genre";

const inputs = [
  {
    label: "Name",
    type: "text",
    id: "name",
    placeholder: "Enter name",
  },
  {
    label: "Description",
    type: "text",
    id: "description",
    placeholder: "Enter description",
  },
];

export const UpdateGenre = () => {
  const id = useParams().id;
  const genre = useSelector((state) => genreSelector.selectById(state, id));

  const [form, setForm] = React.useState(genre);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      id,
      ...form,
    };

    fetch("/api/Genre/" + id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);

        if (data.status === 204) {
          toast.success("Genre update successfully");
          window.location.href = "/genre/" + id;
        } else {
          toast.error("Error updating Genre");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch("/api/Genre/" + id, {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Update Genre</h1>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <form>
        {inputs.map((input) => {
          let value = form[input.id];
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
