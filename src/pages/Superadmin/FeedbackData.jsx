import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function FeedbackData() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statistics, setStatistics] = useState({});
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState('');

  // Fetch feedbacks data
  const fetchFeedbacks = async (page = 1, status = '', category = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (status) params.append('status', status);
      if (category) params.append('category', category);
      
      const response = await axios.get(`http://localhost:4010/api/feedback?${params}`);
      
      if (response.data.success) {
        setFeedbacks(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage);
        setStatistics(response.data.statistics);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError('Failed to load feedback data');
    } finally {
      setLoading(false);
    }
  };

  // Update feedback status
  const updateFeedbackStatus = async (feedbackId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:4010/api/feedback/${feedbackId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        fetchFeedbacks(currentPage, statusFilter, categoryFilter);
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
      setError('Failed to update feedback status');
    }
  };

  // Add response to feedback
  const addResponse = async (feedbackId, responseText) => {
    try {
      const response = await axios.put(`http://localhost:4010/api/feedback/${feedbackId}/respond`, {
        response: responseText
      });
      
      if (response.data.success) {
        setSelectedFeedback(null);
        setResponse('');
        fetchFeedbacks(currentPage, statusFilter, categoryFilter);
      }
    } catch (error) {
      console.error('Error adding response:', error);
      setError('Failed to add response');
    }
  };

  useEffect(() => {
    fetchFeedbacks(currentPage, statusFilter, categoryFilter);
  }, [currentPage, statusFilter, categoryFilter]);

  const handleStatusChange = (feedbackId, newStatus) => {
    updateFeedbackStatus(feedbackId, newStatus);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleResponseSubmit = (feedbackId) => {
    if (response.trim()) {
      addResponse(feedbackId, response.trim());
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      new: 'badge bg-primary',
      read: 'badge bg-info',
      responded: 'badge bg-success',
      resolved: 'badge bg-secondary'
    };
    return statusClasses[status] || 'badge bg-secondary';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCategoryBadge = (category) => {
    const categoryClasses = {
      general: 'badge bg-light text-dark',
      service: 'badge bg-info',
      website: 'badge bg-warning text-dark',
      consultation: 'badge bg-success',
      suggestion: 'badge bg-primary',
      complaint: 'badge bg-danger'
    };
    return categoryClasses[category] || 'badge bg-secondary';
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.componentContainer}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Statistics */}
      {statistics.totalFeedbacks > 0 && (
        <div className="row mb-3">
          <div className="col-md-4">
            <div className={`card text-center ${styles.componentContainer}`}>
              <div className="card-body">
                <h5 className="card-title">Total Feedbacks</h5>
                <h3 className="text-primary">{statistics.totalFeedbacks}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card text-center ${styles.componentContainer}`}>
              <div className="card-body">
                <h5 className="card-title">Average Rating</h5>
                <h3 className="text-success">{statistics.averageRating}/5</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card text-center ${styles.componentContainer}`}>
              <div className="card-body">
                <h5 className="card-title">Rating Distribution</h5>
                <small>
                  {Object.entries(statistics.ratingDistribution || {})
                    .sort(([a], [b]) => b - a)
                    .map(([rating, count]) => `${rating}⭐: ${count}`)
                    .join(', ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className={`row mb-3 ${styles.filterContainer}`}>
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === '' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('')}
            >
              All Status
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'new' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('new')}
            >
              New
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'read' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('read')}
            >
              Read
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'responded' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('responded')}
            >
              Responded
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <select
            className={`form-select form-select-sm ${styles.filterSelect}`}
            value={categoryFilter}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="service">Service</option>
            <option value="website">Website</option>
            <option value="consultation">Consultation</option>
            <option value="suggestion">Suggestion</option>
            <option value="complaint">Complaint</option>
          </select>
        </div>
      </div>

      {/* Feedback Table */}
      <div className={`table-responsive ${styles.tableContainer}`}>
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Rating</th>
              <th scope="col">Category</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <tr key={feedback._id} className={`text-center ${styles.tableRow}`}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>{feedback.name}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.phone}</td>
                  <td>{getRatingStars(feedback.rating)}</td>
                  <td>
                    <span className={`${getCategoryBadge(feedback.category)} ${styles.statusBadge}`}>
                      {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                    </span>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {feedback.message}
                  </td>
                  <td>
                    <span className={`${getStatusBadge(feedback.status)} ${styles.statusBadge}`}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </span>
                  </td>
                  <td>{formatDate(feedback.createdAt)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <select
                        className={`form-select form-select-sm ${styles.filterSelect}`}
                        value={feedback.status}
                        onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
                        onClick={() => setSelectedFeedback(feedback)}
                        data-bs-toggle="modal"
                        data-bs-target="#responseModal"
                      >
                        Respond
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No feedback messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Feedback pagination" className={styles.paginationContainer}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className={`page-link ${styles.paginationButton}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  className={`page-link ${styles.paginationButton} ${currentPage === i + 1 ? styles.active : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className={`page-link ${styles.paginationButton}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Response Modal */}
      <div className="modal fade" id="responseModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className={`modal-header ${styles.modalHeader}`}>
              <h5 className={`modal-title ${styles.modalTitle}`}>Respond to Feedback</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className={`modal-body ${styles.modalBody}`}>
              {selectedFeedback && (
                <div>
                  <h6>Original Feedback:</h6>
                  <p className="bg-light p-2 rounded">{selectedFeedback.message}</p>
                  <div className="mb-2">
                    <strong>From:</strong> {selectedFeedback.name} ({selectedFeedback.email})
                  </div>
                  <div className="mb-2">
                    <strong>Rating:</strong> {getRatingStars(selectedFeedback.rating)}
                  </div>
                  <div className="mb-3">
                    <strong>Category:</strong> {selectedFeedback.category}
                  </div>
                  
                  {selectedFeedback.response && (
                    <div className="mb-3">
                      <h6>Previous Response:</h6>
                      <p className="bg-success bg-opacity-10 p-2 rounded">{selectedFeedback.response}</p>
                    </div>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Response:</label>
                    <textarea
                      className={`form-control ${styles.formControl}`}
                      rows="4"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Enter your response..."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className={`modal-footer ${styles.modalFooter}`}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => selectedFeedback && handleResponseSubmit(selectedFeedback._id)}
                data-bs-dismiss="modal"
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
