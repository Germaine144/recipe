import React, { useState } from 'react';
import { Search, ChefHat, Clock, Star } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative bg-gradient-to-r from-amber-600 to-yellow-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Recipes
          </h1>
          
          <p className="text-xl mb-8 text-amber-100">
            Explore thousands of delicious recipes from around the world. 
            Cook like a professional chef in your own kitchen!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes, ingredients, or cuisine..."
                className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quick Recipes</h3>
              <p className="text-amber-100">Find meals under 30 minutes</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Tips</h3>
              <p className="text-amber-100">Learn from professional chefs</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Top Rated</h3>
              <p className="text-amber-100">Community favorite recipes</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="fill-current text-white">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;