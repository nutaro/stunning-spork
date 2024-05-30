'use client';
import React from 'react';
import axios from "axios";

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        axios.post("http://localhost:8000/videos", {"filename": "sample.mp4"}
        ).then(response => {
            const data = response.data;
            console.log(data.fields)
            const formData = new FormData();

            // Update the formData object
            formData.append(
                "file",
                this.state.selectedFile
            );

            // Object.entries(data.fields).forEach((entry) => {
            //     const [key, value] = entry;
            //     console.log(`${key}: ${value}`);
            //     formData.append(key, value);
            // });

            formData.append("data", JSON.stringify(data.fields));
            axios.post(data.url, formData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });


        }).catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <h3>File Upload using React!</h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
            </div>
        );
    }
}

export default FileUpload;