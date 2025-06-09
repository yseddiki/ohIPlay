const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Get booking details
    const booking = await Booking.findById(bookingId).populate('bootcampId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${booking.bootcampId.title} - Bootcamp Experience`,
            description: `${booking.numberOfParticipants} participant(s)`,
          },
          unit_amount: Math.round(booking.totalAmount * 100), // Convert to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/booking-cancelled`,
      customer_email: booking.customerInfo.email,
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    // Update booking with session ID
    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// Handle Stripe webhook
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Update booking status
      try {
        const booking = await Booking.findById(session.metadata.bookingId);
        if (booking) {
          booking.status = 'confirmed';
          booking.paymentStatus = 'paid';
          booking.stripePaymentIntentId = session.payment_intent;
          await booking.save();
          
          // TODO: Send confirmation email
          console.log(`Booking ${booking._id} confirmed and payment received`);
        }
      } catch (error) {
        console.error('Error updating booking after payment:', error);
      }
      break;
      
    case 'checkout.session.expired':
      // Handle expired session
      const expiredSession = event.data.object;
      try {
        const booking = await Booking.findById(expiredSession.metadata.bookingId);
        if (booking && booking.paymentStatus === 'pending') {
          booking.status = 'cancelled';
          booking.paymentStatus = 'failed';
          await booking.save();
        }
      } catch (error) {
        console.error('Error handling expired session:', error);
      }
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
};