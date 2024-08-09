import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ id, title: initialTitle, content: initialContent, onDelete, onUpdate }) {
    const [titleValue, setTitleValue] = useState(initialTitle);
    const [contentValue, setContentValue] = useState(initialContent);

    // 监听 titleValue 和 contentValue 的变化，及时通知父组件更新
    useEffect(() => {
        onUpdate(id, titleValue, contentValue);
    }, [id, titleValue, contentValue, onUpdate]);

    return (
        <div className="card">
            <input
                className="card-title"
                type="text"
                placeholder="标题"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
            />
            <textarea
                className="card-content"
                placeholder="正文"
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
            />
            <button className="delete-button" onClick={() => onDelete(id)}>
                删除
            </button>
        </div>
    );
}

export default Card;
