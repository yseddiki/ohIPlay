import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Users, Clock, Filter, Search } from 'lucide-react';
import apiService from '../services/api';

const Bootcamps = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBootcamps();
  }, [filter]);

  const fetchBootcamps = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await apiService.getBootcamps(params);
      setBootcamps(response.data);
    } catch (error) {
      console.error('Error fetching bootcamps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter !== 'all') {
      setSearchParams({ category: newFilter });
    } else {
      setSearchParams({});
    }
  };

  const filteredBootcamps = bootcamps.filter(bootcamp =>
    bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bootcamp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { value: 'all', label: 'All Bootcamps' },
    { value: 'military', label: 'Military Style' },
    { value: 'koh-lanta', label: 'Koh Lanta' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'team-building', label: 'Team Building' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Adventure Bootcamps</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with our diverse range of bootcamp experiences designed to push your limits and build lasting memories
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bootcamps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bootcamps Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-64 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 mb-3 rounded"></div>
                  <div className="h-4 bg-gray-300 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-300 mb-4 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBootcamps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bootcamps found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBootcamps.map((bootcamp) => (
              <div key={bootcamp._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
                  {bootcamp.photos && bootcamp.photos[0] ? (
                    <img 
                      src={bootcamp.photos[0].url} 
                      alt={bootcamp.photos[0].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                    🏃‍♂️
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      €{bootcamp.price}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {bootcamp.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    {bootcamp.title}
                  </h3>
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
                  <div className="flex space-x-2">
                    <Link
                      to={`/bootcamp/${bootcamp._id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/book/${bootcamp._id}`}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bootcamps;