<script>
  import globalStore from '../../stores/globalStore'
  import { cartTotal } from '../../stores/cart'
  import user from '../../stores/user.js'
  import { fly, fade, blur } from 'svelte/transition'
  import { link } from 'svelte-routing'
  import ItemsList from './ItemsList.svelte'

  // toggle function
  const toggle = () => {
    globalStore.toggleItem('cart', false)
  }
</script>

<div class="cart-overlay" transition:blur>
  <div class="cart-container" transition:fly={{ x: 100 }}>
    <div class="cart" transition:fade={{ delay: 400 }}>
      <!-- cart header -->
      <div class="cart-header">
        <button class="btn-close" on:click={toggle}>
          <i class="fas fa-window-close" />
        </button>
        <h2 class="cart-title">your bag</h2>
        <span />
      </div>
      <!-- end cart header  -->
      <!-- cart items -->
      <ItemsList />
      <!-- end of cart items -->
      <!-- cart footer -->
      <div class="cart-footer">
        {#if $user.jwt}
          {#if $cartTotal > 0}
            <a href="/checkout" use:link class="btn btn-primary btn-block" on:click={toggle}>checkout</a>
          {:else}
            <div class="checkout-empty">
              <h2>your cart is empty!</h2>
              <a href="/products" use:link class="btn btn-primary  btn-block" on:click={toggle}>fill it</a>
            </div>
          {/if}
        {:else}
          <!--  -->
          <p class="cart-login">
            in order to checkout please
            <a href="/login" use:link on:click={toggle}>login</a>
          </p>
        {/if}
      </div>
      <!-- end of cart footer -->
    </div>
  </div>
</div>
