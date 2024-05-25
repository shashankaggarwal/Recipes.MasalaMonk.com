<script>
  import { onMount } from 'svelte';
  import { logoutUser } from '../services/api';
  import { navigate } from 'svelte-routing';

  let isLoggedIn = false;

  const checkAuth = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      isLoggedIn = true;
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    document.cookie = 'token=; Max-Age=0; path=/';
    isLoggedIn = false;
    navigate('/login');
  };

  onMount(() => {
    checkAuth();
  });
</script>

<nav>
  <ul>
    <li><a href="/" on:click|preventDefault={() => navigate('/')}>Home</a></li>
    {#if isLoggedIn}
      <li><a href="/create-recipe" on:click|preventDefault={() => navigate('/create-recipe')}>Create Recipe</a></li>
      <li><button on:click={handleLogout}>Logout</button></li>
    {:else}
      <li><a href="/login" on:click|preventDefault={() => navigate('/login')}>Login</a></li>
      <li><a href="/register" on:click|preventDefault={() => navigate('/register')}>Register</a></li>
    {/if}
  </ul>
</nav>

<style>
  nav ul {
    list-style-type: none;
    padding: 0;
  }

  nav ul li {
    display: inline;
    margin-right: 10px;
  }

  nav ul li a, nav ul li button {
    text-decoration: none;
    color: #000;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
  }

  nav ul li button:focus, nav ul li a:focus {
    outline: 2px solid #000;
  }
</style>
