import React from 'react';
import { signup } from '../services/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup({ setCurrentUser, history }) {
  const userRef = React.useRef();
  const passwordRef = React.useRef();

  const handleFormSubmission = event => {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passwordRef.current.value;

    signup(username, password)
      .then(response => {
        setCurrentUser(response.data);
        history.push('/');
      })
      .catch(() => {
        toast.error('Invalid signup');
      });
  };
  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <label>Username</label>
        <input type="text" ref={userRef} />
        <label>Password</label>
        <input type="password" ref={passwordRef} />
        <button>Signup</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </>
  );
}

export default Signup;
