import React, { Component } from "react";

export class UploadImage extends Component {
  static displayName = UploadImage.name;

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: false,
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {}

  renderImageInput() {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            this.setState({ image: e.target.files[0] });
          }}
        />
        <button onClick={this.uploadImage}>Upload</button>
      </div>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>Loading...</p>
    ) : (
      this.renderImageInput()
    );
    return (
      <div>
        <h1 id="tabelLabel">Upload Image</h1>
        {contents}
      </div>
    );
  }

  async uploadImage() {
    if (!this.state.image) return;
    try {
      this.setState({ loading: true });
      const body = new FormData();
      body.append("file", this.state.image);
      const response = await fetch("/api/StorageApi", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ loading: false });
    }
  }
}
