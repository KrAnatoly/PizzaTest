import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import employees from './employees.json';
import { allEmployeesAC } from './reducers/employeesAC'
import Mainpage from './Mainpage/Mainpage';
import NotFoundPage from './NotFoundPage/NotFoundPage'
import Updatepage from './Updatepage/Updatepage';

function App() {
  const dispatch = useDispatch();
  const fetchEmployees = () => {
    dispatch(allEmployeesAC(employees))
  }
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/employee/:employeeId" element={<Updatepage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
