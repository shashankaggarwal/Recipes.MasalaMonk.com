<script>
  import { createRecipe, getRecipe, updateRecipe } from '../services/api';
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';

  export let params = {}; // Set default value for params

  let isEdit = false;
  let recipe = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    public: false,
  };
  let errorMessage = '';

  const fetchRecipe = async () => {
    try {
      if (params.id) {
        recipe = await getRecipe(params.id);
        isEdit = true;
      }
    } catch (error) {
      errorMessage = 'Error fetching recipe: ' + error.message;
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateRecipe(params.id, recipe);
      } else {
        await createRecipe(recipe);
      }
      navigate('/');
    } catch (error) {
      errorMessage = 'Error saving recipe: ' + error.message;
    }
  };

  onMount(() => {
    if (params.id) {
      fetchRecipe();
    }
  });
</script>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{:else}
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Title:
      <input type="text" bind:value={recipe.title} required />
    </label>
    <label>
      Description:
      <textarea bind:value={recipe.description} required></textarea>
    </label>
    <label>
      Ingredients:
      <textarea bind:value={recipe.ingredients} required></textarea>
    </label>
    <label>
      Instructions:
      <textarea bind:value={recipe.instructions} required></textarea>
    </label>
    <label>
      Public:
      <input type="checkbox" bind:checked={recipe.public} />
    </label>
    <button type="submit">{isEdit ? 'Update Recipe' : 'Create Recipe'}</button>
  </form>
{/if}
