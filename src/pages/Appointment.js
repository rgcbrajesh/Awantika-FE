import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
// import axios from 'axios';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "male",
    timeOfDay: "Morning",
    wayToReach: "Phone",
    date: "",
    month: "",
    year: "",
    hrs: "",
    mins: "",
    sec: "",
    address: "",
    reason: "",
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

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!formData.month.trim()) {
      newErrors.month = 'Month is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }

    if (!formData.hrs.trim()) {
      newErrors.hrs = 'Hours is required';
    }

    if (!formData.mins.trim()) {
      newErrors.mins = 'Minutes is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for appointment is required';
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
      // const response = await axios.post("http://localhost:5000/api/appointments", formData);
      
      setMessage({
        type: 'success',
        text: 'Appointment submitted successfully! We will contact you soon.'
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        gender: "male",
        timeOfDay: "Morning",
        wayToReach: "Phone",
        date: "",
        month: "",
        year: "",
        hrs: "",
        mins: "",
        sec: "",
        address: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      
      if (error.response?.data?.message) {
        setMessage({
          type: 'error',
          text: error.response.data.message
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
      
      {/* Appointment Section */}
      <section className="as_contact_wrapper as_padderTop80 as_padderBottom80" >
        <div className="container"style={{maxHeight:"1100px !important"}}>
          <div className="row">
            {/* Appointment Info */}
            <div className="col-lg-4 col-md-12"  >
              <div className="as_contact_info" style={{maxHeight:"900px !Important"}}>
                <h3 className="as_heading">Book Appointment</h3>
                <p className="as_font14 as_padderBottom20 text-dark">
                  Schedule your consultation with our expert astrologers.
                  We're here to guide you through life's journey.
                </p>

                <div className="as_contact_detail as_padderTop40">
                  <div className="as_contact_info_box">
                    <span className="as_icon">
                      <img src="/assets/images/svg/calender1.svg" alt="Schedule" />
                    </span>
                    <div className="as_contact_info_detail">
                      <h4>Available Hours</h4>
                      <p>Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
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
                      <img src="/assets/images/svg/mail.svg" alt="Email" />
                    </span>
                    <div className="as_contact_info_detail">
                      <h4>Email Address</h4>
                      <p>
                        <a href="mailto:appointments@aawantikaa.com">appointments@aawantikaa.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="col-lg-8 col-md-12">
              <div className="as_contact_form">
                <h3 className="as_heading">Make Your Appointment</h3>
                <p className="as_font14 as_padderBottom20 text-dark">
                  Fill out the form below to schedule your consultation. We'll contact you to confirm your appointment.
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
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                          placeholder="Your Mobile Number *"
                          disabled={loading}
                        />
                        {errors.mobile && (
                          <div className="invalid-feedback">{errors.mobile}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group as_select_box">
                        <select
                          className="form-control"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group as_select_box">
                        <select
                          className="form-control"
                          name="wayToReach"
                          value={formData.wayToReach}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="Phone">Contact via Phone</option>
                          <option value="Email">Contact via Email</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <label className="form-label text-dark">Preferred Date *</label>
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="Date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              disabled={loading}
                            />
                            {errors.date && (
                              <div className="invalid-feedback">{errors.date}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className={`form-control ${errors.month ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="Month"
                              name="month"
                              value={formData.month}
                              onChange={handleChange}
                              disabled={loading}
                            />
                            {errors.month && (
                              <div className="invalid-feedback">{errors.month}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="Year"
                              name="year"
                              value={formData.year}
                              onChange={handleChange}
                              disabled={loading}
                            />
                            {errors.year && (
                              <div className="invalid-feedback">{errors.year}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <label className="form-label text-dark">Preferred Time *</label>
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className={`form-control ${errors.hrs ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="Hrs"
                              name="hrs"
                              value={formData.hrs}
                              onChange={handleChange}
                              disabled={loading}
                            />
                            {errors.hrs && (
                              <div className="invalid-feedback">{errors.hrs}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className={`form-control ${errors.mins ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="Mins"
                              name="mins"
                              value={formData.mins}
                              onChange={handleChange}
                              disabled={loading}
                            />
                            {errors.mins && (
                              <div className="invalid-feedback">{errors.mins}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sec"
                              name="sec"
                              value={formData.sec}
                              onChange={handleChange}
                              disabled={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <textarea
                          placeholder="Your Address *"
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="4"
                          disabled={loading}
                        ></textarea>
                        {errors.address && (
                          <div className="invalid-feedback">{errors.address}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <textarea
                          placeholder="Reason for Appointment *"
                          className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          rows="4"
                          disabled={loading}
                        ></textarea>
                        {errors.reason && (
                          <div className="invalid-feedback">{errors.reason}</div>
                        )}
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
                              Booking Appointment...
                            </>
                          ) : (
                            'Book Appointment'
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
      
      <Footer/>
    </>
  );


};

export default Appointment;
