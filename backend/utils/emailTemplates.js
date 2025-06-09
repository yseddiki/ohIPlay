const bookingConfirmationTemplate = (booking, bootcamp) => {
  return {
    subject: `Booking Confirmed - ${bootcamp.title} | OH! PLAY`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 OH! PLAY</h1>
            <h2>Booking Confirmed!</h2>
          </div>
          
          <div class="content">
            <p>Dear ${booking.customerInfo.fullName},</p>
            
            <p>Great news! Your booking has been confirmed. Get ready for an incredible adventure!</p>
            
            <div class="details">
              <h3>Booking Details</h3>
              <p><strong>Bootcamp:</strong> ${bootcamp.title}</p>
              <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Participants:</strong> ${booking.numberOfParticipants}</p>
              <p><strong>Total Amount:</strong> €${booking.totalAmount}</p>
              <p><strong>Duration:</strong> ${bootcamp.duration}</p>
              <p><strong>Location:</strong> ${bootcamp.location}</p>
            </div>
            
            <div class="details">
              <h3>What to Bring</h3>
              <ul>
                <li>Comfortable athletic wear</li>
                <li>Sturdy sneakers or boots</li>
                <li>Water bottle</li>
                <li>Towel</li>
                <li>Positive attitude and enthusiasm!</li>
              </ul>
            </div>
            
            ${booking.specialRequests ? `
            <div class="details">
              <h3>Your Special Requests</h3>
              <p>${booking.specialRequests}</p>
            </div>
            ` : ''}
            
            <p>Questions? Contact us at info@OH-I-PLAY.be</p>
          </div>
          
          <div class="footer">
            <p>See you soon for an unforgettable adventure!</p>
            <p>🌿 The OH! PLAY Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Booking Confirmed - OH! PLAY
      
      Dear ${booking.customerInfo.fullName},
      
      Your booking for ${bootcamp.title} has been confirmed!
      
      Details:
      - Date: ${new Date(booking.bookingDate).toLocaleDateString()}
      - Participants: ${booking.numberOfParticipants}
      - Total: €${booking.totalAmount}
      - Location: ${bootcamp.location}
      
      What to bring: comfortable athletic wear, sturdy shoes, water bottle, towel, and enthusiasm!
      
      Questions? Contact us at info@OH-I-PLAY.be
      
      See you soon!
      The OH! PLAY Team
    `
  };
};

// Contact form notification template
const contactNotificationTemplate = (contact) => {
  return {
    subject: `New Contact Form Submission - OH! PLAY`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 OH! PLAY</h1>
            <h2>New Contact Form Submission</h2>
          </div>
          
          <div class="content">
            <div class="details">
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> ${contact.fullName}</p>
              <p><strong>Email:</strong> ${contact.email}</p>
              <p><strong>Phone:</strong> ${contact.phone}</p>
              <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
            </div>
            
            <div class="details">
              <h3>Message</h3>
              <p>${contact.message}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission - OH! PLAY
      
      Name: ${contact.fullName}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Submitted: ${new Date(contact.createdAt).toLocaleString()}
      
      Message:
      ${contact.message}
    `
  };
};

module.exports = {
  bookingConfirmationTemplate,
  contactNotificationTemplate
};