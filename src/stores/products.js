import { writable, derived } from 'svelte/store'
import url from '../strapi/URL'
import getProducts from '../strapi/getProducts.js'

//console.log('products.js', url)

const store = writable([], () => {
  setProducts()
  return () => {}
})

async function setProducts() {
  let products = await getProducts()
  // console.log('products.js', products)
  if (products) {
    // products = products.data
    // console.log('products.js', products)

    products = flattenProducts(products)
    store.set(products)
  }
}

// subscribe
// set
// update

// flatten products
function flattenProducts(data) {
  data = data.data
  return data.map(item => {
    // console.log('flatten')

    // console.log('item.id', item.id)
    let id = item.id
    // console.log('item.attributes', item.attributes)

    //line below worked when using ?populate=* in getProducts.js
    // let imageUrl = item.attributes.image.data.attributes.url
    //instead, use new image_url text field in products table
    let image = item.attributes.image_url

    // console.log('imageUrl', imageUrl)
    //console.log('url: ', url)
    //let image = `${url}${imageUrl}`
    //console.log('image', image)

    // let image = 'http://localhost:8080' + imageUrl
    //let image = imageUrl

    // let image = `${imageurl}${item.attributes.image_url}`

    // console.log('image', image)

    // return { ...item, image }
    return { ...item.attributes, id, image }
  })
}

// function flattenProducts(data) {
//   return data.map(item => {
//     let image = item.image.url
//     return { ...item, image }
//   })
// }

//featured store
export const featuredStore = derived(store, $featured => {
  return $featured.filter(item => item.featured === true)
})

export default store
