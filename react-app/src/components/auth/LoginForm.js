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
      console.log(errors)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async() => {
    const data = await dispatch(login('demo@aa.io', 'password'));
  }

  if (user) {
    return <Redirect to='/home' />;
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
        <div className='auth-form-logo_login'>
            <div>puppiGram</div>
            <div>Log in to your account</div>
        </div>
        <div className='auth-form-input_container'>
          <span className='error-login'>{errors?.email}</span>
          <i className="fas fa-envelope" />
          <input
          name='email'
          type='text'
          placeholder='email'
          value={email}
          onChange={updateEmail}
          />
        </div>
        <div className='auth-form-input_container'>
          <span className='error-login'>{errors?.password}</span>
          <i className="fas fa-key" />
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
        <div className='demo-btn_container'>
          <button type='button' onClick={demoLogin} >Demo user</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;
