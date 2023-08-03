import React from 'react';
import './App.css';
// import Login from '../src/components/login-screen';
import CustomerList from '../src/components/customer-list1'
import Login from './components/login-screen';
import CreateCustomer from './components/create-customer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import CustomerList1 from './components/customer-list1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />}/>
      <Route exact path="/customer-list1" element={<CustomerList />}/>
      <Route exact path="/create-customer" element={<CreateCustomer />}/>
      </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
