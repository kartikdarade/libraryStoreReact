import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const adminExists = existingUsers.some((u:any)=> u.username === 'admin');

        if(!adminExists)
        {
            const adminUser = {
                username : 'admin',
                password : 'admin123',
                role : 'admin'
            };
            localStorage.setItem('users', JSON.stringify([...existingUsers, adminUser]))
        }
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const { username, password } = formData;

        // // Admin (hardcoded)
        // if (username === 'admin' && password === 'admin123') {
        //     localStorage.setItem('userRole', 'admin');
        //     localStorage.setItem('currentUser', 'admin');
        //     navigate('/admin');
        //     return;
        // }

        // Check registered users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const matchedUser = users.find(
            (user: any) => user.username === username && user.password === password
        );

        if (matchedUser) {
            const role = matchedUser.role || 'user';
            localStorage.setItem('userRole', role);
            localStorage.setItem('currentUser', matchedUser.username);

            if(role === 'admin')
            {
                navigate('/admin');
            } else {
                navigate('/home')
            }
        } else {
            setInvalid(true);
        }
    };

    return (
        <div className="login-container">
            <h1>Library Portal</h1>
            <h2>Login</h2>
            {invalid && <div className="error">Invalid credentials</div>}
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Username:</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit">Login</button>
                <p className='register-link'>New User? <span onClick={()=>navigate('/register')}>Register here</span></p>
            </form>
        </div>
    );
};

export default Login;