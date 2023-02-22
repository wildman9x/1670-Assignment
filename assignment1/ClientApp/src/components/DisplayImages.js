import React, { Component } from "react";

export class DisplayImages extends Component {
  static displayName = DisplayImages.name;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      images: [],
    };
    this.getImage = this.getImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    this.getImage();
  }

  renderImagesTable(images) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.name}>
              <td>
                <img
                  style={{
                    width: "200px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  src={image.uri}
                  alt={image.name}
                />
              </td>
              <td>
                <button onClick={() => this.deleteImage(image.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>Loading...</p>
    ) : (
      this.renderImagesTable(this.state.images)
    );
    return (
      <div>
        <h1 id="tabelLabel">Upload Image</h1>
        {contents}
      </div>
    );
  }

  async getImage() {
    try {
      this.setState({ loading: true });
      const response = await fetch("/api/StorageApi", {
        method: "GET",
      });
      const data = await response.json();
      this.setState({ images: data });
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ loading: false });
    }
  }
  async deleteImage(filename) {
    try {
      this.setState({ loading: true });
      await fetch(`/api/StorageApi/${filename}`, {
        method: "DELETE",
      });
      const images = this.state.images.filter(
        (image) => image.name !== filename
      );
      this.setState({ images: images });
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ loading: false });
    }
  }
}
