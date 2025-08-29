import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList';
import { UserContext } from './contexts/UserContext';
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails'

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([])
  
  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
  
      setHoots(hootsData)
    };
    if (user) fetchAllHoots();
  }, [user]); //only run on component mount or user state changes
  
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
            <Route 
              path='/hoots/:hootId'
              element={<HootDetails />}
            />  
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
