import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { genreSelector } from "../../redux/slices/genre";
import { publisherSelector } from "../../redux/slices/publisher";
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

export const UpdatePublisher = () => {
  const id = useParams().id;
  const publisher = useSelector((state) =>
    publisherSelector.selectById(state, id)
  );

  const [imageUri, setImageUri] = React.useState(publisher?.image);
  const [form, setForm] = React.useState(publisher);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...form,
      id,
      image: imageUri,
    };

    fetch("/api/Publisher/" + id, {
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

  return (
    <div>
      <h1>Update Publisher</h1>
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
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <ImageUpload onImageUpload={setImageUri} imageUri={imageUri} />
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
