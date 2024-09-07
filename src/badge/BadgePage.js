import React from 'react';
import BadgeCardList from './BadgeCardList';

const BadgePage = () => (
  <div>
    <h1 className="text-2xl font-bold">你的徽章</h1>
    <p>快來收集到台北的城市徽章吧～</p>
    <BadgeCardList />
  </div>
);

export default BadgePage;