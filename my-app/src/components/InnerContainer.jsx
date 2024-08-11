import React, { useState, useEffect } from 'react';
import Card from './Card';
import './InnerContainer.css';

function InnerContainer({ currentUser,column}) {
    const [cards, setCards] = useState([]);
    const [modalCardId, setModalCardId] = useState(null);

    useEffect(() => {
        
        const storedCards = localStorage.getItem(`${currentUser}_${column}_cards`);
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, [currentUser, column]); 


    useEffect(() => {
        
        localStorage.setItem(`${currentUser}_${column}_cards`, JSON.stringify(cards));
    }, [cards, currentUser, column]); 

    const addCard = () => {
        const newCard = { id: Date.now(), title: '', content: '' };
        setCards([...cards, newCard]);
    };

    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const updateCardText = (id, newTitle, newContent) => {
        setCards(cards.map(card =>
            card.id === id ? { ...card, title: newTitle, content: newContent } : card
        ));
    };

    return (
        <div className="inner-container">
            {cards.map(card => (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    content={card.content}
                    onDelete={deleteCard}
                    onUpdate={updateCardText}
                    isModalOpen={modalCardId}
                    setModalOpen={setModalCardId}
                
                />
            ))}
            <button className = 'add-button'onClick={addCard}>+ 添加</button>
        </div>
    );
}

export default InnerContainer;
