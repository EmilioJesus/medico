const stripe = require('stripe')('sk_test_51J66mKC7cpsj92lFVCMm11z6wpKFYKqbWf0DrCyIeRZR8pmbEif9uhvyG48pVJOlg9Id1lWiqBKfYf3T271gu591000SQWvw5Z');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));