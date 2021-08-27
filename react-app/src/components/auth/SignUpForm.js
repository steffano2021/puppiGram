import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {

  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='auth_background'>
    <div className='auth_container'>
      <img className='auth-photo' src='https://i.imgur.com/oPmbxlg.jpg' alt='signup-photo' />
      <div className='auth-photo-text'>
        <p>Fall in love with dogs, Again</p>
        <p>Join our family, Today</p>
      </div>
      <div className='auth_form_container'>
        <form onSubmit={onSignUp} className='auth-form'>
          <div className='auth-form-logo'>
            <div>puppiGram</div>
            <div>Sign up to your account</div>
          </div>
          <div className='auth-form-input_container'>
              <i class="fas fa-user" />
              <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='username'
              ></input>
          </div>
          <div className='auth-form-input_container'>
            <i class="fas fa-envelope" />
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='email'
              ></input>
          </div>
          <div className='auth-form-input_container'>
          <i class="fas fa-key" />
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='password'
              ></input>
          </div>
          <div className='auth-form-input_container'>
          <i class="fas fa-key" />
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='confirm password'
              ></input>
          </div>
          <div className='auth-form-btn_container'>
          <button type='submit'>Sign Up</button>
          <button type='button' onClick={() => history.push('/login')} >Log in</button>
          <button type='button' onClick={() => history.push('/')} >Cancel</button>
          </div>
        </form>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;

{/* <div>
  {errors.map((error, ind) => (
    <div key={ind}>{error}</div>
    ))}
  </div> */}
