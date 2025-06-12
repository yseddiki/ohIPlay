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
      
      // Handle non-JSON responses (like redirects)
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: 'Non-JSON response received' };
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Bootcamps - FIXED to handle direct array response
  async getBootcamps(params = {}) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key]) searchParams.append(key, params[key]);
    });
    
    const queryString = searchParams.toString();
    const bootcamps = await this.request(`/bootcamps${queryString ? `?${queryString}` : ''}`);
    
    // Backend returns array directly, wrap it for consistent API
    return { data: Array.isArray(bootcamps) ? bootcamps : [] };
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
    return this.request('/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();