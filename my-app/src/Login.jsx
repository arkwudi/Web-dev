
import React, { useState } from 'react';
import './Login.css';
const validUsernames = ['Ark', 'Texas', 'Wishdel'];

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validUsernames.includes(username)) {
            localStorage.setItem('kanbanUser', username);
            onLogin(username);
        } else {
            alert('用户名不正确');
        }
    };

    return (
        <div className='login-page'>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <label>用户名:</label>
                    <input className='login-input'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="输入用户名"
                    />
                    <button className='login-button' type="submit">登录</button>
                </form>
            </div>
            <div className='username-info'>
                <p>用户名为:</p>
                <ul>
                    {validUsernames.map(name => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Login;
