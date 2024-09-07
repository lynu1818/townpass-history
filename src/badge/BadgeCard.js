import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './BadgeCard.css';

export const BadgeCard = ({ date, name, image, info }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card 
      className="mb-4 mx-auto" 
      style={{ width: '18rem', height: '350px', cursor: 'pointer' }} 
      onClick={handleCardClick} 
    >
      {!isFlipped ? (
        <>
          <Card.Img variant="top" src={image} style={{ height: '225px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Date Collected: {date}</Card.Text>
            <Card.Text className="fade-text">點擊查看更多</Card.Text>
          </Card.Body>
        </>
      ) : (
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className='mby-5 justify-center items-center w-full max-h-full' style={{height: '300px', overflow: 'auto'} }>{info}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};
