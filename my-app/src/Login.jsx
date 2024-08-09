
import React, { useState } from 'react';

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
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <label>用户名:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="输入用户名"
                />
                <button type="submit">登录</button>
            </form>
        </div>
    );
}

export default Login;
