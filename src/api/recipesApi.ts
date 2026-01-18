// api/recipesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Recipes'],
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: ({ page = 1, limit = 9, search = '', sortBy = 'name', order = 'asc' }) => {
        const params = new URLSearchParams({
          skip: `${(page - 1) * limit}`,
          limit: `${limit}`,
          sortBy,
          order,
        });
        if (search) params.append('q', search);
        return `recipes?${params.toString()}`;
      },
    }),
    createRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: 'recipes/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `recipes/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Recipes'],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'],
    }),
  }),
});

export const { useGetRecipesQuery, useCreateRecipeMutation, useUpdateRecipeMutation, useDeleteRecipeMutation } = recipesApi;