import React from "react";
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

export const CreateAuthor = () => {
  const [imageUri, setImageUri] = React.useState("");
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    deathDate: "",
    deathPlace: "",
    biography: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...form,
      image: imageUri,
    };

    fetch("/api/Author", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <h1>Create Author</h1>
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
