import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {

  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth_background'>
    <div className='auth_container'>
      <img className='auth-photo' src='https://i.imgur.com/pOT9xDs.jpg' alt='signup-photo' />
      <div className='auth-photo-text'>
        <p>Glad you're back</p>
        <p>Let's see what you missed out</p>
      </div>
      <div className='auth_form_container'>
      <form onSubmit={onLogin}>
        <div className='auth-form-logo'>
            <div>puppiGram</div>
            <div>Log in to your account</div>
        </div>
        <div className='auth-form-input_container'>
          <i class="fas fa-envelope" />
          <input
          name='email'
          type='text'
          placeholder='email'
          value={email}
          onChange={updateEmail}
          />
        </div>
        <div className='auth-form-input_container'>
          <i class="fas fa-key" />
          <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={updatePassword}
          />
        </div>
        <div className='auth-form-btn_container'>
          <button type='submit'>Login</button>
          <button type='button' onClick={() => history.push('/signup')} >Sign up</button>
          <button type='button' onClick={() => history.push('/')} >Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;
