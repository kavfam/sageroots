<script>
  // pages
  import Login from './pages/Login.svelte'
  import Checkout from './pages/Checkout.svelte'
  import Products from './pages/Products.svelte'
  import ProductTemplate from './pages/ProductTemplate.svelte'
  import Home from './pages/Home.svelte'
  import About from './pages/About.svelte'

  // router
  import { Router, Route, Link } from 'svelte-routing'
  // components
  import Navbar from './components/Navbar/Navbar.svelte'
  import Sidebar from './components/Navbar/Sidebar.svelte'
  import Cart from './components/Cart/Cart.svelte'
  import Alert from './components/Alert.svelte'
  // global store
  import globalStore from './stores/globalStore.js'
</script>

<Router>
  <Navbar />
  {#if $globalStore.sidebar}
    <Sidebar />
  {/if}
  {#if $globalStore.cart}
    <Cart />
  {/if}
  {#if $globalStore.alert}
    <Alert />
  {/if}
  <div>
    <Route path="/" component={Home}><Home /></Route>
    <Route path="/about" component={About} />
    <Route path="/products" component={Products}><Products /></Route>
    <Route path="/products/:id" component={ProductTemplate}><Products /></Route>
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={Checkout} />
  </div>
</Router>
