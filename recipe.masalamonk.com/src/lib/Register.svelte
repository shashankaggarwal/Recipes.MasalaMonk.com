<script>
  import { registerUser } from '../services/api';
  let username = '';
  let email = '';
  let password = '';
  let errorMessage = '';

  const handleSubmit = async () => {
    try {
      await registerUser({ username, email, password });
      window.location.href = '/login';
    } catch (error) {
      errorMessage = 'Error registering user: ' + error.message;
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="Username" bind:value={username} required />
  <input type="email" placeholder="Email" bind:value={email} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit">Register</button>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</form>
