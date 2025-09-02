import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function ContactUSData() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch contacts data
  const fetchContacts = async (page = 1, status = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (status) params.append('status', status);
      
      const response = await axios.get(`http://localhost:4010/api/contact?${params}`);
      
      if (response.data.success) {
        setContacts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contact data');
    } finally {
      setLoading(false);
    }
  };

  // Update contact status
  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:4010/api/contact/${contactId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        // Refresh the data
        fetchContacts(currentPage, statusFilter);
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      setError('Failed to update contact status');
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const handleStatusChange = (contactId, newStatus) => {
    updateContactStatus(contactId, newStatus);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
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
      replied: 'badge bg-success',
      closed: 'badge bg-secondary'
    };
    return statusClasses[status] || 'badge bg-secondary';
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

      {/* Filter Controls */}
      <div className={`row mb-3 ${styles.filterContainer}`}>
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === '' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('')}
            >
              All
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
              className={`btn btn-sm ${statusFilter === 'replied' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('replied')}
            >
              Replied
            </button>
          </div>
        </div>
      </div>

      {/* Contact Table */}
      <div className={`table-responsive ${styles.tableContainer}`}>
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={contact._id} className={`text-center ${styles.tableRow}`}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {contact.subject}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {contact.message}
                  </td>
                  <td>
                    <span className={`${getStatusBadge(contact.status)} ${styles.statusBadge}`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </td>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <select
                        className={`form-select form-select-sm ${styles.filterSelect}`}
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No contact messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Contact pagination" className={styles.paginationContainer}>
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
    </div>
  );
}
