import React from "react";
import { toast } from "react-toastify";
import { ImageUpload } from "../common/ImageUpload";

const inputs = [
  {
    label: "Name",
    type: "text",
    id: "name",
    placeholder: "Enter name",
  },
  {
    label: "Address",
    type: "text",
    id: "address",
    placeholder: "Enter address",
  },
  {
    label: "Country",
    type: "text",
    id: "country",
    placeholder: "Enter country",
  },
  {
    label: "Phone",
    type: "text",
    id: "phone",
    placeholder: "Enter phone",
  },
];

export const CreatePublisher = () => {
  const [imageUri, setImageUri] = React.useState("");
  const [form, setForm] = React.useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...form,
      image: imageUri,
    };

    fetch("/api/Publisher", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.id) {
          toast.success("Publisher created successfully");
        } else {
          toast.error("Error creating Publisher");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <h1>Create Publisher</h1>
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
