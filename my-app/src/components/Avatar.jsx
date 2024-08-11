import React from 'react';
import './Avatar.css';

function Avatar({ currentUser }) {
    const avatarSrc = `/Web-dev/${currentUser}.jpg`;  

    return (
        <div className="avatar-container">
            <img src={avatarSrc} alt={`${currentUser} avatar`} className="avatar-image" />
        </div>
    );
}


export default Avatar;
