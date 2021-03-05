import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListProjects from './components/ListProjects';
import ProjectDetails from './components/ProjectDetails';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
//import { LoggedUserProvider } from './context/loggedUser';

import { loggedin } from './services/auth';

import { ToastContainer } from 'react-toastify';

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const setCurrentUser = user => {
    setLoggedInUser(user);
  };

  React.useEffect(() => {
    if (!loggedInUser) {
      loggedin().then(response => {
        if (response.data._id) {
          setCurrentUser(response.data);
        }
      });
    }
  }, [loggedInUser]);

  return (
    <div className="App">
      <ToastContainer />
      <NavBar user={loggedInUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path={['/', '/projects']} component={ListProjects} />
        {/* <Route exact path="/projects/add" component={AddProject} /> */}
        <PrivateRoute exact path="/projects/add" component={AddProject} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route exact path="/projects/:id/edit" component={EditProject} />
        <Route
          exact
          path="/login"
          render={props => {
            return <Login {...props} setCurrentUser={setCurrentUser} />;
          }}
        />
        <Route
          exact
          path="/login-google"
          render={() => {
            window.location.href = `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`;
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return <Signup {...props} setCurrentUser={setCurrentUser}></Signup>;
          }}
        />
      </Switch>
    </div>
  );
}
// class App extends React.Component {
//   state = {
//     loggedInUser: null
//   };

//   setCurrentUser = user => {
//     this.setState({
//       loggedInUser: user
//     });
//   };

//   componentDidMount() {
//     if (!this.state.loggedInUser) {
//       loggedin().then(response => {
//         if (response.data._id) {
//           this.setCurrentUser(response.data);
//         }
//       });
//     }
//   }
//   render() {
//     const { loggedInUser } = this.state;
//     return (
//       <div className="App">
//         <ToastContainer />
//         <NavBar user={loggedInUser} setCurrentUser={this.setCurrentUser} />
//         <Switch>
//           <Route exact path={['/', '/projects']} component={ListProjects} />
//           <Route exact path="/projects/add" component={AddProject} />
//           <Route exact path="/projects/:id" component={ProjectDetails} />
//           <Route exact path="/projects/:id/edit" component={EditProject} />
//         </Switch>
//       </div>
//     );
//   }
// }

export default App;
