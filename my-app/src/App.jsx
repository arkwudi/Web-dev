import React, { useState, useEffect } from 'react';
import './main.css';
import InnerContainer from './components/InnerContainer';
import Login from './Login';

function App() {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('kanbanUser') || '');

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('kanbanUser', currentUser);
        }
    }, [currentUser]);

    const handleLogin = (username) => {
        setCurrentUser(username);
    };

    const handleSwitchAccount = () => {
        setCurrentUser('');
        localStorage.removeItem('kanbanUser');
    };

    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="app">
            <div className="sidebar">
                <div onClick={handleSwitchAccount}>
                    {currentUser}（点击切换账号）
                </div>
            </div>
            <div className="main-content">
                <div className="top-bar">
                    <h2>项目</h2>
                </div>
                <div className="content">
                    <div>
                        <h2 className='todo'>To do</h2>
                        <InnerContainer currentUser={currentUser} column="todo" />
                    </div>
                    <div>
                        <h2 className='doing'>Doing</h2>
                        <InnerContainer currentUser={currentUser} column="doing" />
                    </div>
                    <div>
                        <h2 className='done'>Done</h2>
                        <InnerContainer currentUser={currentUser} column="done" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
