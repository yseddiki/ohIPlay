import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, ArrowRight } from 'lucide-react';
import apiService from '../services/api';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerInfo: {
      fullName: '',
      email: '',
      phone: ''
    },
    numberOfParticipants: 1,
    bookingDate: '',
    specialRequests: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBootcamp();
  }, [id]);

  const fetchBootcamp = async () => {
    try {
      const response = await apiService.getBootcamp(id);
      setBootcamp(response);
    } catch (error) {
      console.error('Error fetching bootcamp:', error);
      setError('Failed to load bootcamp details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const calculateTotal = () => {
    if (!bootcamp) return 0;
    return bootcamp.price * formData.numberOfParticipants;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const bookingData = {
        ...formData,
        bootcampId: id,
        totalAmount: calculateTotal()
      };

      const response = await apiService.createBooking(bookingData);
      
      // Create payment session
      const paymentResponse = await apiService.createPaymentSession(response._id);
      
      // Redirect to Stripe Checkout
      window.location.href = paymentResponse.url;
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!bootcamp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bootcamp Not Found</h2>
          <button
            onClick={() => navigate('/bootcamps')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Browse Bootcamps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Book Your Adventure
            </h1>
            <p className="text-lg text-gray-600">
              Complete your booking for {bootcamp.title}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bootcamp Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bootcamp Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{bootcamp.title}</h3>
                  <p className="text-gray-600 text-sm">{bootcamp.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-semibold">{bootcamp.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Max Participants:</span>
                    <p className="font-semibold">{bootcamp.maxParticipants}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Difficulty:</span>
                    <p className="font-semibold capitalize">{bootcamp.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p className="font-semibold capitalize">{bootcamp.category}</p>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-semibold">{bootcamp.location}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Price per person:</span>
                    <span className="text-2xl font-bold text-green-600">€{bootcamp.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Information</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerInfo.fullName"
                        value={formData.customerInfo.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="customerInfo.email"
                        value={formData.customerInfo.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="customerInfo.phone"
                        value={formData.customerInfo.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+32 XXX XX XX XX"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        min={getTomorrowDate()}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="inline h-4 w-4 mr-1" />
                        Number of Participants *
                      </label>
                      <select
                        name="numberOfParticipants"
                        value={formData.numberOfParticipants}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {Array.from({ length: bootcamp.maxParticipants }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'person' : 'people'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      €{calculateTotal()}
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Proceed to Payment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    You'll be redirected to Stripe for secure payment processing
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;