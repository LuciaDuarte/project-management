import React from 'react';
import { updateProject, getProject } from '../services/api';

function EditProject({ history, match }) {
  const titleRef = React.useRef();
  const descriptionRef = React.useRef();

  React.useEffect(() => {
    const id = match.params.id;
    getProject(id).then(response => {
      titleRef.current.value = response.data.title;
      descriptionRef.current.value = response.data.description;
    });
  }, [match.params.id]);

  const handleFormSubmission = event => {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const id = match.params.id;

    const updatedProject = { title, description, id };

    updateProject(updatedProject).then(() => {
      history.push('/projects');
    });
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <label>Title</label>
      <input type="text" ref={titleRef} />

      <label>Description</label>
      <input type="text" ref={descriptionRef} />

      <button type="submit">Update Project</button>
    </form>
  );
}

export default EditProject;
