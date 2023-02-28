import React from "react";
import { toast } from "react-toastify";

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

export const CreateGenre = () => {
  const [form, setForm] = React.useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/Genre", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.id) {
          toast.success("Genre created successfully");
        } else {
          toast.error("Error creating genre");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <h1>Create Genre</h1>
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
