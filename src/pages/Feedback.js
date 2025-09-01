import React, { useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add API call here to submit feedback
    alert('Thank you for your feedback!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h3 className="mb-4 text-center">Feedback Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{border: "1px solid #ced4da"}}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      style={{border: "1px solid #ced4da"}}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                      style={{border: "1px solid #ced4da"}}
                    required
                  ></textarea>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>

                <button type="submit" className="btn btn-primary w-50">
                  Submit Feedback
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Feedback
