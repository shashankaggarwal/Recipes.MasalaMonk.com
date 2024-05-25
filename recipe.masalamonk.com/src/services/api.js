import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

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
    console.log('Request Config:', config);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    console.log('Logging in with credentials:', credentials);
    const response = await api.post('/api/login/', credentials);
    console.log('Login response:', response);
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
    console.log('Registering user with data:', userData);
    const response = await api.post('/api/register/', userData);
    console.log('Register response:', response);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to get all recipes
export const getRecipes = async () => {
  try {
    console.log('Fetching all recipes');
    const response = await api.get('/api/recipes/');
    console.log('Get recipes response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Function to get a single recipe by ID
export const getRecipe = async (id) => {
  try {
    console.log(`Fetching recipe with ID: ${id}`);
    const response = await api.get(`/api/recipes/${id}/`);
    console.log('Get recipe response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    console.log('Creating recipe with data:', recipeData);
    const response = await api.post('/api/recipes/', recipeData);
    console.log('Create recipe response:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Function to update an existing recipe by ID
export const updateRecipe = async (id, recipeData) => {
  try {
    console.log(`Updating recipe with ID: ${id} with data:`, recipeData);
    const response = await api.put(`/api/recipes/${id}/`, recipeData);
    console.log('Update recipe response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    console.log(`Deleting recipe with ID: ${id}`);
    const response = await api.delete(`/api/recipes/${id}/`);
    console.log('Delete recipe response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};

// Function to log out the user
export const logoutUser = async () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log('User logged out');
  return Promise.resolve();
};
