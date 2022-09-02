<script>
  import user from '../stores/user'
  import { link } from 'svelte-routing'
  //logout function
  import { logoutUser } from '../stores/user'
  import globalStore from '../stores/globalStore'
</script>

{#if $user.jwt}
  <!-- user logged in go to home / close sidebar -->
  <a
    href="/"
    class="logout-btn"
    use:link
    on:click={() => {
      logoutUser()
      globalStore.toggleItem('sidebar', false)
    }}
    >logout
  </a>
{:else}
  <!-- user logged out so go to login / close sidebar -->
  <a
    href="/login"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false)
    }}
    >login
  </a>
{/if}
