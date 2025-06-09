const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Bootcamps
  async getBootcamps(params = {}) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key]) searchParams.append(key, params[key]);
    });
    
    const queryString = searchParams.toString();
    return this.request(`/bootcamps${queryString ? `?${queryString}` : ''}`);
  }

  async getBootcamp(id) {
    return this.request(`/bootcamps/${id}`);
  }

  // Bookings
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBooking(id) {
    return this.request(`/bookings/${id}`);
  }

  // Contact
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Payments
  async createPaymentSession(bookingId) {
    return this.request('/payments/create-session', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
  }
}

export default new ApiService();