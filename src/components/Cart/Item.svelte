<script>
  export let id
  export let image
  export let title
  export let price
  export let amount
  // import cart methods
  import { removeItem, changeAmount } from '../../stores/cart.js'
</script>

<!-- cart item -->
<div class="cart-item">
  <img src={image} alt={title} />
  <div>
    <!-- title, price, button  -->
    <h4>{title}</h4>
    <h5>{price}</h5>
    <button
      class="cart-btn remove-btn"
      on:click={() => {
        removeItem(id)
      }}
      >remove
    </button>
  </div>

  <div>
    <!-- inc/dec/amount -->
    <button
      class="cart-btn amount-btn"
      on:click={() => {
        changeAmount(id, amount + 1)
      }}
    >
      <i class="fas fa-chevron-up" />
    </button>
    <p class="item-amount">
      {amount}
    </p>
    <button
      class="cart-btn amount-btn"
      on:click={() => {
        changeAmount(id, amount - 1)
      }}
    >
      <i class="fas fa-chevron-down" />
    </button>
  </div>
</div>
