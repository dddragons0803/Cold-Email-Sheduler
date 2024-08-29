import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { Provider,useDispatch } from 'react-redux';
import { checkAuth } from './features/workflow/authSlice';// Action to check auth

import Workflow from './Components/Workflow/Workflow';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
// import Profile from './Components/Auth/Profile';
import PrivateRoute from './Components/Auth/PrivateRoute';
import './styles/tailwind.css';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // Check authentication status on app load
  }, [dispatch]);


  return (
    
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Workflow />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
