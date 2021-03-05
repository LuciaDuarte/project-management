import React from 'react';
import { login } from '../services/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ setCurrentUser, history }) {
  const userRef = React.useRef();
  const passwordRef = React.useRef();

  const handleFormSubmission = event => {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passwordRef.current.value;

    login(username, password)
      .then(response => {
        setCurrentUser(response.data);
        history.push('/');
      })
      .catch(() => {
        toast.error('Invalid login');
      });
  };
  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <label>Username</label>
        <input type="text" ref={userRef} />
        <label>Password</label>
        <input type="password" ref={passwordRef} />
        <button>Login</button>
      </form>
      <p>
        Don't have an account?
        <Link to="/signup">SignUp</Link>
      </p>
    </>
  );
}

export default Login;
