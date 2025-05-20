import './App.css';
import {Routes, Route, Navigate, BrowserRouter, useLocation} from 'react-router-dom';
import Register from './pages/Register.tsx';
import React from 'react';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Navbar from './pages/Navbar.tsx';
import BookDetails from './pages/BookDetails.tsx';
import MyBooks from './pages/MyBooks.tsx';
import AdminHome from './pages/AdminHome.tsx';
import AddBook from './pages/AddBook.tsx';

const App = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
    {!hideNavbar && <Navbar /> }
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/add-book' element={<AddBook />} />
    </Routes>
    </>
  );
}

export default App;
