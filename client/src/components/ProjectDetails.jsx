import React from 'react';
import { getProject, deleteProject } from '../services/api';
import { LoggedUserConsumer } from '../context/loggedUser';

function ProjectDetails({ match, history }) {
  const [project, setProject] = React.useState({
    id: '',
    title: '',
    description: ''
  });

  React.useEffect(() => {
    const id = match.params.id;
    getProject(id).then(response => {
      setProject({
        id: response.data._id,
        title: response.data.title,
        description: response.data.description
      });
    });
  }, [match.params.id]);

  const handleDeleteProject = id => {
    deleteProject(id).then(() => {
      history.push('/projects');
    });
  };

  const { id, title, description } = project;
  return title ? (
    <div>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <button onClick={() => handleDeleteProject(id)}>Delete</button>
      <button onClick={() => history.push(`/projects/${id}/edit`)}>Edit</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProjectDetails;
