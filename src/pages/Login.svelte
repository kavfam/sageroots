<script>
  import loginUser from '../strapi/loginUser'
  import registerUser from '../strapi/registerUser'
  import { navigate } from 'svelte-routing'
  import globalStore from '../stores/globalStore.js'

  let email = ''
  let password = ''
  let username = 'default username'
  let isMember = true
  // add alerts here
  $: isEmpty = !email || !password || !username || $globalStore.alert

  // toggle member
  function toggleMember() {
    isMember = !isMember
    username = !isMember ? '' : 'default username'
  }

  // handle submit
  async function handleSubmit() {
    //add alerts the loading alert below usually flashes so quickly and then if loading fails gets overwritten by next message, so looks distracting like an error.
    // globalStore.toggleItem('alert', true, 'loading data... please wait')

    // will need to handle whether user registers or logs in
    let user
    if (isMember) {
      user = await loginUser({ email, password })
    } else {
      //console.log(isMember)
      user = await registerUser({ email, password, username })
    }
    console.log(user)
    if (user) {
      navigate('/products')
      globalStore.toggleItem('alert', true, 'welcome to razorsharp shopping!')
      return
    }
    // add alert
    globalStore.toggleItem('alert', true, 'there was an error! please try again!', true)
  }
</script>

<!-- if user already registered, they get Login with email, and password. if not, also input username. Make sure user fills all fields. Dont allow submit unless all fields completed. default assume user registered -->

<section class="form">
  <h2 class="section-title">
    {#if isMember}sign in{:else}register{/if}
  </h2>
  <form action="" class="login-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}
    {#if isEmpty}
      <p class="form-empty">please fill out all form fields</p>
    {/if}
    <button type="submit" class="btn btn-block btn-primary" disabled={isEmpty} class:disabled={isEmpty}>submit </button>
    {#if isMember}
      <p class="register-link">
        need to register?
        <button type="button" on:click={toggleMember}>click here </button>
      </p>
    {:else}
      <p class="register-link">
        already a member?
        <button type="button" on:click={toggleMember}>click here </button>
      </p>
    {/if}
  </form>
  <!--  -->
</section>
