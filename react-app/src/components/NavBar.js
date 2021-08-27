
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user);


  return (
    <nav>
      <div className='nav_container'>
        <div className = 'nav_left'>
          { user ?
          <NavLink to='/home' exact={true} activeClassName='active'>
            Logo Here
          </NavLink>
          :
          <NavLink to='/' exact={true} activeClassName='active'>
            Logo Here
          </NavLink>
          }
        </div>
        <div className='nav_right'>
          {!user ? <>
              <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </div>
              <div>
                <NavLink to='/signup' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div>
              </>
              : <>
              <div>
                <LogoutButton />
              </div>
              <div>
                <NavLink to='/images/create' exact={true} activeClassName='active' >
                  post
                </NavLink>
              </div>
              </>
          }
        </div>
    </div>
    </nav>
  );
}

export default NavBar;
