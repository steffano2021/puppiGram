import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';

// redux store
import { authenticate } from './store/session';
import { fetchAllImages } from './store/image';

// component pages
import HomePage from './components/home/homePage';
import ImagePostForm from './components/image/postImagePage';
import SplashPage from './components/splash/splashPage';
import EditImageForm from './components/image/editImagePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(fetchAllImages());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <NavBar />
          <SplashPage />
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <NavBar />
          <HomePage />
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/images/create' exact={true}>
          <NavBar />
          <ImagePostForm />
        </Route>
        <Route path='/images/edit/:id' exact={true}>
          <NavBar />
          <EditImageForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
