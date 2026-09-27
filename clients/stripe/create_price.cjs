// Don't embed any keys in production code. This is an example.
// See https://docs.stripe.com/keys-best-practices.
const stripe = require('stripe')('sk_test_51UJ0wQ5wGFkUwyp1WPYofBTwBvYuBLXSrluPUq3PznfNWs6z5neJSmw2nKquoh63Ou6SMKybc9hfpDUro8dznd1u00XRQaqix2');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then((product) => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'gbp',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then((price) => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});