import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // default role can be 'user' or any other

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:9001/api/users/register', { username, password, role });
            // Redirect to login page
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                placeholder="Role (e.g., user, admin)" 
            />
                
            
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default SignupPage;
