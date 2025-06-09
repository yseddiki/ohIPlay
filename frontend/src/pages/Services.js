import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Target, Users, Trophy } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: 'Military Style Bootcamps',
      description: 'Experience authentic military training with discipline, structure, and intensity that builds character and physical strength.',
      features: ['Professional military instructors', 'Authentic drill exercises', 'Team coordination', 'Physical conditioning'],
      price: 'From €75',
      category: 'military'
    },
    {
      icon: Trophy,
      title: 'Koh Lanta Adventures',
      description: 'Survivor-style challenges that test your strategy, endurance, and teamwork in exciting outdoor scenarios.',
      features: ['Strategic challenges', 'Team competitions', 'Outdoor survival skills', 'Problem-solving tasks'],
      price: 'From €65',
      category: 'koh-lanta'
    },
    {
      icon: Target,
      title: 'Adventure Bootcamps',
      description: 'High-energy adventure experiences combining fitness, fun, and exploration in natural environments.',
      features: ['Obstacle courses', 'Natural terrain challenges', 'Adventure sports', 'Fitness conditioning'],
      price: 'From €55',
      category: 'adventure'
    },
    {
      icon: Users,
      title: 'Team Building Experiences',
      description: 'Corporate and group programs designed to strengthen bonds, improve communication, and boost morale.',
      features: ['Corporate packages', 'Communication exercises', 'Trust building', 'Leadership development'],
      price: 'From €45',
      category: 'team-building'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Adventure Services</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Discover a world of adventure experiences designed to challenge, inspire, and transform
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{service.price}</span>
                        <Link
                          to={`/bootcamps?category=${service.category}`}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                        >
                          View Options
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join our community of adventurers and discover what you're truly capable of
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bootcamps"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Browse Bootcamps
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;