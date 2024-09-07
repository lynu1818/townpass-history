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
      className="justify-center items-center mb-4 mx-auto" 
      style={{ width: '18rem', height: '350px', cursor: 'pointer' }} 
      onClick={handleCardClick} 
    >
      {!isFlipped ? (
        <>
          <Card.Img variant="top" src={image} style={{ marginLeft: '50px', height: '175px', width:'175px' }} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>收集: {date}</Card.Text>
            <Card.Text className="fade-text">點擊查看更多</Card.Text>
          </Card.Body>
        </>
      ) : (
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className='by-10' style={{height: '275px', overflow: 'auto'} }>{info}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};
