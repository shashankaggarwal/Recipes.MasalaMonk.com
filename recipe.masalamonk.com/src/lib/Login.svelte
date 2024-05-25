<script>
  import { loginUser } from '../services/api';
  import { writable } from 'svelte/store';

  let username = '';
  let password = '';
  let errorMessage = '';
  let token = writable('');

  const handleSubmit = async () => {
    try {
      const response = await loginUser({ username, password });
      document.cookie = `token=${response.access}; path=/`;
      token.set(response.access);
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      errorMessage = 'Login failed. Please check your credentials and try again.';
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="Username" bind:value={username} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit">Login</button>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</form>
