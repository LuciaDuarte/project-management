import React from 'react';
import { NavLink } from 'react-router-dom';

import { logout } from '../services/auth';

function NavBar({ user, setCurrentUser, history }) {
  const logoutUser = () => {
    logout().then(() => {
      setCurrentUser(null);
      // history.push('/');
    });
  };
  return user ? (
    <>
      <p>Welcome, {user.username}</p>
      <ul>
        <li>
          <NavLink to="/">
            <button onClick={logoutUser}>Logout</button>
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/projects">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/projects/add">
            Add Projects
          </NavLink>
        </li>
      </ul>
    </>
  ) : (
    <>
      <ul>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/login-google">
            Login with Google
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/signup">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: 'red' }} exact to="/projects">
            Projects
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
