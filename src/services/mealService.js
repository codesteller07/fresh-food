const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories;
};

export const fetchMealsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};



export const fetchRandomMeal = async () => {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals[0];
};
