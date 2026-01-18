import React from 'react';
import Hero from './Hero';
import RecipesList from './RecipesList';

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div>
      <Hero onSearch={setSearchQuery} />
      <RecipesList searchQuery={searchQuery} />
    </div>
  );
};

export default LandingPage;