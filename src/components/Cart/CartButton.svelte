<script>
  import globalStore from '../../stores/globalStore.js'
  import cart from '../../stores/cart.js'
  $: totalCount = $cart.reduce((a, b) => a + b.amount, 0)
</script>

<div class="btn-cart-container">
  <button
    class="btn-cart-toggle"
    on:click={() => {
      globalStore.toggleItem('cart', true)
    }}
  >
    <i class="fas fa-cart-plus" />
  </button>
  <span class="btn-cart-items">{totalCount}</span>
</div>
