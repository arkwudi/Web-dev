import React, { useState, useEffect } from 'react';
import Card from './Card';  // 引入 Card 组件

function InnerContainer({ currentUser, column }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // 从 localStorage 中获取当前用户的特定列的看板数据
        const storedCards = localStorage.getItem(`${currentUser}_${column}_cards`);
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, [currentUser, column]);

    useEffect(() => {
        // 将当前用户的特定列的卡片数据保存到 localStorage
        localStorage.setItem(`${currentUser}_${column}_cards`, JSON.stringify(cards));
    }, [cards, currentUser, column]);

    const addCard = () => {
        const newCard = { id: Date.now(), title: '', content: '' };
        setCards([...cards, newCard]);
    };

    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const updateCard = (id, newTitle, newContent) => {
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
                    onUpdate={updateCard} // 传递 updateCard 方法
                />
            ))}
            <button onClick={addCard}>+ 添加</button>
        </div>
    );
}

export default InnerContainer;
