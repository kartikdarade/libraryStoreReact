import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = { username: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some(
      (user: any) => user.username === form.username
    );

    if (userExists || form.username === 'admin') {
      setErrors({ ...errors, username: 'Username already exists' });
      return;
    }

    const newUser = {
      username: form.username,
      password: form.password,
      role: 'user',
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}

        <button type="submit">Register</button>
        <p className='register-link'>Already Register? <span onClick={()=>navigate('/login')}>Login here</span></p>
      </form>
    </div>
  );
};

export default Register;
