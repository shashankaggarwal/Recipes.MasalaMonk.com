import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ensure this URL is correct

// Function to get the token from cookies
function getAuthToken() {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return '';
}

// Create an axios instance with the base URL and default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers if it exists
api.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/login/', credentials);
    document.cookie = `token=${response.data.access}; path=/`;
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to get all recipes
export const getRecipes = async () => {
  try {
    const response = await api.get('/api/recipes/');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Function to get a single recipe by ID
export const getRecipe = async (id) => {
  try {
    const response = await api.get(`/api/recipes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    const response = await api.post('/api/recipes/', recipeData);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Function to update an existing recipe by ID
export const updateRecipe = async (id, recipeData) => {
  try {
    const response = await api.put(`/api/recipes/${id}/`, recipeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await api.delete(`/api/recipes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to log out the user
export const logoutUser = async () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return Promise.resolve();
};
