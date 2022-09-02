import axios from 'axios'
import url from './URL'

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  // console.log('submitOrder.js')
  //console.log('user', user)
  // note: user is not defined at this point
  // console.log('name', name)
  // console.log('total', total)
  // console.log('items', items)
  // console.log('stripeTokenId', stripeTokenId)
  // console.log('userToken', userToken)
  // console.log('url', url)
  // console.log('submitOrder.js BEFORE call to /api/orders')

  // code goes here
  const response = await axios
    .post(
      `${url}/api/orders`,
      {
        // data: {
        name,
        total,
        items,
        stripeTokenId
        // }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    .catch(error => console.error(error.response.data))
  //
  console.log('submitOrder-response', response)
  //
  return response
}

export default submitOrder
