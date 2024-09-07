import React from 'react';
import spots from '../map/Spot'; // Import the spot data
import { BadgeCard } from './BadgeCard'; // Import BadgeCard component

const BadgePage = () => (
  <div className="p-5">
    <h1 className="text-2xl font-bold">徽章搜集</h1>
    <p>This is the Badge page content.</p>
    <div className="d-flex flex-column align-items-center">
      {spots.map((spot, index) => (
        <BadgeCard
          key={index}
          name={spot.name}
          info={spot.detail} // Passing the spot detail as the card info
        />
      ))}
    </div>
  </div>
);

export default BadgePage;
