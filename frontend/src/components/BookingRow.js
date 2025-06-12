
import React, { useState } from 'react';
import { 
  User, Mail, Phone, Calendar, Users, Euro, 
  CheckCircle, XCircle, Clock, MoreHorizontal 
} from 'lucide-react';

const BookingRow = ({ booking, onUpdateStatus }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusChange = async (newStatus) => {
    if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
      await onUpdateStatus(booking._id, newStatus);
      setShowActions(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm">
            <div className="font-medium text-gray-900">#{booking._id.slice(-8)}</div>
            <div className="text-gray-500">
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="text-sm">
            <div className="font-medium text-gray-900">{booking.customerInfo.fullName}</div>
            <div className="text-gray-500 flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {booking.customerInfo.email}
            </div>
            <div className="text-gray-500 flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {booking.customerInfo.phone}
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {booking.bootcampId?.title || 'N/A'}
            </div>
            <div className="text-gray-500">
              {booking.bootcampId?.category || 'N/A'}
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm">
            <div className="flex items-center text-gray-900">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(booking.bookingDate).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {booking.numberOfParticipants} participants
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm">
            <div className="font-medium text-gray-900 flex items-center">
              <Euro className="h-4 w-4 mr-1" />
              {booking.totalAmount}
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
              {booking.paymentStatus}
            </span>
          </div>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    View Details
                  </button>
                  
                  {booking.status !== 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange('confirmed')}
                      className="block px-4 py-2 text-sm text-green-700 hover:bg-gray-100 w-full text-left"
                    >
                      Confirm Booking
                    </button>
                  )}
                  
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange('completed')}
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 w-full text-left"
                    >
                      Mark Completed
                    </button>
                  )}
                  
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange('cancelled')}
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
      
      {/* Expanded Details Row */}
      {showDetails && (
        <tr className="bg-gray-50">
          <td colSpan="7" className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Booking Information</h4>
                <div className="space-y-1">
                  <div><span className="text-gray-500">Booking ID:</span> {booking._id}</div>
                  <div><span className="text-gray-500">Created:</span> {new Date(booking.createdAt).toLocaleString()}</div>
                  <div><span className="text-gray-500">Updated:</span> {new Date(booking.updatedAt).toLocaleString()}</div>
                  {booking.stripeSessionId && (
                    <div><span className="text-gray-500">Stripe Session:</span> {booking.stripeSessionId}</div>
                  )}
                </div>
              </div>
              
              {booking.specialRequests && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
                  <p className="text-gray-700 bg-white p-3 rounded border">
                    {booking.specialRequests}
                  </p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default BookingRow;