
// Add these to the existing emailTemplates.js file:

// Custom bootcamp request notification for admin
const customRequestNotificationTemplate = (request) => {
  return {
    subject: `New Custom Bootcamp Request - ${request.customerInfo.fullName}`,
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
            <h2>New Custom Bootcamp Request</h2>
          </div>
          
          <div class="content">
            <div class="details">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${request.customerInfo.fullName}</p>
              <p><strong>Email:</strong> ${request.customerInfo.email}</p>
              <p><strong>Phone:</strong> ${request.customerInfo.phone}</p>
              ${request.customerInfo.company ? `<p><strong>Company:</strong> ${request.customerInfo.company}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date(request.createdAt).toLocaleString()}</p>
            </div>
            
            <div class="details">
              <h3>Requirements</h3>
              <p><strong>Group Size:</strong> ${request.requirements.groupSize} participants</p>
              ${request.requirements.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(request.requirements.preferredDate).toLocaleDateString()}</p>` : ''}
              ${request.requirements.duration ? `<p><strong>Duration:</strong> ${request.requirements.duration}</p>` : ''}
              ${request.requirements.budget ? `<p><strong>Budget:</strong> ${request.requirements.budget}</p>` : ''}
              ${request.requirements.location ? `<p><strong>Location:</strong> ${request.requirements.location}</p>` : ''}
            </div>
            
            <div class="details">
              <h3>Objectives</h3>
              <p>${request.requirements.objectives}</p>
            </div>
            
            ${request.requirements.specialRequests ? `
            <div class="details">
              <h3>Special Requests</h3>
              <p>${request.requirements.specialRequests}</p>
            </div>
            ` : ''}
            
            <p style="text-align: center; margin-top: 20px;">
              <a href="${process.env.CLIENT_URL}/admin/dashboard" 
                 style="background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View in Admin Dashboard
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Custom Bootcamp Request - OH! PLAY
      
      Customer: ${request.customerInfo.fullName}
      Email: ${request.customerInfo.email}
      Phone: ${request.customerInfo.phone}
      ${request.customerInfo.company ? `Company: ${request.customerInfo.company}` : ''}
      
      Group Size: ${request.requirements.groupSize} participants
      ${request.requirements.preferredDate ? `Preferred Date: ${new Date(request.requirements.preferredDate).toLocaleDateString()}` : ''}
      ${request.requirements.duration ? `Duration: ${request.requirements.duration}` : ''}
      ${request.requirements.budget ? `Budget: ${request.requirements.budget}` : ''}
      
      Objectives: ${request.requirements.objectives}
      
      ${request.requirements.specialRequests ? `Special Requests: ${request.requirements.specialRequests}` : ''}
      
      View in Admin Dashboard: ${process.env.CLIENT_URL}/admin/dashboard
    `
  };
};

// Quote notification for customer
const quoteNotificationTemplate = (request) => {
  return {
    subject: `Your Custom Bootcamp Quote - OH! PLAY`,
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
          .price { font-size: 24px; color: #16a34a; font-weight: bold; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 OH! PLAY</h1>
            <h2>Your Custom Bootcamp Quote</h2>
          </div>
          
          <div class="content">
            <p>Dear ${request.customerInfo.fullName},</p>
            
            <p>Thank you for your interest in our custom bootcamp experiences! We've reviewed your requirements and are excited to provide you with a personalized quote.</p>
            
            <div class="price">
              Total Price: €${request.quotedPrice}
            </div>
            
            <div class="details">
              <h3>Your Requirements</h3>
              <p><strong>Group Size:</strong> ${request.requirements.groupSize} participants</p>
              ${request.requirements.duration ? `<p><strong>Duration:</strong> ${request.requirements.duration}</p>` : ''}
              ${request.requirements.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(request.requirements.preferredDate).toLocaleDateString()}</p>` : ''}
            </div>
            
            ${request.adminNotes ? `
            <div class="details">
              <h3>Additional Information</h3>
              <p>${request.adminNotes}</p>
            </div>
            ` : ''}
            
            <p>This quote is valid for 30 days. To proceed with booking or if you have any questions, please contact us at info@OH-I-PLAY.be or call +32 XXX XX XX XX.</p>
            
            <p>We look forward to creating an amazing adventure experience for your group!</p>
            
            <p>Best regards,<br>The OH! PLAY Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Your Custom Bootcamp Quote - OH! PLAY
      
      Dear ${request.customerInfo.fullName},
      
      Thank you for your interest in our custom bootcamp experiences!
      
      Total Price: €${request.quotedPrice}
      
      Group Size: ${request.requirements.groupSize} participants
      ${request.requirements.duration ? `Duration: ${request.requirements.duration}` : ''}
      ${request.requirements.preferredDate ? `Preferred Date: ${new Date(request.requirements.preferredDate).toLocaleDateString()}` : ''}
      
      ${request.adminNotes ? `Additional Information: ${request.adminNotes}` : ''}
      
      This quote is valid for 30 days. To proceed with booking or if you have any questions, please contact us at info@OH-I-PLAY.be or call +32 XXX XX XX XX.
      
      Best regards,
      The OH! PLAY Team
    `
  };
};

module.exports = {
  bookingConfirmationTemplate,
  contactNotificationTemplate,
  customRequestNotificationTemplate,
  quoteNotificationTemplate
};