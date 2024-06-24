import React, { createContext, useReducer, useContext } from 'react';

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.some(fav => fav.idMeal === action.payload.idMeal);
      const updatedFavorites = isFavorite
        ? state.favorites.filter(fav => fav.idMeal !== action.payload.idMeal)
        : [...state.favorites, action.payload];
      return { ...state, favorites: updatedFavorites };
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
