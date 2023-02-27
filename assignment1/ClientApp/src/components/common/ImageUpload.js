import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const ImageUpload = ({ onImageUpload, imageUri = "" }) => {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function uploadImage() {
    if (!image) return;
    try {
      setLoading(true);
      const body = new FormData();
      const oldName = image.name;
      const newName = `${uuidv4().toString().split("-").pop()}.${oldName}`;

      const imageFile = new File([image], newName, { type: image.type });

      body.append("file", imageFile);
      const response = await fetch("/api/StorageApi", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      toast.success("Image uploaded successfully");
      onImageUpload(data?.image?.uri);
    } catch (error) {
      console.warn(error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <img
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
        src={image ? URL.createObjectURL(image) : imageUri}
        alt={image ? image.name : ""}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      {loading && <div>Uploading...</div>}
      <button
        onClick={(e) => {
          e.preventDefault();
          uploadImage();
        }}
      >
        Upload
      </button>
    </div>
  );
};
