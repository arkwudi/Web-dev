import React from 'react';
import './InnerContainer.css';
import Card from './Card';

function InnerContainer() {
    return (
        <div className="inner-container">
            <Card title="Card 1" content="Content for card 1." />
            <Card title="Card 2" content="Content for card 2." />
            <button className="add-button">+ 添加</button>
        </div>
    );
}

export default InnerContainer;
