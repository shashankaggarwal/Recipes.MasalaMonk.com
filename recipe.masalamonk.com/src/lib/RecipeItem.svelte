<script>
    import { deleteRecipe, updateRecipe } from '../services/api';
    export let recipe;
  
    let isEditing = false;
    let name = recipe.name;
    let ingredients = recipe.ingredients;
    let steps = recipe.steps;
    let imageUrl = recipe.imageUrl;
    let isPublic = recipe.public;
    let errorMessage = '';
  
    const handleDelete = async () => {
      try {
        await deleteRecipe(recipe.id);
        window.location.reload();
      } catch (error) {
        errorMessage = 'Error deleting recipe: ' + error.message;
      }
    };
  
    const handleUpdate = async () => {
      try {
        await updateRecipe(recipe.id, { name, ingredients, steps, imageUrl, public: isPublic });
        isEditing = false;
        window.location.reload();
      } catch (error) {
        errorMessage = 'Error updating recipe: ' + error.message;
      }
    };
  
    const toggleEdit = () => {
      isEditing = !isEditing;
    };
  </script>
  
  <div>
    {#if isEditing}
      <form on:submit|preventDefault={handleUpdate}>
        <input type="text" placeholder="Name" bind:value={name} required />
        <input type="text" placeholder="Ingredients" bind:value={ingredients} required />
        <textarea placeholder="Steps" bind:value={steps} required></textarea>
        <input type="text" placeholder="Image URL" bind:value={imageUrl} required />
        <label>
          <input type="checkbox" bind:checked={isPublic} />
          Public
        </label>
        <button type="submit">Update Recipe</button>
        <button type="button" on:click={toggleEdit}>Cancel</button>
      </form>
    {:else}
      <h3>{recipe.name}</h3>
      <p>{recipe.ingredients}</p>
      <p>{recipe.steps}</p>
      <img src="{recipe.imageUrl}" alt="{recipe.name}" />
      <p>Public: {recipe.public ? 'Yes' : 'No'}</p>
      <button on:click={toggleEdit}>Edit</button>
      <button on:click={handleDelete}>Delete</button>
    {/if}
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
  </div>
  