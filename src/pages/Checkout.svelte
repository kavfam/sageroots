<script>
  import { onMount } from 'svelte'
  import { navigate, link } from 'svelte-routing'
  import user from '../stores/user'
  import cart, { cartTotal } from '../stores/cart'
  import submitOrder from '../strapi/submitOrder'
  import globalStore from '../stores/globalStore'

  let name = ''
  //stripe vars
  let cardElement
  let cardErrors
  let card
  let stripe
  let elements

  $: isEmpty = !name || $globalStore.alert

  onMount(() => {
    if (!$user.jwt || $cartTotal <= 0) {
      navigate('/')
      return
    }

    stripe = Stripe('pk_test_51LZyhGHbLZbYGBEMTHUFY3BJyX35o1MUQwxEU6tehn53Yx928C9XEsTCCctCVbhFYJIVdsy5n3lu5uBtW4qZzXlN00FbJHIOv9')
    elements = stripe.elements()
    card = elements.create('card')
    card.mount(cardElement)
    card.addEventListener('change', function (e) {
      if (e.error) {
        cardErrors.textContent = e.error.message
      } else {
        cardErrors.textContent = ''
      }
    })
  })

  async function handleSubmit() {
    globalStore.toggleItem('alert', true, 'submitting order... please wait')
    let response = await stripe.createToken(card).catch(error => console.log(error))
    const { token } = response
    if (token) {
      //token.id
      const { id } = token
      console.log('Checkout')
      // user here is a store!
      //      console.log('user', user)
      // console.log('name', name)
      // console.log('$cartTotal', $cartTotal)
      // console.log('$cart', $cart)
      // console.log('id', id)
      // console.log('$user.jwt', $user.jwt)
      // console.log('Now calling submitOrder.js')
      console.log('Now calling submitOrder.js')
      //
      //

      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      })

      // console.log('Checkout AFTER submitOrder')
      console.log('Checkout AFTER submitOrder', order)

      if (order) {
        //order submitted, now display info to user and clear cart store and local storage
        globalStore.toggleItem('alert', true, 'your order is complete!')
        cart.set([])
        localStorage.setItem('razorCart', JSON.stringify([]))
        navigate('/')
        return
      } else {
        // order did not submit
        globalStore.toggleItem('alert', true, 'there was an error with your order. Please try again!')
      }
    }
  }
</script>

<!-- restrict access in case anyone uses the url - we already have restricted access from cart as user has to be logged in but can bypass this at url, so block this using onMount and check for jwt. -->

<!-- {#if $cartTotal > 0}
  <h1>form</h1>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty!</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if} -->

<section class="form">
  <h2 class="section-title">checkout</h2>
  <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
    <h3>order total : ${$cartTotal}</h3>
    <!-- single input -->
    <div class="form-control">
      <label for="name">your name</label>
      <input type="text" id="name" bind:value={name} />
    </div>
    <!-- end of single input -->
    <!-- stripe stuff -->
    <div class="stripe-input">
      <!-- info -->
      <label for="card-element">Credit or Debit Card</label>
      <p class="stripe-info">
        Test using this credit card:
        <span>4242 4242 4242 4242</span><br />
        enter any 5 digits for the zip code
        <br />
        enter any 3 digits for the CVC
      </p>
      <div id="card-element" bind:this={cardElement}>
        <!-- stripe -->
      </div>
      <div id="card-errors" bind:this={cardErrors} role="alert">
        <!--  -->
      </div>
    </div>
    <!-- end of stripe stuff -->
    <!-- error message -->
    {#if isEmpty}
      <p class="form-empty">please fill out name field</p>
    {/if}
    <!-- end of error message -->
    <!-- submit -->
    <button type="submit" class="btn btn-block btn-primary" disabled={isEmpty} class:disabled={isEmpty}>submit </button>
  </form>
</section>
