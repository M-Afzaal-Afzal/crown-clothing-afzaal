require('dotenv').config();

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req) => {
  try {
    const { amount } = JSON.parse(req.body);
    const paymentIntent = await stripe.paymentIntents.create(
      { amount: amount * 100, currency: 'usd', payment_method_types: ['card'] },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }

  } catch (error) {
    console.log("🚀 ~ file: create-payment-intent.js ~ line 20 ~ handler ~ error", error)
    return {
      statusCode: 400,
      error: JSON.stringify({ error })
    }
  }

}

module.exports = {
  handler
}
