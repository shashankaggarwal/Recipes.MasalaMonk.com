<script>
  import { onMount } from 'svelte';
  import { getRecipe, deleteRecipe } from '../services/api';
  import { navigate } from 'svelte-routing';

  export let params;
  let recipe = null;
  let errorMessage = '';

  const fetchRecipe = async () => {
    try {
      recipe = await getRecipe(params.id);
    } catch (error) {
      errorMessage = 'Error fetching recipe: ' + error.message;
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(params.id);
        navigate('/');
      } catch (error) {
        errorMessage = 'Error deleting recipe: ' + error.message;
      }
    }
  };

  onMount(() => {
    fetchRecipe();
  });
</script>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{:else if recipe}
  <div>
    <h2>{recipe.title}</h2>
    <p>{recipe.description}</p>
    <p>{recipe.ingredients}</p>
    <p>{recipe.instructions}</p>
    <p>Public: {recipe.public ? 'Yes' : 'No'}</p>
    <button on:click={handleDelete}>Delete</button>
    <a href={`/create-recipe/${recipe.id}`}>Edit</a>
  </div>
{:else}
  <p>Loading...</p>
{/if}
