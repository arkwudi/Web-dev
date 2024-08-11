import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ id, title: initialTitle, content: initialContent, onDelete, onUpdate, isModalOpen, setModalOpen }) {
    const [titleValue, setTitleValue] = useState(initialTitle);
    const [contentValue, setContentValue] = useState(initialContent);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        
        const savedAttachments = JSON.parse(localStorage.getItem(`card_${id}_attachments`)) || [];
        setAttachments(savedAttachments);
    }, [id]);

    useEffect(() => {
        
        localStorage.setItem(`card_${id}_attachments`, JSON.stringify(attachments));
    }, [attachments, id]);

    const handleModalOpen = () => {
        setModalOpen(id);
    };

    const handleModalClose = () => {
        setModalOpen(null);
        onUpdate(id, titleValue, contentValue);
    };

    const handleAddAttachment = (event) => {
        const files = Array.from(event.target.files);
        const newAttachments = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        name: file.name,
                        data: reader.result
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newAttachments).then(results => {
            setAttachments(prev => [...prev, ...results]);
        });
    };

    return (
        <div>
            <div className={`card ${isModalOpen && isModalOpen !== id ? 'card-hidden' : ''}`} onClick={handleModalOpen}>
                <input
                    className="card-title"
                    type="text"
                    placeholder="标题"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    readOnly
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

            
            {isModalOpen === id && (
                <div className="modal-overlay fullscreen-modal" onClick={handleModalClose}>
                    <div className="modal-content fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={handleModalClose}>×</button>
                        <input
                            className="modal-title"
                            type="text"
                            placeholder="标题"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                        />
                        <textarea
                            className="modal-content"
                            placeholder="正文"
                            value={contentValue}
                            onChange={(e) => setContentValue(e.target.value)}
                        />
                        <input
                            type="file"
                            multiple
                            onChange={handleAddAttachment}
                            style={{ marginBottom: '10px' }}
                        />
                        <div className="attachments">
                            {attachments.map((file, index) => (
                                <div key={index} className="attachment">
                                    <a href={file.data} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
