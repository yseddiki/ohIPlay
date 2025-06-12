import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, Award, Star } from 'lucide-react';
import apiService from '../services/api';

const Home = () => {
  const [featuredBootcamps, setFeaturedBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedBootcamps();
  }, []);

  const fetchFeaturedBootcamps = async () => {
    try {
      setError('');
      const response = await apiService.getBootcamps({ limit: 3 });
      
      // Ensure we always have an array
      const bootcamps = response?.data || [];
      setFeaturedBootcamps(Array.isArray(bootcamps) ? bootcamps.slice(0, 3) : []);
    } catch (error) {
      console.error('Error fetching bootcamps:', error);
      setError('Failed to load bootcamps');
      setFeaturedBootcamps([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🌿 Welcome to OH ! PLAY
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Unleash Your Inner Warrior with Epic Adventure Bootcamps
            </p>
            <p className="text-lg mb-10 text-green-200 max-w-2xl mx-auto">
              Experience military-style training, Koh Lanta challenges, and team-building adventures 
              that will push your limits and create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/bootcamps"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Explore Bootcamps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose OH ! PLAY?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver authentic adventure experiences that challenge your body, mind, and spirit
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Our experienced team brings military precision and adventure expertise to every session
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Choose from various bootcamp durations and schedules that fit your lifestyle
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Transform your fitness, confidence, and teamwork skills through our proven methodologies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bootcamps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Bootcamps
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular adventure experiences
            </p>
          </div>

          {error && (
            <div className="text-center mb-8">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 max-w-md mx-auto">
                {error}
              </div>
              <button 
                onClick={fetchFeaturedBootcamps}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 mb-3 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-4 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredBootcamps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No bootcamps available</h3>
              <p className="text-gray-600 mb-4">
                {error ? 'There was an error loading bootcamps.' : 'Check back soon for new adventures!'}
              </p>
              <Link
                to="/contact"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBootcamps.map((bootcamp) => (
                <div key={bootcamp._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
                    {bootcamp.photos && bootcamp.photos[0] ? (
                      <img 
                        src={bootcamp.photos[0].url} 
                        alt={bootcamp.photos[0].alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                        🏃‍♂️
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-green-600 px-2 py-1 rounded text-sm font-semibold">
                        €{bootcamp.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{bootcamp.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{bootcamp.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Max {bootcamp.maxParticipants}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{bootcamp.duration}</span>
                      </div>
                    </div>
                    <Link
                      to={`/bootcamp/${bootcamp._id}`}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/bootcamps"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
            >
              View All Bootcamps
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Adventurers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Absolutely incredible experience! The military bootcamp pushed me beyond my limits and I discovered strength I never knew I had."
              </p>
              <p className="font-semibold">Sarah M.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The Koh Lanta style challenges were so much fun! Great team building activity for our company."
              </p>
              <p className="font-semibold">Tom R.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Professional instructors, well-organized activities, and an unforgettable adventure. Highly recommend!"
              </p>
              <p className="font-semibold">Lisa K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of adventurers who have transformed their lives with OH ! PLAY
          </p>
          <Link
            to="/contact"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;