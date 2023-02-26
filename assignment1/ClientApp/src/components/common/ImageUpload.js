import React from "react";

export const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function uploadImage() {
    if (!image) return;
    try {
      setLoading(true);
      const body = new FormData();
      body.append("file", image);
      const response = await fetch("/api/StorageApi", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      onImageUpload(data?.image?.uri);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <img
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
        src={image ? URL.createObjectURL(image) : ""}
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
