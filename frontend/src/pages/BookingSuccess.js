import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, Mail, Home, ArrowRight } from 'lucide-react';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch booking details using the session_id
    // For now, we'll show a generic success message
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for booking your adventure with OH! PLAY
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Confirmation Email</h3>
                  <p className="text-gray-600">
                    We've sent a detailed confirmation email with all your booking information, 
                    including what to bring and meeting instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Prepare for Your Adventure</h3>
                  <p className="text-gray-600">
                    Make sure to bring comfortable athletic wear, sturdy shoes, a water bottle, 
                    and most importantly - your adventurous spirit!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Meet Your Team</h3>
                  <p className="text-gray-600">
                    Our experienced instructors will be ready to guide you through an 
                    unforgettable bootcamp experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Location Details</h3>
                  <p className="text-gray-600">
                    Detailed directions and parking information have been included in your 
                    confirmation email. Arrive 15 minutes early for check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Information</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Please arrive 15 minutes before your scheduled start time
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Bring a valid ID and wear appropriate athletic clothing
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Weather conditions may affect outdoor activities - we'll contact you if changes are needed
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                For cancellations or changes, contact us at least 24 hours in advance
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions or Concerns?</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-semibold">info@OH-I-PLAY.be</p>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <p className="font-semibold">+32 XXX XX XX XX</p>
              </div>
              <div>
                <span className="text-gray-500">Business Hours:</span>
                <p className="font-semibold">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/contact"
                className="text-green-600 hover:text-green-700 underline"
              >
                Contact our support team
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center inline-flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link
              to="/bootcamps"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold text-center inline-flex items-center justify-center"
            >
              Book Another Adventure
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Social Sharing */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Share your upcoming adventure:</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;