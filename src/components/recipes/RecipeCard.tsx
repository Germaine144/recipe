import React from 'react';
import type { Recipe } from '@/types/recipe';
import { Clock, Users, Flame } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(recipe)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{recipe.cuisine}</p>
        <div className="flex justify-between text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} />
            <span>{recipe.caloriesPerServing} cal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
