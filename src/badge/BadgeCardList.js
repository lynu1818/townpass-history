import React from 'react';
import { BadgeCard } from './BadgeCard';
import bear1 from './bear1.jpg';
import bear2 from './bear2.jpg';
import bear3 from './bear3.jpg';
import bear4 from './bear4.jpg';

const cardData = [
  {
    id: 1,
    date: '2024-09-07',
    name: 'Sample Card 1',
    image: bear1,
    info: 'This is the detailed information about card 1.'
  },
  {
    id: 2,
    date: '2024-09-08',
    name: 'Sample Card 2',
    image: bear2,
    info: 'This is the detailed information about card 2.'
  },
  {
    id: 3,
    date: '2024-09-09',
    name: 'Sample Card 3',
    image: bear3,
    info: 'This is the detailed information about card 3.'
  },
  {
    id: 4,
    date: '2024-09-09',
    name: 'Sample Card 4',
    image: bear4,
    info: 'This is the detailed information about card 4.'
  },
];

const BadgeCardList = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      {cardData.map((card) => (
        <BadgeCard
          key={card.id}
          date={card.date}
          name={card.name}
          image={card.image}
          info={card.info}
        />
      ))}
    </div>
  );
};

export default BadgeCardList;
