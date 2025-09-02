import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '5',
    category: 'general',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://localhost:4010/api/feedback', formData);
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: response.data.message
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          rating: '5',
          category: 'general',
          message: ''
        });
      }
    } catch (error) {
      console.error('Feedback form error:', error);
      
      if (error.response?.data?.message) {
        setMessage({
          type: 'error',
          text: error.response.data.message
        });
      } else if (error.response?.data?.errors) {
        setMessage({
          type: 'error',
          text: error.response.data.errors.join(', ')
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Something went wrong. Please try again later.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* Feedback Section */}
      <section className="as_contact_wrapper as_padderTop80 as_padderBottom80">
        <div className="container">
          <div className="row">
            {/* Feedback Info */}
            <div className="col-lg-4 col-md-12" style={{maxHeight:"675px"}}>
              <div className="as_contact_info">
                <h3 className="as_heading">Share Your Feedback</h3>
                <p className="as_font14 as_padderBottom20 text-dark">
                  Your feedback helps us improve our services and provide better experiences.
                </p>

                <div className="as_contact_detail as_padderTop40">
                  <div className="as_contact_info_box">
                    <span className="as_icon">
                      <img src="/assets/images/svg/user.svg" alt="Feedback" />
                    </span>
                    <div className="as_contact_info_detail">
                      <h4>Your Opinion Matters</h4>
                      <p>Help us serve you better with your valuable feedback</p>
                    </div>
                  </div>

                  <div className="as_contact_info_box">
                    <span className="as_icon">
                      <img src="/assets/images/svg/call1.svg" alt="Phone" />
                    </span>
                    <div className="as_contact_info_detail">
                      <h4>Phone Number</h4>
                      <p>
                        <a href="tel:+919670817179">+91 96708 17179</a>
                      </p>
                    </div>
                  </div>

                  <div className="as_contact_info_box">
                    <span className="as_icon">
                      <img src="/assets/images/svg/mail1.svg" alt="Email" />
                    </span>
                    <div className="as_contact_info_detail">
                      <h4>Email Address</h4>
                      <p>
                        <a href="mailto:feedback@aawantikaa.com">feedback@aawantikaa.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="col-lg-8 col-md-12">
              <div className="as_contact_form">
                <h3 className="as_heading">Send Us Your Feedback</h3>
                <p className="as_font14 as_padderBottom20 text-dark">
                  We value your feedback and suggestions to improve our services.
                </p>

                {/* Success/Error Message */}
                {message.text && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} as_margin_bottom20`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="as_form">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          placeholder="Your Name *"
                          disabled={loading}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Your Email *"
                          disabled={loading}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="Your Phone Number *"
                          disabled={loading}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group as_select_box">
                        <select
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="form-control"
                          disabled={loading}
                        >
                          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                          <option value="4">⭐⭐⭐⭐ Very Good</option>
                          <option value="3">⭐⭐⭐ Good</option>
                          <option value="2">⭐⭐ Fair</option>
                          <option value="1">⭐ Poor</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group as_select_box">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="form-control"
                          disabled={loading}
                        >
                          <option value="general">General Feedback</option>
                          <option value="service">Service Quality</option>
                          <option value="website">Website Experience</option>
                          <option value="consultation">Consultation Experience</option>
                          <option value="suggestion">Suggestion</option>
                          <option value="complaint">Complaint</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                          rows="6"
                          placeholder="Your Feedback Message *"
                          disabled={loading}
                        ></textarea>
                        {errors.message && (
                          <div className="invalid-feedback">{errors.message}</div>
                        )}
                        <small className="form-text text-muted">
                          {formData.message.length}/1000 characters
                        </small>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group as_margin0">
                        <button
                          type="submit"
                          className="as_btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Sending...
                            </>
                          ) : (
                            'Send Feedback'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Feedback;
