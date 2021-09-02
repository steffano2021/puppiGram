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
import { fetchAllComments } from './store/comment';

// component pages
import HomePage from './components/home/homePage';
import ImagePostForm from './components/image/postImagePage';
import SplashPage from './components/splash/splashPage';
import EditImageForm from './components/image/editImagePage';
import ImageDetailsPage from './components/imageDetails/imageDetails';
import Footer from './components/footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(fetchAllImages());
      await dispatch(fetchAllComments());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <Footer />
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
        <ProtectedRoute path='/images/create' exact={true}>
          <NavBar />
          <ImagePostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/images/edit/:id' exact={true}>
          <NavBar />
          <EditImageForm />
        </ProtectedRoute>
        <ProtectedRoute path='/images/details/:id' exact={true}>
          <NavBar />
          <ImageDetailsPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
