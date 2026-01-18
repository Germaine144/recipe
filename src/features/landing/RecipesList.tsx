import React, { useState, useEffect } from 'react';
import { useGetRecipesQuery } from '@/api/recipesApi';
import RecipeCard from '@/components/recipes/RecipeCard';
import Pagination from '@/components/ui/Pagination';
import { Filter, SortAsc, SortDesc, ChefHat } from 'lucide-react';

interface RecipesListProps {
  searchQuery?: string;
}

const RecipesList: React.FC<RecipesListProps> = ({ searchQuery = '' }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const limit = 9;

  // Update local search state when prop changes
  useEffect(() => {
    setSearch(searchQuery);
    setPage(1);
  }, [searchQuery]);

  const { data, isLoading, error } = useGetRecipesQuery({
    page,
    limit,
    search,
    sortBy,
    order,
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load recipes</div>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Sort */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="font-semibold text-gray-700">Filters & Sort</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full md:w-auto"
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('name')}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  sortBy === 'name'
                    ? 'bg-amber-50 border-amber-500 text-amber-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Name
                {sortBy === 'name' && (
                  order === 'asc' ? (
                    <SortAsc className="ml-2 h-4 w-4" />
                  ) : (
                    <SortDesc className="ml-2 h-4 w-4" />
                  )
                )}
              </button>
              
              <button
                onClick={() => handleSort('rating')}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  sortBy === 'rating'
                    ? 'bg-amber-50 border-amber-500 text-amber-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Rating
                {sortBy === 'rating' && (
                  order === 'asc' ? (
                    <SortAsc className="ml-2 h-4 w-4" />
                  ) : (
                    <SortDesc className="ml-2 h-4 w-4" />
                  )
                )}
              </button>
              
              <button
                onClick={() => handleSort('caloriesPerServing')}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  sortBy === 'caloriesPerServing'
                    ? 'bg-amber-50 border-amber-500 text-amber-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Calories
                {sortBy === 'caloriesPerServing' && (
                  order === 'asc' ? (
                    <SortAsc className="ml-2 h-4 w-4" />
                  ) : (
                    <SortDesc className="ml-2 h-4 w-4" />
                  )
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Count */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {data?.total ? `${data.total} Recipes Found` : 'Recipes'}
          </h2>
          <p className="text-gray-600 mt-1">
            Showing {data?.recipes?.length || 0} recipes
            {search && ` for "${search}"`}
          </p>
        </div>
        <div className="hidden md:flex items-center text-amber-600">
          <ChefHat className="h-6 w-6 mr-2" />
          <span className="font-medium">Fresh Recipes Daily</span>
        </div>
      </div>

      {/* Recipes Grid */}
      {data?.recipes?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ChefHat className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500">
            {search 
              ? `No recipes match "${search}". Try a different search term.`
              : 'No recipes available at the moment.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data?.recipes?.map((recipe: any) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RecipesList;