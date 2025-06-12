
import React, { useState } from 'react';
import { 
  User, Mail, Phone, Users, Calendar, MapPin, Euro, 
  MessageSquare, Clock, CheckCircle, XCircle, Edit3 
} from 'lucide-react';

const CustomRequestCard = ({ request, onUpdateStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuoting, setIsQuoting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    quotedPrice: request.quotedPrice || '',
    adminNotes: request.adminNotes || ''
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      quoted: 'bg-purple-100 text-purple-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    await onUpdateStatus(
      request._id, 
      'quoted', 
      quoteForm.quotedPrice, 
      quoteForm.adminNotes
    );
    setIsQuoting(false);
  };

  const handleStatusChange = async (newStatus) => {
    if (window.confirm(`Are you sure you want to mark this request as ${newStatus}?`)) {
      await onUpdateStatus(request._id, newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {request.customerInfo.fullName}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
              {request.quotedPrice && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  €{request.quotedPrice}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {request.requirements.groupSize} participants
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {request.requirements.preferredDate 
                  ? new Date(request.requirements.preferredDate).toLocaleDateString()
                  : 'Date flexible'
                }
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(request.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <button className="text-gray-400 hover:text-gray-600">
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`mailto:${request.customerInfo.email}`} className="text-blue-600 hover:underline">
                    {request.customerInfo.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${request.customerInfo.phone}`} className="text-blue-600 hover:underline">
                    {request.customerInfo.phone}
                  </a>
                </div>
                {request.customerInfo.company && (
                  <div className="flex items-center md:col-span-2">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {request.customerInfo.company}
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <p className="font-medium">{request.requirements.duration || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Budget:</span>
                  <p className="font-medium">{request.requirements.budget || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">{request.requirements.location || 'Default location'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Group Size:</span>
                  <p className="font-medium">{request.requirements.groupSize} participants</p>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-gray-500">Objectives:</span>
                <p className="mt-1 text-gray-900">{request.requirements.objectives}</p>
              </div>
              
              {request.requirements.specialRequests && (
                <div className="mt-4">
                  <span className="text-gray-500">Special Requests:</span>
                  <p className="mt-1 text-gray-900">{request.requirements.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Admin Notes */}
            {request.adminNotes && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Admin Notes</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{request.adminNotes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {request.status === 'pending' && (
                <>
                  <button
                    onClick={() => setIsQuoting(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Euro className="h-4 w-4 mr-1" />
                    Create Quote
                  </button>
                  <button
                    onClick={() => handleStatusChange('reviewed')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center text-sm"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Mark Reviewed
                  </button>
                </>
              )}
              
              {request.status === 'quoted' && (
                <>
                  <button
                    onClick={() => handleStatusChange('approved')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => setIsQuoting(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit Quote
                  </button>
                </>
              )}
              
              {request.status !== 'rejected' && request.status !== 'approved' && (
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center text-sm"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </button>
              )}
            </div>

            {/* Quote Form */}
            {isQuoting && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {request.quotedPrice ? 'Edit Quote' : 'Create Quote'}
                </h4>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quoted Price (€) *
                    </label>
                    <input
                      type="number"
                      value={quoteForm.quotedPrice}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, quotedPrice: e.target.value }))}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Notes
                    </label>
                    <textarea
                      value={quoteForm.adminNotes}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, adminNotes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Internal notes about this quote..."
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsQuoting(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomRequestCard;