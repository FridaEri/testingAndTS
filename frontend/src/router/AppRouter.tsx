import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import Explore from '../pages/explore';
import SignUp from '../pages/signUp';
import Home from '../pages/home';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import PrivateRoute from './privateRouter';
import MyAccount from '../pages/myAccount';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
        path="/home" 
        element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        } 
        />
        <Route path='/my-account' element={<MyAccount/>} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
