<script>
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import Menu from './lib/Menu.svelte';
  import Login from './lib/Login.svelte';
  import Register from './lib/Register.svelte';
  import CreateRecipe from './lib/CreateRecipe.svelte';
  import Recipes from './lib/Recipes.svelte';
  import RecipeDetail from './lib/RecipeDetail.svelte';

  let isLoggedIn = false;

  const checkAuth = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      isLoggedIn = true;
    }
  };

  onMount(() => {
    checkAuth();
  });
</script>

<main>
  <Menu />
  <Router>
    <Route path="/" component={Recipes} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/create-recipe" component={CreateRecipe} />
    <Route path="/recipe/:id" let:params>
      <RecipeDetail {params} />
    </Route>
    <Route path="/create-recipe/:id" let:params>
      <CreateRecipe {params} />
    </Route>
  </Router>
</main>

<style>
  main {
    padding: 2rem;
  }
</style>
