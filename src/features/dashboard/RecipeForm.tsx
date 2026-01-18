import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '@/api/recipesApi';
import { X } from 'lucide-react';
import type { Recipe } from '@/types/recipe';

const recipeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cuisine: z.string().min(1, 'Cuisine is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  prepTimeMinutes: z.number().min(1, 'Prep time is required'),
  cookTimeMinutes: z.number().min(1, 'Cook time is required'),
  servings: z.number().min(1, 'Servings is required'),
  caloriesPerServing: z.number().min(1, 'Calories is required'),
  tags: z.string().transform(str => str.split(',').map(tag => tag.trim())),
  ingredients: z.string().transform(str => str.split('\n').map(ing => ing.trim())),
  instructions: z.string().transform(str => str.split('\n').map(step => step.trim())),
  image: z.string().url('Valid URL required'),
});

interface RecipeFormProps {
  recipe?: Recipe | null;
  onClose: () => void;
  onSuccess: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onClose, onSuccess }) => {
  const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
  
  const isEditing = !!recipe;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipe ? {
      name: recipe.name,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      servings: recipe.servings,
      caloriesPerServing: recipe.caloriesPerServing,
      tags: recipe.tags.join(', '),
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      image: recipe.image,
    } : undefined,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEditing && recipe) {
        await updateRecipe({ id: recipe.id, updates: data }).unwrap();
      } else {
        await createRecipe(data).unwrap();
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save recipe:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name *
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter recipe name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine *
              </label>
              <input
                {...register('cuisine')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Italian, Mexican"
              />
              {errors.cuisine && (
                <p className="mt-1 text-sm text-red-600">{errors.cuisine.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                {...register('difficulty')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prep Time (min) *
                </label>
                <input
                  {...register('prepTimeMinutes', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.prepTimeMinutes && (
                  <p className="mt-1 text-sm text-red-600">{errors.prepTimeMinutes.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cook Time (min) *
                </label>
                <input
                  {...register('cookTimeMinutes', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.cookTimeMinutes && (
                  <p className="mt-1 text-sm text-red-600">{errors.cookTimeMinutes.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servings *
                </label>
                <input
                  {...register('servings', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.servings && (
                  <p className="mt-1 text-sm text-red-600">{errors.servings.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories per Serving *
              </label>
              <input
                {...register('caloriesPerServing', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.caloriesPerServing && (
                <p className="mt-1 text-sm text-red-600">{errors.caloriesPerServing.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                {...register('image')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                {...register('tags')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="vegetarian, healthy, quick"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients (one per line) *
              </label>
              <textarea
                {...register('ingredients')}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                placeholder="2 cups flour
1 cup sugar
3 eggs
..."
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-600">{errors.ingredients.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions (one per line) *
              </label>
              <textarea
                {...register('instructions')}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                placeholder="Preheat oven to 350°F
Mix dry ingredients
Add wet ingredients
..."
              />
              {errors.instructions && (
                <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Recipe' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;