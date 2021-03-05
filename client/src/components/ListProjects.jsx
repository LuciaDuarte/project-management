import React from 'react';
import { getAllProjects } from '../services/api';
import { Link } from 'react-router-dom';
import { Ul, Image } from '../styles/list';

function ListProjects() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    getAllProjects().then(response => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      <Ul primary>
        {projects.map(project => {
          return (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
              <Image src={project.imageUrl} alt="..." />
            </li>
          );
        })}
      </Ul>
    </div>
  );
}

/*
class ListProjects extends Component {
  state = {
    projects: []
  };
  componentDidMount() {
    getAllProjects().then(response => {
      this.setState({
        projects: response.data
      });
    });
  }
  render() {
    const { projects } = this.state;
    return (
      <ul>
        {projects.map(project => {
          return <li key={project.id}>{project.name}</li>;
        })}
      </ul>
    );
  }
}
*/
export default ListProjects;
