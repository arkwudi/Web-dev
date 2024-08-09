import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ username }) {
    const [avatar, setAvatar] = useState(localStorage.getItem(`${username}-avatar`) || `/public/${username}.jpg`);
    const [showMenu, setShowMenu] = useState(false);

    const handleAvatarClick = () => {
        setShowMenu(!showMenu);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newAvatar = e.target.result;
                setAvatar(newAvatar);
                localStorage.setItem(`${username}-avatar`, newAvatar);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSwitchAccount = () => {
        // Logic to switch account (redirect to login page)
        window.location.reload();
    };

    return (
        <div className="user-profile">
            <img src={avatar} alt="Avatar" onClick={handleAvatarClick} className="avatar" />
            <span className="username">{username}</span>
            {showMenu && (
                <div className="menu">
                    <label className="menu-item">
                        Change Avatar
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>
                    <button className="menu-item" onClick={handleSwitchAccount}>Switch Account</button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
