<script>
  export let title = ''

  import products from '../../stores/products.js'
  import Product from './Product.svelte'
  import Loading from '../Loading.svelte'
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <div class="products-center">
    <!-- Note: below if products is not empty it will perform first part and if empty will call the loading page// -->
    {#each $products as product (product.id)}
      <Product {product} />
    {:else}
      <Loading />
    {/each}
  </div>
</section>
