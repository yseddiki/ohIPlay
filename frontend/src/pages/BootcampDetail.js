import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Clock, MapPin, Calendar, Euro, ArrowLeft, 
  Shield, Trophy, Target, Star, CheckCircle 
} from 'lucide-react';
import apiService from '../services/api';

const BootcampDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const getCategoryIcon = (category) => {
    const icons = {
      military: Shield,
      'koh-lanta': Trophy,
      adventure: Target,
      'team-building': Users
    };
    return icons[category] || Target;
  };

  const getCategoryColor = (category) => {
    const colors = {
      military: 'bg-red-100 text-red-600',
      'koh-lanta': 'bg-yellow-100 text-yellow-600',
      adventure: 'bg-green-100 text-green-600',
      'team-building': 'bg-blue-100 text-blue-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-600',
      intermediate: 'bg-yellow-100 text-yellow-600',
      advanced: 'bg-red-100 text-red-600'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !bootcamp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Bootcamp Not Found'}
          </h2>
          <button
            onClick={() => navigate('/bootcamps')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center mx-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamps
          </button>
        </div>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(bootcamp.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/bootcamps')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamps
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="h-64 md:h-96 bg-gradient-to-br from-green-400 to-green-600 relative">
              {bootcamp.photos && bootcamp.photos[0] ? (
                <img 
                  src={bootcamp.photos[0].url} 
                  alt={bootcamp.photos[0].alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full flex items-center justify-center text-white text-8xl">
                🏃‍♂️
              </div>
              
              {/* Overlay with basic info */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 md:p-8 text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(bootcamp.category)}`}>
                      <CategoryIcon className="inline h-4 w-4 mr-1" />
                      {bootcamp.category.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(bootcamp.difficulty)}`}>
                      {bootcamp.difficulty}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{bootcamp.title}</h1>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {bootcamp.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Max {bootcamp.maxParticipants}
                    </div>
                    <div className="flex items-center">
                      <Euro className="h-4 w-4 mr-1" />
                      {bootcamp.price} per person
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Bootcamp</h2>
                <p className="text-gray-600 leading-relaxed">{bootcamp.description}</p>
              </div>

              {/* Activity Plan */}
              {bootcamp.activityPlan && bootcamp.activityPlan.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Schedule</h2>
                  <div className="space-y-4">
                    {bootcamp.activityPlan.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold min-w-max">
                          {activity.time}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{activity.activity}</h3>
                          <p className="text-gray-600 text-sm">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What to Bring */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Bring</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Comfortable athletic wear',
                    'Sturdy sneakers or boots',
                    'Water bottle (1L minimum)',
                    'Towel',
                    'Change of clothes',
                    'Sunscreen',
                    'Positive attitude',
                    'Energy snacks'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">What Participants Say</h2>
                <div className="space-y-4">
                  {/* Sample reviews - in a real app, these would come from the database */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">5/5</span>
                    </div>
                    <p className="text-gray-600 italic">
                      "Absolutely incredible experience! The instructors were professional and pushed us just the right amount. I left feeling accomplished and energized."
                    </p>
                    <p className="text-sm text-gray-500 mt-2">- Sarah M.</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">5/5</span>
                    </div>
                    <p className="text-gray-600 italic">
                      "Great team building experience for our company. Everyone had a blast and we're already planning our next bootcamp!"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">- Tom R.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    €{bootcamp.price}
                  </div>
                  <p className="text-gray-500">per person</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold">{bootcamp.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Max Participants:</span>
                    <span className="font-semibold">{bootcamp.maxParticipants} people</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className="font-semibold capitalize">{bootcamp.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-semibold text-right">{bootcamp.location}</span>
                  </div>
                </div>

                <Link
                  to={`/book/${bootcamp._id}`}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center block"
                >
                  Book Now
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    to="/contact"
                    className="text-green-600 hover:text-green-700 text-sm underline"
                  >
                    Questions? Contact us
                  </Link>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <MapPin className="inline h-5 w-5 mr-2" />
                  Location
                </h3>
                <p className="text-gray-600">{bootcamp.location}</p>
                <div className="mt-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(bootcamp.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-sm underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-semibold">info@OH-I-PLAY.be</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-semibold">+32 XXX XX XX XX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootcampDetail;