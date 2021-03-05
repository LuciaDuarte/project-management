import React from 'react';
import { addProject, uploadFile } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProject({ history }) {
  const titleRef = React.useRef();
  const descriptionRef = React.useRef();
  // const fileRef = React.useRef();
  const [imageUrl, setImageUrl] = React.useState();

  const handleFormSubmission = event => {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const uploadData = new FormData();
    uploadData.append('file', imageUrl);

    uploadFile(uploadData).then(response => {
      let thisImageUrl = response.data.fileUrl;
      const newProject = { title, description, imageUrl: thisImageUrl };
      addProject(newProject).then(() => {
        toast.success('yeyyy');
        history.push('/projects');
      });
    });
  };

  const handleFileChange = event => {
    setImageUrl(event.target.files[0]);
  };

  return (
    <form onSubmit={handleFormSubmission} encType="multipart/form-data">
      <label>Title</label>
      <input type="text" ref={titleRef} />

      <label>Description</label>
      <input type="text" ref={descriptionRef} />

      <label>Image</label>
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProject;
