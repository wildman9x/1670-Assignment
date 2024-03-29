import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authorSelector } from "../../redux/slices/author";
import { ImageUpload } from "../common/ImageUpload";

const inputs = [
  {
    label: "First Name",
    type: "text",
    id: "firstName",
    placeholder: "Enter first name",
  },
  {
    label: "Last Name",
    type: "text",
    id: "lastName",
    placeholder: "Enter last name",
  },
  {
    label: "Birth Date",
    type: "date",
    id: "birthDate",
    placeholder: "Enter birth date",
  },
  {
    label: "Birth Place",
    type: "text",
    id: "birthPlace",
    placeholder: "Enter birth place",
  },
  {
    label: "Death Date",
    type: "date",
    id: "deathDate",
    placeholder: "Enter death date",
  },
  {
    label: "Death Place",
    type: "text",
    id: "deathPlace",
    placeholder: "Enter death place",
  },
  {
    label: "Biography",
    type: "text",
    id: "biography",
    placeholder: "Enter biography",
  },
];

export const UpdateAuthor = () => {
  const id = useParams().id;
  const author = useSelector((state) => authorSelector.selectById(state, id));

  const [imageUri, setImageUri] = React.useState(author?.image);
  const [form, setForm] = React.useState(author);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      id,
      image: imageUri,
      ...form,
    };

    fetch("/api/Author/" + id, {
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
          toast.success("Author update successfully");
          window.location.href = "/author/" + id;
        } else {
          toast.error("Error updating author");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <h1>Update Author</h1>
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
          <ImageUpload imageUri={imageUri} onImageUpload={setImageUri} />
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
