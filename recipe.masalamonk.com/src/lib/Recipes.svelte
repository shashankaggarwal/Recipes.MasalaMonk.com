<script>
  import { onMount } from 'svelte';
  import { getRecipes } from '../services/api';
  let recipes = [];
  let errorMessage = '';

  const fetchRecipes = async () => {
    try {
      recipes = await getRecipes();
    } catch (error) {
      errorMessage = 'Error fetching recipes: ' + error.message;
    }
  };

  onMount(() => {
    fetchRecipes();
  });
</script>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<ul>
  {#each recipes as recipe}
    <li>
      <strong>{recipe.title}</strong> - {recipe.description}
      <a href={`/recipe/${recipe.id}`}>View Details</a>
    </li>
  {/each}
</ul>
