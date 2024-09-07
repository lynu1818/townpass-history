import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './BadgeCard.css'; // Import CSS for the flip effect

export const BadgeCard = ({ date, name, image, info }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card mb-4 mx-auto`} 
      style={{ width: '18rem', height: '350px' }} 
      onClick={handleCardClick}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <Card style={{ width: '18rem', height: '350px' }}>
            <Card.Img variant="top" src={image} style={{ height: '225px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>Date Collected: {date}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="flip-card-back">
          <Card style={{ width: '18rem', height: '350px' }}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text style={{ height: '200px', overflow: 'auto' }}>{info}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
