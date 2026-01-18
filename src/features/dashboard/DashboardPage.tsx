import React, { useState } from 'react';
import RecipeForm from './RecipeForm';

const DashboardPage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Recipes</h1>
      {isFormOpen && (
        <RecipeForm
          recipe={selectedRecipe}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedRecipe(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            setSelectedRecipe(null);
          }}
        />
      )}
    </div>
  );
};

export default DashboardPage;
