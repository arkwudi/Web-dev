import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import InnerContainer from './components/InnerContainer';
import Login from './Login';
import Avatar from './components/Avatar';

function App() {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('kanbanUser') || '');
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const [projectName, setProjectName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentUser) {
            // Load project name for the current user
            const savedProjectName = localStorage.getItem(`projectName_${currentUser}`) || '';
            setProjectName(savedProjectName);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            // Save project name for the current user
            localStorage.setItem(`projectName_${currentUser}`, projectName);
        }
    }, [projectName, currentUser]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogin = (username) => {
        setCurrentUser(username);
    };

    const handleSwitchAccount = () => {
        setCurrentUser('');
        localStorage.removeItem('kanbanUser');
        setShowPopup(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleNameBlur = () => {
        setIsEditing(false);
    };

    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="app">
            <div className="sidebar">
                <Avatar currentUser={currentUser} />
                <div className="username-container">
                    <div onClick={togglePopup} className="username">
                        {currentUser}
                    </div>
                    {showPopup && (
                        <div className="popup" ref={popupRef} onClick={handleSwitchAccount}>
                            切换账号
                        </div>
                    )}
                </div>
            </div>
            <div className="main-content">
                <div className="top-bar">
                    <h2>
                        项目:
                        {isEditing ? (
                            <input
                                type="text"
                                value={projectName}
                                onChange={handleNameChange}
                                onBlur={handleNameBlur}
                                autoFocus
                                className="project-name-input"
                            />
                        ) : (
                            <span
                                className={`project-name ${!projectName && 'placeholder'}`}
                                onClick={() => setIsEditing(true)}
                            >
                                {projectName || '名称'}
                            </span>
                        )}
                    </h2>
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
